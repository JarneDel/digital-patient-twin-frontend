<script setup lang="ts">
// imports
import SvgHome from '@/components/svg/home.vue'
import SvgPatient from '@/components/svg/patient.vue'
import SvgNotification from '@/components/svg/notification.vue'
import { UserCircle2, LogOut } from 'lucide-vue-next'
import { ILink } from '~/interfaces/ILink'

const links: ILink[] = [
  {
    text: 'Home',
    path: '/dokter/[dokterid]',
    icon: SvgHome,
  },
  {
    text: 'Patienten',
    path: '/dokter/[dokterid]/patienten',
    icon: SvgPatient,
  },
  {
    text: 'Meldingen',
    path: '/dokter/[dokterid]/meldingen',
    icon: SvgNotification,
  },
]
</script>

<template>
  <div
    class="grid h-[100vh] grid-cols-[max-content_1fr] grid-rows-[min-content_1fr] bg-neutral-600"
  >
    <div class="flex h-24 items-center justify-center bg-primary-600 pl-3 pr-8">
      <div class="font-semibold text-white">Digital Patient Twin</div>
    </div>
    <div
      class="z-10 flex h-24 items-center justify-end pl-3 pr-8 shadow-normal"
    >
      <div>
        <SvgNotification class="relative h-12 w-12 fill-black px-2" />
        <div
          class="absolute right-[87px] top-8 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px]"
        >
          <div class="text-white">+9</div>
        </div>
      </div>
      <user-circle-2 class="h-12 w-12 px-2" />
    </div>
    <div class="flex w-56 flex-col justify-between bg-primary-600 pl-10 pt-6">
      <ul>
        <li v-for="link in links" class="mb-10">
          <NuxtLink :to="link.path" class="flex items-center">
            <span>
              <component :is="link.icon" class="fill-white"></component>
            </span>
            <span class="text-white">{{ link.text }}</span>
          </NuxtLink>
        </li>
      </ul>

      <div>
        <button type="button">
          <div class="mb-16 flex items-center">
            <log-out class="h-8 w-8 stroke-white pl-1 pr-2" />
            <div class="text-white">Log out</div>
          </div>
        </button>
      </div>
    </div>
    <div class="relative z-0 overflow-auto bg-white">
      <div class="pb-11">
        <slot />
        <footer
          class="absolute right-[50%] mt-11 flex items-center justify-center"
        >
          <div class="bg-white pb-5 pt-2 text-tertiary-500">MCT 2023</div>
        </footer>
      </div>
    </div>
  </div>
</template>
