<template>
    <h1>
        İstifadəçinin məlumatlarını dəyiş
    </h1>
    <label>Ad</label>
    <input type="text" name="name" id="name" v-model="user.name">
    <label>Soyad</label>
    <input type="text" name="surname" id="surname" v-model="user.surname">
    <label>E-poçt</label>
    <input type="email" name="email" id="email" v-model="user.email">
    <label>Telefon nömrəsi</label>
    <input type="tel" name="phone" id="phone" v-model="user.phone">
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
const user = ref({});
const dialog = ref(null);
user.value = await api("users/view", { id: route.params.id });
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
    try {
        let userData = {
            id: route.params.id,
            name: user.value.name,
            surname: user.value.surname,
            email: user.value.email,
            phone: user.value.phone
        };
        await api("users/change-information", userData)
        dialog.value = {
            header: "Uğur",
            body: "İstifadəçinin məlumatları dəyişdi",
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