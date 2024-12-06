<template>
    <h1>Əmlaklar</h1>
    <Button text="Yeni" color="main" @click="router.push('/properties/new')" />
    <div class="properties">
        <NuxtLink v-for="item in items" :to="`/properties/${item.id}`">
            <div class="property">
                <span class="name">{{ item.property_name }}</span>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const items = ref([])

items.value = await api("properties/view")
</script>

<style scoped>
@import '../../assets/css/properties.css';
</style>