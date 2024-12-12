<template>
    <h1>
        Rezervasiyalar
    </h1>
    <table>
        <tr>
            <th>Ad</th>
            <th>Əmlak</th>
            <th>Otaq</th>
            <th>Giriş</th>
            <th>Çıxış</th>
        </tr>
        <tr v-for="booking in bookings">
            <td>{{ booking.name + " " + booking.surname }}</td>
            <td>{{ booking.property_name }}</td>
            <td>{{ booking.room_number + " | " + booking.room_name }}</td>
            <td>{{ booking.checkin.substring(0,10) }}</td>
            <td>{{ booking.checkout.substring(0,10) }}</td>
        </tr>
    </table>
    <Transition>
        <Dialog v-if="dialog" v-bind="dialog" />
    </Transition>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const dialog = ref(null)
function showError(errorText) {
    dialog.value = {
        header: "Xəta",
        body: errorText,
        buttons: [{
            text: "Anladım",
            color: "main",
            async action() {
                dialog.value = null;
            }
        }]
    }
}
const bookings = ref([])
bookings.value = await api('bookings/view')
</script>

<style scoped>
@import "../../assets/css/admins-and-users.css";
</style>