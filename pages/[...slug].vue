<template>
  <article
    class="flex min-h-screen flex-col-reverse items-center justify-center text-center font-mono text-gray-600 dark:text-gray-400"
  >
    <div>
      <h2 class="text-2xl font-bold md:text-6xl">404:Page_not_found</h2>
      <p class="mt-4 text-lg">
        Sorry, but the page you were trying to view does not exist.
      </p>
      <nuxt-link to="/" class="mt-4 max-w-fit text-lg">
        <div class="row flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-left"
          >
            <line x1="19" x2="5" y1="12" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span> Go back home </span>
        </div>
      </nuxt-link>
    </div>
    <client-only>
      <lottie404 ></lottie404>
    </client-only>
  </article>
</template>

<script setup>
useHead({
  title: '404 | Page not found',
  meta: [
    {
      name: 'description',
      content: 'Sorry, but the page you were trying to view does not exist.',
    },
  ],
})
</script>

<style scoped></style>
