<template>
    <div class="screen">
        <div class="sidebar">
            <h1>Otel idarəetmə sistemi</h1>
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
* {
    font-family: Arial;
    box-sizing: border-box;
}

a {
    color: black;
    display: block;
    padding: 6px 12px;
}

.screen {
    display: flex;
    height: 100dvh;
}

main,
.sidebar {
    overflow-y: scroll;
    height: 100%;
    display: inline-block;
}

.links {
    list-style-type: none;
}

ul {
    padding: 0;
    margin: 0;
}

.links li {
    display: block;
    background: linear-gradient(0deg, rgba(143, 180, 233, 1) 0%, rgba(222, 237, 254, 1) 100%);
}

a {
    text-decoration: none;
}

a:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

a:active {
    background-color: rgba(0, 0, 0, 0.15);
}

.links li:has(a.router-link-active) {
    background: linear-gradient(0deg, rgba(255, 173, 85, 1) 0%, rgba(255, 213, 140) 100%);
}

.sidebar {
    background: #a6bee2;
}

h1 {
    max-width: 250px;
    text-align: center;
}

main {
    padding: 28px;
    flex-grow: 1;
}
</style>

<style>
body,
html {
    margin: 0;
    padding: 0;
    display: block;
}
</style>