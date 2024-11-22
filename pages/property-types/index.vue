<template>
    <h1>Əmlak tipləri | <NuxtLink to="/property-types/new">Əlavə et</NuxtLink></h1>
    <ul>
        <li v-for="propertyType in propertyTypes"><NuxtLink :to="'/property-types/' + propertyType.id">{{ propertyType.name }}</NuxtLink></li>
    </ul>
</template>

<script setup lang="ts">
let propertyTypes = await api("property-types/view")
</script>

<style>
* {
    color: black;
    font-family: Arial;
}
</style>