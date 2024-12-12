<template>
    <h1>
        Adminlər
    </h1>
    <Button color="main" text="Yeni" @click="addNew" />
    <table>
        <tr>
            <th>İstifadəçi adı</th>
            <th>Düymələr</th>
        </tr>
        <tr v-for="admin in admins">
            <td>
                {{ admin.username }}
            </td>
            <td>
                <Button color="main" text="İstifadəçi adını dəyiş" @click="changeUsername(admin)" />
                <Button color="main" text="Parolunu dəyiş" @click="changePassword(admin)" />
                <Button color="main" text="Sil" @click="delet(admin)" />
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
const dialog = ref(null)
let admins = ref([])
admins.value = (await api("admins/view"))
async function load() {
    admins.value = (await api("admins/view"))
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
function delet(admin) {
    dialog.value = {
        header: "Seçilmiş silinsin?",
        body: "Bu silinəcək: " + admin.username,
        buttons: [{
            text: "Sil",
            color: "danger",
            async action() {
                try {
                    await api(`admins/delete`, { id: admin.id })
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
    router.push("/admins/new")
}
function changeUsername(admin) {
    router.push("/admins/change-username/" + admin.id)
}
function changePassword(admin) {
    router.push("/admins/change-password/" + admin.id)
}
</script>

<style scoped>
@import "../../assets/css/admins-and-users.css";
</style>