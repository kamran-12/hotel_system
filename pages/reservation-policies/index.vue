<template>
    <h1>Rezervasiya siyasətləri | <NuxtLink to="/reservation-policies/new">Əlavə et</NuxtLink></h1>
    <ul>
        <li v-for="reservationPolicy in reservationPolicies"><NuxtLink :to="'/reservation-policies/' + reservationPolicy.id">{{ reservationPolicy.name }}</NuxtLink></li>
    </ul>
</template>

<script setup lang="ts">
let reservationPolicies = await api("reservation-policies/view")
</script>

<style>
* {
    color: black;
    font-family: Arial;
}
</style>