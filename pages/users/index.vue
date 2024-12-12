<template>
    <h1>
        İstifadəçilər
    </h1>
    <Button color="main" text="Yeni" @click="addNew" />
    <table>
        <tr>
            <th>Tam ad</th>
            <th>Düymələr</th>
        </tr>
        <tr v-for="user in users">
            <td>
                {{ `${user.name} ${user.surname} (${user.email})` }}
            </td>
            <td>
                <Button color="main" text="Məlumatları dəyiş" @click="changeInfo(user)" />
                <Button color="main" text="Parolunu dəyiş" @click="changePassword(user)" />
                <Button color="main" text="Sil" @click="delet(user)" />
            </td>
        </tr>
    </table>
    <Transition>
        <Dialog v-if="dialog" v-bind="dialog" />
    </Transition>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
let dialog = ref(null)
let users = ref([])
users.value = (await api("users/view"))
async function load() {
    users.value = (await api("users/view"))
}
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
function delet(user) {
    dialog.value = {
        header: "Seçilmiş silinsin?",
        body: `Bu silinəcək: ${user.name} ${user.surname}`,
        buttons: [{
            text: "Sil",
            color: "danger",
            async action() {
                try {
                    await api(`users/delete`, { id: user.id })
                    load()
                    dialog.value = null;
                } catch (error) {
                    showError(error)
                }
            }
        }, {
            text: "İmtina",
            color: "main",
            async action() {
                dialog.value = null;
            }
        }]
    }
}
function addNew() {
    router.push("/users/new")
}
function changeInfo(user) {
    router.push("/users/change-information/" + user.id)
}
function changePassword(user) {
    router.push("/users/change-password/" + user.id)
}
</script>

<style scoped>
@import "../../assets/css/admins-and-users.css";
</style>