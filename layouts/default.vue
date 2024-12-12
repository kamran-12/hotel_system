<template>
    <div class="screen">
        <div class="sidebar">
            <h1><NuxtLink to="/">Otel idarəetmə sistemi</NuxtLink></h1>
            <ul class="links">
                <li v-for="link in links">
                    <NuxtLink :to="link.url">{{ link.name }}</NuxtLink>
                </li>
            </ul>
        </div>
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
const links = [
    { url: "/property-types", name: "Əmlak tipləri" },
    { url: "/meal-options", name: "Yemək variantları" },
    { url: "/reservation-policies", name: "Rezervasiya siyasətləri" },
    { url: "/smoking-room-options", name: "Siqaret otağı variantları" },
    { url: "/properties", name: "Əmlaklar" },
    { url: "/rooms", name: "Otaqlar" },
    { url: "/admins", name: "Adminlər" },
    { url: "/users", name: "İstifadəçilər" },
    { url: "/bookings", name: "Rezervasiyalar" },
    { url: "/custom-query", name: "Fərdi sorğu" }
]
</script>

<style scoped>
@import "../assets/css/default.css";
</style>

<style>
@import "../assets/css/all.css";
</style>