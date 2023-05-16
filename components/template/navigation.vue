<script setup lang="ts"></script>

<template>
  <div
    class="grid h-[100vh] grid-flow-col grid-cols-[max-content_1fr] grid-rows-[min-content_1fr] gap-4"
  >
    <div class="col-span-2 flex justify-between pl-3 pr-8 pt-5">
      <div class="font-semibold">Digital Patient Twin</div>
      <div class="flex">
        <div class="mx-4">icon 1</div>
        <div class="mx-4">icon 2</div>
      </div>
    </div>
    <div class="pl-3">
      <div>Home</div>
      <div>Patienten</div>
      <div>Meldingen</div>
    </div>
    <div class="overflow-auto">
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
    </div>
  </div>
</template>
