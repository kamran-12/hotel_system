<template>
  <button :class="color" @click.prevent="emit('click')">{{text}}</button>
</template>
<script setup>
let props = defineProps(["color", "text"])
let emit = defineEmits(['click'])
</script>

<style scoped>
@import "../assets/css/button.css";
</style>