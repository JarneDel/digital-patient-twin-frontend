<template>
  <!-- voornaam -->
  <label for="firstname" class="mb-2 block">Voornaam</label>
  <input
    type="text"
    id="firstname"
    v-model="props.value"
    :class="{ 'border-red-500': isFirstNameInvalid }"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="isFirstNameInvalid" class="break-word inline-block text-red-500">
    {{ firstNameErrorMessage }}
  </span>
</template>
<script setup lang="ts">
const isFirstNameInvalid = ref(false)
const firstNameErrorMessage = ref('')

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:value', 'update:isValid'])

// watch(props.value, newValue => {
//   if (newValue.trim().length === 0) {
//     isFirstNameInvalid.value = true
//   } else if (newValue.trim().length < 2) {
//     isFirstNameInvalid.value = true
//     firstNameErrorMessage.value =
//       'Uw voornaam moet minstens 2 karakters bevatten.'
//   } else {
//     isFirstNameInvalid.value = false
//   }
// })
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style>

<!-- 
<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})
const emits = defineEmits(['update:input', "update:isValid"])

watch(props, (newValue) => {
  console.log(newValue)

  emits('update:isValid', false)


  // FORM VALIDATION
})



</script>

<template>
  <label></label>
  <input
    type='text'
    v-model='value'
   value=''>
  </input>

</template>

<style scoped>

</style> -->
