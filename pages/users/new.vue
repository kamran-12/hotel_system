<template>
    <h1>
        Yeni istifadəçi
    </h1>
    <label>Ad</label>
    <input type="text" name="name" id="name" v-model="name">
    <label>Soyad</label>
    <input type="text" name="surname" id="surname" v-model="surname">
    <label>E-poçt</label>
    <input type="email" name="email" id="email" v-model="email">
    <label>Telefon nömrəsi</label>
    <input type="tel" name="phone" id="phone" v-model="phone">
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
const name = ref('');
const surname = ref('');
const email = ref('');
const phone = ref('');
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
    let userData = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value,
        password: password.value
    };
    try {
        await api("users/register", userData);
        dialog.value = {
            header: "Uğur",
            body: "İstifadəçi qeydiyyatdan keçdi",
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