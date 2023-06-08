<script setup lang='ts'>
defineProps({
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div role="status" class="p-4 space-y-12 divide-y divide-zinc-300 rounded shadow animate-pulse dark:divide-zinc-300 md:p-6 dark:border-zinc-300"
    :style="`max-width: ${width}; height: ${height}; border-radius: ${parseInt(width) * 0.01}px; border: ${parseInt(width) * 0.002}px solid rgb(212, 212, 216);`">
    <div class="flex items-center justify-between">
        <div>
            <div class="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-300" :style="`width: ${parseInt(width) * 0.16}px; margin-bottom: ${parseInt(height) * 0.025}px;`"></div>
            <div class="w-32 h-2 bg-zinc-300 rounded-full dark:bg-zinc-300" :style="`height: ${parseInt(height) * 0.01}px;`"></div>
        </div>
        <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300" :style="`width: ${parseInt(width) * 0.16}px; margin-bottom: ${parseInt(height) * 0.025}px;`"></div>
            <div class="w-32 h-2 bg-zinc-300 rounded-full dark:bg-zinc-300" :style="`height: ${parseInt(height) * 0.01}px;`"></div>
        </div>
        <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300" :style="`width: ${parseInt(width) * 0.16}px; margin-bottom: ${parseInt(height) * 0.025}px;`"></div>
            <div class="w-32 h-2 bg-zinc-300 rounded-full dark:bg-zinc-300" :style="`height: ${parseInt(height) * 0.01}px;`"></div>
        </div>
        <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300" :style="`width: ${parseInt(width) * 0.16}px; margin-bottom: ${parseInt(height) * 0.025}px;`"></div>
            <div class="w-32 h-2 bg-zinc-300 rounded-full dark:bg-zinc-300" :style="`height: ${parseInt(height) * 0.01}px;`"></div>
        </div>
        <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300" :style="`width: ${parseInt(width) * 0.16}px; margin-bottom: ${parseInt(height) * 0.025}px;`"></div>
            <div class="w-32 h-2 bg-zinc-300 rounded-full dark:bg-zinc-300" :style="`height: ${parseInt(height) * 0.01}px;`"></div>
        </div>
        <div class="h-2.5 bg-neutral-300 rounded-full dark:bg-zinc-300 w-12"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped>

</style>
