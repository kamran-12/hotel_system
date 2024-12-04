<template>
    <Button color="main" text="Yeni" @click="addVisual" />
    <Button color="main" text="Seçilmişləri sil" @click="deleteSelected" />
    <table>
        <tr>
            <th>İdarəetmə</th>
            <th>Adı</th>
            <th>Qeydlər</th>
        </tr>
        <tr v-for="option in options">
            <td>
                <input type="checkbox" v-model="option.selected" v-if="!option.new">
                <img v-if="!(option.beingEdited)" @click="startEditing(option)" src="/assets/pencil.svg" alt="">
                <img v-if="(option.beingEdited)" @click="save(option)" src="/assets/correct-icon.svg" alt="">
                <img v-if="(option.beingEdited)" @click="endEditingOrDiscard(option)" src="/assets/incorrect-icon.svg"
                    alt="">
            </td>
            <td @dblclick="startEditing(option)">
                <span v-if="!(option.beingEdited)">{{ option.name }}</span>
                <input v-if="(option.beingEdited)" type="text" v-model="option.editable.name">
            </td>
            <td @dblclick="startEditing(option)">
                <span v-if="!(option.beingEdited)">{{ option.notes }}</span>
                <input v-if="(option.beingEdited)" type="text" v-model="option.editable.notes">
            </td>
        </tr>
    </table>
    <Dialog v-if="dialog" v-bind="dialog" />
</template>

<script setup lang="ts">
const props = defineProps(['optionName'])
import { ref } from 'vue'
let options = ref([]);
let dialog = ref(null);
options.value = (await api(`${props.optionName}/view`))
    .map(x => ({ ...x, beingEdited: false, selected: false }))
async function load() {
    options.value = (await api(`${props.optionName}/view`))
        .map(x => ({ ...x, beingEdited: false, selected: false }))
}
function endEditingOrDiscard(option) {
    if (option.new) {
        options.value = options.value.filter(option => !option.new)
    } else { endEditing(option) }
}
function endEditing(option) {
    option.beingEdited = false;
    delete option.editable;
}
function endAllEditing() {
    options.value.forEach(x => {
        endEditing(x)
    })
}
function showError(errorText) {
    dialog.value = {
        header: "Xəta",
        body: errorText,
        buttons: [{
            text: "Anladım",
            color: "main",
            async action() {
                dialog.value = null;
            }
        }]
    }
}
function startEditing(option) {
    endAllEditing();
    option.beingEdited = true;
    option.editable = { name: option.name, notes: option.notes }
}
async function save(option) {
    console.log(JSON.stringify(option))
    const action = option.id ? "edit" : "add";
    try {
        await api(`${props.optionName}/${action}`, { id: option.id, name: option.editable.name ?? "", notes: option.editable.notes ?? "" })
        load()
    } catch (error) {
        showError(error)
    }
}
function deleteSelected() {
    let selected = options.value.filter(option => option.selected)
    if (selected.length) {
        dialog.value = {
            header: "Seçilmişlər silinsin?",
            body: "Bunlar silinəcək: " + selected.map(option => option.name).join(', '),
            buttons: [{
                text: "Sil",
                color: "danger",
                async action() {
                    let ids = selected.map(option => option.id)
                    try {
                        await api(`${props.optionName}/delete`, { ids })
                    } catch (error) {
                        showError(error)
                    }
                    dialog.value = null;
                    load()
                }
            }, {
                text: "İmtina",
                color: "main",
                async action() {
                    dialog.value = null;
                }
            }]
        }
    } else {
        showError("Heç nə seçilməyib.")
    }
}
function isThereNew() {
    return options.value.filter(x => x.new).length
}
function addVisual() {
    if (!isThereNew()) {
        options.value.push({ new: true, beingEdited: true, editable: { name: "", notes: "" } })
    }
}
</script>

<style scoped>
th {
    background-color: rgb(80, 80, 224);
    color: white;
}

table,
tr,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 20px;
}

th,
td {
    padding: 8px;
}

tr {
    background-color: rgb(232, 232, 232);
}

tr:hover {
    background-color: rgb(242, 241, 241);
}

input[type=checkbox] {
    transform: scale(1.8);
    margin: 0 8px;
}

input[type=text] {
    margin: -8px;
    font-size: 20px;
    padding: 6px;
}

img {
    height: 20px;
    margin: 0px 11px -4px 11px;
    cursor: default;
}
</style>