<script setup lang="ts">
import DropDownSelector from '~/components/pressables/dropDownSelector.vue'
import Login from '~/components/cards/login.vue'

const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value
}
const selected = ref('one')
watch(selected, () => {
  console.log(selected.value)
})
</script>

<template>
  <!--  <div class="bg-pink-800">Hello index</div>-->
  <!--  <PressablesButton>Hello world</PressablesButton>-->
  <!--  <TemplateDashboardCards patient="15" />-->
  <!--  <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />-->
  <!--  <PressablesSelector-->
  <!--    :options="['one', 'two', 'three', 'four']"-->
  <!--    v-model:selected="selected"-->
  <!--  />-->
  <drop-down-selector
    v-model:selected="selected"
    :options="['one', 'two', 'three']"
  ></drop-down-selector>
  <Login></Login>
</template>

<style scoped></style>
