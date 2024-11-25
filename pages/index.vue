<template>
    <ul>
        <li v-for="link in links">
            <h1>
                <NuxtLink :to="link.url">{{ link.name }}</NuxtLink>
            </h1>
        </li>
    </ul>
</template>

<script setup lang="ts">
const links = [
    { url: "/property-types", name: "Əmlak tipləri" },
    { url: "/meal-options", name: "Yemək variantları" },
    { url: "/reservation-policies", name: "Rezervasiya siyasətləri" },
    { url: "/smoking-room-options", name: "Siqaret otağı variantları" },
    { url: "/table", name: "Cədvəl" },
    { url: "/staying-list", name: "Qalmalar siyahısı" },
    { url: "/guests", name: "Qonaqlar" },
    { url: "/custom-query", name: "Fərdi sorğu" }
]
</script>

<style scoped>
a {
    color: black;
    text-decoration: none;
    font-family: Arial;
}
</style>