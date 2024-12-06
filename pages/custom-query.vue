<template>
    <textarea style="display:block" name="query" id="query" v-model="query"></textarea>
    <button @click="send">Göndər</button>
    <div id="response">{{ response }}</div>
</template>

<script setup>
import { ref } from 'vue'
let query = ref("")
let response = ref("")
let send = async function () {
    try {
        let res = await api('custom-query', { query: query.value })
        response.value = res
    } catch (error) {
        response.value = error
    }
}
</script>