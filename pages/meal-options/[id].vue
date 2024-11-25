<template>
    <div>
        <h1>Yemək variantını redaktə et</h1>
        <label for="">Ad: </label><input type="text" name="name" id="name" v-model="name">
        <button @click="edit">Yadda saxla</button>
        <button @click="delet">Sil</button>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
let route = useRoute()
import { useRouter } from 'vue-router';
const router = useRouter()
let name = ""
async function edit() {
    await api("meal-options/edit", { id: route.params.id, newName: name })
    router.push({ path: "/meal-options" })
}
async function delet() {
    await api("meal-options/delete", { id: route.params.id })
    router.push({ path: "/meal-options" })
}
</script>

<style></style>