<template>
    <div class="centered">
        <h1>
            Daxil olun
        </h1>
        <div class="form">
            <label for="login">Login</label>
            <input type="text" name="login" id="login" v-model="login">
            <label for="password">Parol</label>
            <input type="password" name="password" id="password" v-model="password">
            <Button color="main" text="Daxil ol" @click="log_in" />
            <Transition>
                <Dialog v-if="dialog" v-bind="dialog" />
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const dialog = ref("")
definePageMeta({
    layout: false
});
const login = ref("")
const password = ref("")
async function log_in() {
    try {
        const { authToken } = await api("users/login", { login: login.value, password: password.value })
        localStorage.setItem("authToken", authToken);
        useCookie('authToken', { maxAge: 10 ** 7 }).value = authToken;
        router.push("/book")
    } catch (error) {
        alert(error)
    }
}
</script>

<style scoped>
@import "../assets/css/user-login.css";
</style>