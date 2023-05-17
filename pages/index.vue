<script setup lang="ts">
const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value
}
</script>

<template>
  <div class="bg-pink-800">Hello index</div>
  <PressablesButton>Hello world</PressablesButton>
  <TemplateFooter />
  <TemplateDashboardCards patient="15" />
  <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />
  <PressablesEdit />
</template>

<style scoped></style>
