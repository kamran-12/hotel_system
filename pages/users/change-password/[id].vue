<template>
    <h1>
        İstifadəçi parolunu dəyiş
    </h1>
    <h2>{{ `İstifadəçi: ${user.name} ${user.surname} (${user.email})` }}</h2>
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
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const user = ref(null);
const dialog = ref(null);
const password = ref('');
const confirmPassword = ref('');
user.value = await api("users/view", { id: route.params.id })
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
        await api("users/change-password", { id: route.params.id, password: password.value })
        dialog.value = {
            header: "Uğur",
            body: "İstifadəçinin parolu dəyişdi",
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
@import "../../../assets/css/admin-editor.css";
</style>