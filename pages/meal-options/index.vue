<template>
    <h1>Yemək variantları | <NuxtLink to="/meal-options/new">Əlavə et</NuxtLink></h1>
    <ul>
        <li v-for="mealOption in mealOptions"><NuxtLink :to="'/meal-options/' + mealOption.id">{{ mealOption.name }}</NuxtLink></li>
    </ul>
</template>

<script setup lang="ts">
let mealOptions = await api("meal-options/view")
</script>

<style>
* {
    color: black;
    font-family: Arial;
}
</style>