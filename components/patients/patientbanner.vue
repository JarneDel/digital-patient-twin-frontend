<template>
  <div class="h-[100vh] w-[250px] bg-secondary-200 p-5">
    <!-- profile -->
    <div class="rounded-lg text-center">
      <img :src="imgUrl" alt="" class="mx-auto mb-4" />
      <h1 class="mb-2 font-semibold">{{ patient }}</h1>
      <p class="mb-2 text-sm">{{ age }}</p>
      <p>{{ gender }}</p>
    </div>
    <!-- alerts and vital(s) -->
    <div class="align-center relative mt-8 flex justify-center text-center mx-auto">
      <SvgNotification></SvgNotification>
      <div
        class="absolute left-[108px] flex h-4 w-4 items-center justify-center rounded-lg bg-primary-500 text-[10px] text-white"
      >
        +9
      </div>
    </div>
    <div>
      <!-- vital and date  -->
      <div class="mb-4 block text-center">
        <div class="text-sm">{{ typeAlert }}</div>
        <div class="text-sm">{{ alertDate }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgNotification from '@/components/svg/notification.vue'
import { AlertType } from '~/interfaces/AlertType'
defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  patient: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  alertDate: {
    type: String,
    required: true,
  },
  typeAlert: {
    type: String as PropType<AlertType>,
    required: true,
  },
})

const imgUrl = ref('images/profile.png')
</script>
