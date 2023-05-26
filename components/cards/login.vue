<script setup lang='ts'>
import Kop2 from '~/components/Text/kop2.vue'

defineEmits(['click'])
</script>

<template>
  <div class='m-10 max-w-[434px] rounded-lg drop-shadow-2xl'>
    <div>
      <picture>
        <source srcset='Images/dokter.webp' type='image/webp' />
        <source srcset='Images/dokter-sm.jpg' type='image/jpg' />
        <img
          class='h-[350px] w-[434px] rounded-t-lg object-cover'
          src='Images/dokter-sm.jpg'
          alt='doctor'
        />
      </picture>
    </div>
    <div class='rounded-b-lg bg-neutral-600 p-6 pb-4'>
      <kop2 class='pb-4'>Dokter Login</kop2>
      <p class='pb-6'>Log in with your Microsoft Account</p>
      <pressables-button @click='$emit("click")' class='text-neutral-600' width='100%' padding='12px'>
        Login with Microsoft
      </pressables-button>
    </div>
  </div>

  <!-- <div class="m-8 max-w-[35rem] rounded-lg drop-shadow-2xl">
    <div>
      <picture>
        <source srcset="Images/dokter.webp" type="image/webp" />
        <source srcset="Images/dokter-sm.jpg" type="image/jpg" />
        <img
          class="h-[28.125rem] w-[35rem] rounded-t-lg object-cover"
          src="Images/dokter-sm.jpg"
          alt="doctor"
        />
      </picture>
    </div>
    <div class="rounded-b-lg bg-neutral-600 p-6 pb-4">
      <kop2>Dokter Login</kop2>
      <p class="mb-2">Log in with your Microsoft Account</p>
      <pressables-button class="text-neutral-600" width="100%" padding="12px">
        Login with Microsoft
      </pressables-button>
    </div>
  </div> -->

</template>

<style scoped></style>
