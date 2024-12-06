<script setup>
import { useHead } from '#app';

const props = defineProps(["error"])

useHead({
    title: `Error ${props.error.statusCode}`,
    meta: [{ hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' }]
})

</script>

<template>
    <NuxtLayout name="default">
        <div class="error-container">
            <h1> {{ "Xəta " + props.error.statusCode }}</h1>
            <p>{{ { 404: "Səhifə tapılmadı", 500: "Serverdə xəta" }[props.error.statusCode] }}</p>
        </div>
    </NuxtLayout>
</template>

<style scoped>
@import "./assets/css/error.css";
</style>