<script setup>
import { LucideArrowLeft } from 'lucide-vue-next';

useHead({
  title: 'Page not found',
  meta: [
    {
      name: 'description',
      content: 'Sorry, but the page you were trying to view does not exist.',
    },
  ],
})
</script>

<template>
  <article
    class="flex min-h-screen flex-col-reverse items-center justify-center text-center font-mono text-gray-600 dark:text-gray-400"
  >
    <div>
      <h2 class="text-2xl font-bold md:text-6xl">404: Page not found</h2>
      <p class="mt-4 text-lg">
        Sorry, but the page you were trying to view does not exist.
      </p>
      <nuxt-link to="/" class="mt-4 max-w-fit text-lg">
        <div class="row flex gap-2">
          <LucideArrowLeft />
          <span> Go back home </span>
        </div>
      </nuxt-link>
    </div>
  </article>
</template>