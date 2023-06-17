<script setup>
import { Switch } from '@headlessui/vue'

const emits = defineEmits(['update:enabled']) // Define custom event
const props = defineProps({
  enabled: {
    type: Boolean,
    required: true,
  },
  srMessage: {
    type: String,
    required: false,
    default: 'Enable notifications',
  },

})

// Emit the custom event when the value of `enabled` changes
</script>

<template>
  <Switch
    :model-value="enabled"
    @model-value="$emit('update:enabled', $event.target.value)"
  :class="enabled ? 'bg-tertiary-400' : 'bg-tertiary-200'"
  class="relative inline-flex h-6  w-11 items-center rounded-full"
  >
  <span class="sr-only">Enable notifications</span>
  <span
    :class="enabled ? 'translate-x-6' : 'translate-x-1'"
    class="inline-block h-4 w-4 transform rounded-full bg-white transition"
  />
  </Switch>
</template>