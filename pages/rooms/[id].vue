<template>
    <h1>Otağın redaktəsi</h1>
    <RoomEditor :id="route.params.id"/>
</template>

<script setup>
import { useRoute } from '#vue-router'
let route = useRoute()
</script>