<template>
    <h1>
        Adminin istifadəçi adını dəyiş
    </h1>
    <label>İstifadəçi adı</label>
    <input type="text" name="username" id="username" v-model="admin.username">
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
const admin = ref({});
const dialog = ref(null);
admin.value = await api("admins/view", {id: route.params.id });
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
        await api("admins/change-username", { id: route.params.id, username: admin.value.username })
        dialog.value = {
            header: "Uğur",
            body: "Adminin istifadəçi adı dəyişdi",
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