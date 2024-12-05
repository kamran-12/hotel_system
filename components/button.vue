<template>
  <button :class="color" @click.prevent="emit('click')">{{text}}</button>
</template>
<script setup lang="ts">
let props = defineProps(["color", "text"])
let emit = defineEmits(['click'])
</script>

<style scoped>
@import "../assets/css/button.css";
</style>