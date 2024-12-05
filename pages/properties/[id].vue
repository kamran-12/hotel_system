<template>
    <h1>Əmlakın redaktəsi</h1>
    <PropertyEditor :id="route.params.id"/>
</template>

<script setup lang="ts">
import { useRoute } from '#vue-router'
let route = useRoute()
</script>