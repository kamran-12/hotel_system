<template>
    <h1>Otaqlar</h1>
    <Button text="Yeni" color="main" @click="router.push('/rooms/new')" />
    <div class="propertywithrooms" v-for="property in properties">
        <h2 class="propertyname">{{ property.property_name }}</h2>
        <NuxtLink :to="'/rooms/' + room.id" v-for="room in rooms.filter(room => room.property_id == property.id)">
            <div class="room">{{ room.room_number + " | " + room.room_name }}</div>
        </NuxtLink>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const properties = ref(await api("properties/view"))
const rooms = ref(await api("rooms/view"))
</script>

<style scoped>
@import '../../assets/css/properties.css';
</style>