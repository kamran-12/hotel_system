<template>
    <ul>
        <li v-for="link in links">
            <h1><NuxtLink :to="link.url">{{ link.name }}</NuxtLink></h1>
        </li>
    </ul>
</template>

<script setup lang="ts">
const links = [
    { url: "/property-types", name: "Əmlak tipləri" },
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