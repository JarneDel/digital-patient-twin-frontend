<script lang="ts">
export default defineComponent( {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: false,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array as () => string[],
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update:isValid'],
  setup(props, { emit }) {
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      console.log(value);
      emit('update:modelValue', value);
    };

    return {
      updateValue,
    };
  },
});
</script>

<template>
  <label :id='inputId'>{{ label }}</label>
  <select
    :id="inputId"
    :value="modelValue"
    @change="updateValue"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  >
    <option disabled value="">Selecteer {{ label }}</option>
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    Invalid input.
  </div>
</template>

<style scoped></style>
