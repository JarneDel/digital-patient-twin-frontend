<template>
  <!-- floating label  -->
  <!-- <div class="relative">
    <input
      type="text"
      id="name"
      class="border-1 peer block w-full appearance-none rounded-lg border-gray-300 border-gray-600 bg-gray-100 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:border-primary-500 focus:outline-none focus:ring-0"
      placeholder=" "
    />
    <label
      for="name"
      class="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 peer-focus:dark:text-primary-500"
      >Naam</label
    >
  </div> -->

  <form>
    <label @submit="" for="firstname">Voornaam</label>
    <input
      type="text"
      name="firstname"
      id="firstname"
      class="focus:border-tertiary-600 peer appearance-none rounded-lg border-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0"
    />
    <label for="birthdate">geboortedatum</label>
    <input
      type="date"
      name="birthdate"
      id="birthdate"
      class="focus:border-tertiary-600 peer appearance-none rounded-lg border-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0"
    />
  </form>
</template>

<script setup lang="ts"></script>
