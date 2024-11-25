<template>
    <h1>Siqaret otağı variantları | <NuxtLink to="/smoking-room-options/new">Əlavə et</NuxtLink></h1>
    <ul>
        <li v-for="smokingRoomOption in smokingRoomOptions"><NuxtLink :to="'/smoking-room-options/' + smokingRoomOption.id">{{ smokingRoomOption.name }}</NuxtLink></li>
    </ul>
</template>

<script setup lang="ts">
let smokingRoomOptions = await api("smoking-room-options/view")
</script>

<style>
* {
    color: black;
    font-family: Arial;
}
</style>