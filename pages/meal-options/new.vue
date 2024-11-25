<template>
    <form @submit.prevent="send">
        <h1>Yemək variantı əlavə et</h1>
        <label for="">Ad: </label><input type="text" name="name" id="name" v-model="name">
        <button type="submit">Əlavə et</button>
    </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
let name = ""
async function send() {
    await api("meal-options/add", { name })
    router.push({ path: "/meal-options" })
}
</script>

<style>
label,
input,
button {
    font-size: 20px;
    padding: 8px;
    margin: 8px;
}
</style>