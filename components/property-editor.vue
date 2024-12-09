<template>
    <table>
        <tr>
            <td>Növü:</td>
            <td><select v-model="propertyData.property_type_id">
                    <option :disabled="x.disabled" v-for="x in options?.propertyTypes" :value="x.id"
                        :selected="x.id == propertyData?.property_type_id">{{ x.name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Adı:</td>
            <td><input type="text" v-model="propertyData.property_name"></td>
        </tr>
        <tr>
            <td>Reytinq:</td>
            <td><input type="text" v-model="propertyData.property_rating"></td>
        </tr>
        <tr>
            <td>Rəy balı:</td>
            <td><input type="number" v-model="propertyData.review_score"></td>
        </tr>
        <tr>
            <td>Yemək variantları:</td>
            <td><select v-model="propertyData.meal_option_policy_id">
                    <option :disabled="x.disabled" v-for="x in options?.mealOptions" :value="x.id"
                        :selected="x.id == propertyData?.meal_option_policy_id">{{ x.name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Mətbəx varmı:</td>
            <td><input type="checkbox" v-model="propertyData.kitchen_available"></td>
        </tr>
        <tr>
            <td>Rezervasiya siyasəti:</td>
            <td><select v-model="propertyData.reservation_policy_id">
                    <option :disabled="x.disabled" v-for="x in options?.reservationPolicies" :value="x.id"
                        :selected="x.id == propertyData?.reservation_policy_id">{{ x.name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Parkinq:</td>
            <td><input type="checkbox" v-model="propertyData.parking"></td>
        </tr>
        <tr>
            <td>Restoran:</td>
            <td><input type="checkbox" v-model="propertyData.restaurant"></td>
        </tr>
        <tr>
            <td>Ev heyvanlarına icazə:</td>
            <td><input type="checkbox" v-model="propertyData.pets_allowed"></td>
        </tr>
        <tr>
            <td>Otaq servisi:</td>
            <td><input type="checkbox" v-model="propertyData.room_service"></td>
        </tr>
        <tr>
            <td>Ön masa:</td>
            <td><input type="checkbox" v-model="propertyData.front_desk"></td>
        </tr>
        <tr>
            <td>Fitnes mərkəzi:</td>
            <td><input type="checkbox" v-model="propertyData.fitness_center"></td>
        </tr>
        <tr>
            <td>Siqaret otağı variantı:</td>
            <td><select v-model="propertyData.smoking_room_option_id">
                    <option :disabled="x.disabled" v-for="x in options?.smokingRoomOptions" :value="x.id"
                        :selected="x.id == propertyData?.smoking_room_option_id">{{ x.name }}</option>
                </select></td>
        </tr>
        <tr>
            <td>Aeroport nəqliyyatı:</td>
            <td><input type="checkbox" v-model="propertyData.airport_shuttle"></td>
        </tr>
        <tr>
            <td>Ailə otaqları:</td>
            <td><input type="checkbox" v-model="propertyData.family_rooms"></td>
        </tr>
        <tr>
            <td>Spa və sağlamlıq mərkəzi:</td>
            <td><input type="checkbox" v-model="propertyData.spa_and_wellnes_center"></td>
        </tr>
        <tr>
            <td>Üzmə hovuzu:</td>
            <td><input type="checkbox" v-model="propertyData.swimming_pool"></td>
        </tr>
        <tr>
            <td>Fərdi hamam otağı:</td>
            <td><input type="checkbox" v-model="propertyData.private_bathroom"></td>
        </tr>
        <tr>
            <td>Fərdi hovuz:</td>
            <td><input type="checkbox" v-model="propertyData.private_pool"></td>
        </tr>
        <tr>
            <td>Dənizə mənzərə:</td>
            <td><input type="checkbox" v-model="propertyData.sea_view"></td>
        </tr>
        <tr>
            <td>Kondisioner:</td>
            <td><input type="checkbox" v-model="propertyData.air_conditioning"></td>
        </tr>
        <tr>
            <td>Paltaryuyan maşın:</td>
            <td><input type="checkbox" v-model="propertyData.washing_machine"></td>
        </tr>
        <tr>
            <td>Mərkəzdən məsafə:</td>
            <td><input type="number" v-model="propertyData.distance_from_center"></td>
        </tr>
        <tr>
            <td>Təsvir:</td>
            <td><textarea v-model="propertyData.description"></textarea></td>
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
const propertyData = ref({
    property_type_id: null,
    property_name: null,
    property_rating: null,
    review_score: null,
    meal_option_policy_id: null,
    kitchen_available: null,
    reservation_policy_id: null,
    parking: null,
    restaurant: null,
    pets_allowed: null,
    room_service: null,
    front_desk: null,
    fitness_center: null,
    smoking_room_option_id: null,
    airport_shuttle: null,
    family_rooms: null,
    spa_and_wellnes_center: null,
    swimming_pool: null,
    private_bathroom: null,
    private_pool: null,
    sea_view: null,
    air_conditioning: null,
    washing_machine: null,
    distance_from_center: null,
    description: null
})
const router = useRouter()
const dialog = ref(null)
let options = ref({});
[
    options.value.mealOptions,
    options.value.propertyTypes,
    options.value.reservationPolicies,
    options.value.smokingRoomOptions
] = await Promise.all([
    api('meal-options/view'),
    api('property-types/view'),
    api('reservation-policies/view'),
    api('smoking-room-options/view')
])
if (props.id) {
    propertyData.value = await api("properties/view", { id: props.id })
    propertyData.value.kitchen_available = !!propertyData.value.kitchen_available
    propertyData.value.parking = !!propertyData.value.parking
    propertyData.value.restaurant = !!propertyData.value.restaurant
    propertyData.value.pets_allowed = !!propertyData.value.pets_allowed
    propertyData.value.room_service = !!propertyData.value.room_service
    propertyData.value.front_desk = !!propertyData.value.front_desk
    propertyData.value.fitness_center = !!propertyData.value.fitness_center
    propertyData.value.airport_shuttle = !!propertyData.value.airport_shuttle
    propertyData.value.family_rooms = !!propertyData.value.family_rooms
    propertyData.value.spa_and_wellnes_center = !!propertyData.value.spa_and_wellnes_center
    propertyData.value.swimming_pool = !!propertyData.value.swimming_pool
    propertyData.value.private_bathroom = !!propertyData.value.private_bathroom
    propertyData.value.private_pool = !!propertyData.value.private_pool
    propertyData.value.sea_view = !!propertyData.value.sea_view
    propertyData.value.air_conditioning = !!propertyData.value.air_conditioning
    propertyData.value.washing_machine = !!propertyData.value.washing_machine
    
} else { 
    for (const [key, value] of Object.entries(options.value)) {
        options.value[key] = [{ name: "Seçin", id: null, disabled: true }, ...value]
    }
}
async function save() {
    if (props.id) {
        try {
            await api('properties/edit', { id: props.id, ...propertyData.value })
            dialog.value = { header: "Uğur", body: "Əmlak saxlandı", buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null, router.go(-1) } }] }
        } catch (error) {
            dialog.value = { header: "Xəta", body: error, buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null } }] }
        }
    } else {
        try {
            await api('properties/add', propertyData.value)
            dialog.value = { header: "Uğur", body: "Əmlak saxlandı", buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null, router.go(-1) } }] }
        } catch (error) {
            dialog.value = { header: "Xəta", body: error, buttons: [{ color: "main", text: "Anladım", action: () => { dialog.value = null } }] }
        }
    }
}
async function delet() {
    try {
        dialog.value = {
            header: "Bu əmlak silinsin?",
            body: "Adı: " + propertyData.value.property_name,
            buttons: [{
                text: "Sil",
                color: "danger",
                async action() {
                    dialog.value = null;
                    try {
                        await api(`properties/delete`, { id: props.id })
                        dialog.value = {
                            header: "Uğur",
                            body: propertyData.value.property_name + " silindi",
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