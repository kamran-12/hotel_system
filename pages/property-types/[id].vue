<template>
    <div>
        <h1>Əmlak tipini redaktə et</h1>
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
function edit() {
    api("property-types/edit", { id: route.params.id, newName: name })
    router.push({ path: "/property-types" })
}
function delet() {
    api("property-types/delete", { id: route.params.id })
    router.push({ path: "/property-types" })
}
</script>

<style></style>