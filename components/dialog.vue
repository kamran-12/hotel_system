<template>
    <div class="background">
        <div class="window">
            <h1>{{ header }}</h1>
            <p>{{ body }}</p>
            <Button v-for="button in buttons" :color="button.color" :text="button.text" @click="button.action"></Button>
        </div>
    </div>
</template>

<script setup>
let props = defineProps(["header", "body", "buttons"])
</script>

<style scoped>
@import "../assets/css/dialog.css";
</style>