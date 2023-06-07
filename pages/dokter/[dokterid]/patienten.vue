<script setup lang='ts'>
const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value
}
const routeID = useRoute().params.dokterid as string
const id = ref(routeID)
id.value = "878c95cf-e82d-40a5-a56c-8790427f1657"

// const registerPatient = ref<IPatientAlgemeen>({
//   achternaam: 'Jonkheere',
//   geslacht: 'M',
//   voornaam: 'Joshy',
//   geboortedatum: new Date(1980, 1, 1),
//   id: 1,
// })

const view = ref<'view' | 'edit'>('view')

</script>

<template>
    <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />

    <patients-realtime :for="id" class="mx-12 my-10 shadow-normal" :type="view" />

</template>

<style scoped>

</style>