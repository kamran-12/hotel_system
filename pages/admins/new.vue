<template>
    <h1>
        Yeni admin
    </h1>
    <label>İstifadəçi adı</label>
    <input type="text" name="username" id="username" v-model="username">
    <label>Parol</label>
    <input type="password" name="password" id="password" v-model="password">
    <label>Parolun təsdiqi</label>
    <input type="password" name="confirmPassword" id="confirmPassword" v-model="confirmPassword">
    <Button @click="save" text="Saxla" color="main" />
    <Transition>
        <Dialog v-if="dialog" v-bind="dialog" />
    </Transition>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const dialog = ref(null);
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
async function save() {
    if (password.value != confirmPassword.value) {
        return showError("Parol və təsdiqi uyğun gəlmir.")
    }
    try {
        await api("admins/register", { username: username.value, password: password.value })
        dialog.value = {
            header: "Uğur",
            body: "Admin qeydiyyatdan keçdi",
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
        return showError(error)
    }
}
</script>

<style scoped>
@import "../../assets/css/admin-editor.css";
</style>