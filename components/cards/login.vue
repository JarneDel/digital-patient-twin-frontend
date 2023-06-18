<script setup lang='ts'>
import Kop2 from '~/components/Text/kop2.vue'

defineEmits(['click'])
</script>

<template>
  <div class='m-10 max-w-[434px] rounded-lg drop-shadow-2xl'>
    <div>
      <picture>
        <source srcset='/Images/dokter.webp' type='image/webp' />
        <source srcset='/Images/dokter-sm.jpg' type='image/jpg' />
        <img
          class='h-[350px] w-[434px] rounded-t-lg object-cover'
          src='/Images/dokter-sm.jpg'
          alt='doctor'
        />
      </picture>
    </div>
    <div class='rounded-b-lg bg-neutral-600 p-6 pb-4'>
      <kop2 class='pb-4'>Dokter Login</kop2>
      <p class='pb-6 text-neutral-800'>Log in met je Microsoft Account</p>
      <pressables-button @click='$emit("click")' width='100%' padding='12px'>
        Login met Microsoft
      </pressables-button>
    </div>
  </div>
</template>
