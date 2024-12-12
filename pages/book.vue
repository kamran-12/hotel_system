<template>
    <div class="centered">
        <h1>
            Bron edin
        </h1>
        <div class="form">
            <label for="property">Otel</label>
            <select v-model="selected_property_id" @change="loadRooms">
                <option :disabled="property.disabled" v-for="property in properties" :value="property.id">{{
                    property.property_name }}</option>
            </select>
            <label for="room">Otaq</label>
            <select v-model="selected_room_id">
                <option :disabled="room.disabled" v-for="room in roomOptions" :value="room.id">{{ room.name }}</option>
            </select>
            <label for="checkin">Giriş tarixi</label>
            <input type="date" name="checkin" id="checkin" v-model="checkin">
            <label for="checkout">Çıxış tarixi</label>
            <input type="date" name="checkout" id="checkout" v-model="checkout">
            <Button color="main" text="Bron et" @click="book" />
            <Transition>
                <Dialog v-if="dialog" v-bind="dialog" />
            </Transition>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
});
import { useRouter } from "vue-router"
const router = useRouter()
const dialog = ref(null)
const properties = ref([])
const rooms = ref([])
const roomOptions = ref([])
const selected_property_id = ref(null)
const selected_room_id = ref(null)
const checkin = ref(null)
const checkout = ref(null)
properties.value = await api("properties/view")
properties.value = [{ property_name: "Seçin", disabled: true }, ...properties.value]
async function loadRooms() {
    rooms.value = await api("rooms/view", { property_id: selected_property_id.value })
    roomOptions.value = rooms.value.map(room => ({
        name: room.room_number + " | " +
            room.room_name, id: room.id
    }))
    roomOptions.value = [{ name: "Seçin", disabled: true }, ...roomOptions.value]
}
async function book() {
    try {
        await api('bookings/add', { checkin: checkin.value, checkout: checkout.value, room_id: selected_room_id.value })
        router.push("/bookings")
    } catch (error) {
        showError(error)
    }
}
</script>

<style scoped>
@import "../assets/css/user-login.css";
</style>

<style>
body {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>