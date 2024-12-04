<template>
    <div class="background">
        <div class="window">
            <h1>{{ header }}</h1>
            <p>{{ body }}</p>
            <Button v-for="button in buttons" :color="button.color" :text="button.text" @click="button.action"></Button>
        </div>
    </div>
</template>
<script setup lang="ts">
let props = defineProps(["header", "body", "buttons"])
</script>
<style scoped>
.background {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    backdrop-filter: blur(6px);
}
.window {
    background: white;
    width: 500px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.2)
}
</style>