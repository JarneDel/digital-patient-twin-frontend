<script lang="ts">
export default {
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
    type: {
      type: String as PropType<'text' | 'email' | 'password' | "date" | "tel">,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<'half' | 'full'>,
      required: false,
      default: 'full',
    },
    inputId: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update:isValid'],
  methods: {
    convertDate(date: string) {
      // date: dd/mm/yyyy --> yyyy-mm-dd
      // check if format is dd/mm/yyyy or yyyy-mm-dd
      if (date.includes('-')) {
        return date;
      }

      const dateArray = date.split('/');
      return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    },
  },
};
</script>

<template>
  <div>
    <label :for='inputId' class="text-neutral-800">{{ label }}</label>
    <input
      :type="type"
      :id="inputId"
      :value="type === 'date' ? convertDate(modelValue) : modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="peer block h-fit appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      :class='{
      "w-1/2": size === "half",
      "w-full": size === "full",
    }'
    />
    <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
      Invalid input.
    </div>
  </div>

</template>
