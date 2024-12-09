<template>
    <table>
        <tr>
            <td>Əmlak:</td>
            <td><select v-model="roomData.property_id">
                    <option :disabled="x.disabled" v-for="x in options?.properties" :value="x.id" :selected="x.id == roomData?.property_id">{{
                        x.property_name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Adı:</td>
            <td><input type="text" v-model="roomData.room_name"></td>
        </tr>
        <tr>
            <td>Otaq nömrəsi:</td>
            <td><input type="number" v-model="roomData.room_number"></td>
        </tr>
        <tr>
            <td>Mərtəbə:</td>
            <td><input type="number" v-model="roomData.floor_number"></td>
        </tr>
        <tr>
            <td>Yemək variantı:</td>
            <td><select v-model="roomData.meal_option_id">
                    <option :disabled="x.disabled" v-for="x in options?.mealOptions" :value="x.id"
                        :selected="x.id == roomData?.meal_option_id">{{ x.name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Mətbəx varmı:</td>
            <td><input type="checkbox" v-model="roomData.kitchen_available"></td>
        </tr>
        <tr>
            <td>Rezervasiya siyasəti:</td>
            <td><select v-model="roomData.reservation_policy_id">
                    <option :disabled="x.disabled" v-for="x in options?.reservationPolicies" :value="x.id"
                        :selected="x.id == roomData?.reservation_policy_id">{{ x.name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Ev heyvanlarına icazə varmı:</td>
            <td><input type="checkbox" v-model="roomData.pets_allowed"></td>
        </tr>
        <tr>
            <td>Siqaret otağı variantı:</td>
            <td><select v-model="roomData.smoking_room_option_id">
                    <option :disabled="x.disabled" v-for="x in options?.smokingRoomOptions" :value="x.id"
                        :selected="x.id == roomData?.smoking_room_option_id">{{ x.name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Ailə otaqları:</td>
            <td><input type="checkbox" v-model="roomData.family_rooms"></td>
        </tr>
        <tr>
            <td>Fərdi hamam otağı:</td>
            <td><input type="checkbox" v-model="roomData.private_bathroom"></td>
        </tr>
        <tr>
            <td>Dəniz mənzərəsi:</td>
            <td><input type="checkbox" v-model="roomData.sea_view"></td>
        </tr>
        <tr>
            <td>Kondisioner:</td>
            <td><input type="checkbox" v-model="roomData.air_conditioning"></td>
        </tr>
        <tr>
            <td>Paltaryuyan maşın:</td>
            <td><input type="checkbox" v-model="roomData.washing_machine"></td>
        </tr>
    </table>
    <Button color="main" text="Saxla" @click="save" />
    <Button color="danger" text="Sil" @click="delet" v-if="id" />
    <Transition>
        <Dialog v-if="dialog" v-bind="dialog" />
    </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const props = defineProps(["id"])
const roomData = ref({
    property_id: null,
    room_name: null,
    room_number: null,
    floor_number: null,
    meal_option_id: null,
    kitchen_available: null,
    reservation_policy_id: null,
    pets_allowed: null,
    smoking_room_option_id: null,
    family_rooms: null,
    private_bathroom: null,
    sea_view: null,
    air_conditioning: null,
    washing_machine: null
})
const router = useRouter()
const dialog = ref(null)
let options = ref({});
[
    options.value.mealOptions,
    options.value.properties,
    options.value.reservationPolicies,
    options.value.smokingRoomOptions
] = await Promise.all([
    api('meal-options/view'),
    api('properties/view'),
    api('reservation-policies/view'),
    api('smoking-room-options/view')
])
if (props.id) {
    roomData.value = await api("rooms/view", { id: props.id })
    roomData.value.kitchen_available = !!roomData.value.kitchen_available
    roomData.value.pets_allowed = !!roomData.value.pets_allowed
    roomData.value.family_rooms = !!roomData.value.family_rooms
    roomData.value.private_bathroom = !!roomData.value.private_bathroom
    roomData.value.sea_view = !!roomData.value.sea_view
    roomData.value.air_conditioning = !!roomData.value.air_conditioning
    roomData.value.washing_machine = !!roomData.value.washing_machine
} else {
    for (const [key, value] of Object.entries(options.value)) {
        options.value[key] = [{ name: "Seçin", property_name: "Seçin", id: null, disabled: true }, ...value]
    }
}
async function save() {
    if (props.id) {
        try {
            await api('rooms/edit', { id: props.id, ...roomData.value })
            dialog.value = { header: "Uğur", body: "Otaq saxlandı", buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null, router.go(-1) } }] }
        } catch (error) {
            dialog.value = { header: "Xəta", body: error, buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null } }] }
        }
    } else {
        try {
            await api('rooms/add', roomData.value)
            dialog.value = { header: "Uğur", body: "Otaq saxlandı", buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null, router.go(-1) } }] }
        } catch (error) {
            dialog.value = { header: "Xəta", body: error, buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null } }] }
        }
    }
}
async function delet() {
    try {
        dialog.value = {
            header: "Bu otaq silinsin?",
            body: `Adı: ${roomData.value.room_name}, nömrəsi: ${roomData.value.room_number}`,
            buttons: [{
                text: "Sil",
                color: "danger",
                async action() {
                    dialog.value = null;
                    try {
                        await api(`rooms/delete`, { id: props.id })
                        dialog.value = {
                            header: "Uğur",
                            body: "Otaq silindi",
                            buttons: [{
                                text: "Anladım",
                                color: "main",
                                async action() {
                                    dialog.value = null;
                                    router.go(-1)
                                }
                            }]
                        }
                    } catch (error) {
                        dialog.value = { header: "Xəta", body: error, buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null } }] }
                    }
                }
            },
            {
                text: "İmtina",
                color: "main",
                async action() {
                    dialog.value = null;
                }
            }]
        }
    } catch (error) {
        dialog.value = { header: "Xəta", body: error, buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null } }] }
    }
}
</script>

<style scoped>
@import "../assets/css/property-editor.css";
</style>