<template>
    <textarea name="query" id="query" v-model="query"></textarea>
    <button @click="send">Göndər</button>
    <div id="response">{{ response }}</div>
</template>

<script setup lang="ts">
let query = ""
let response: any = ""
let send = async function() {
    try {
        let res = await api('custom-query', { query })
        response = res
    } catch (error) {
        response = error
    }
}
</script>

<style></style>