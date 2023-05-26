<script setup lang="ts">
// imports
import SvgHome from '@/components/svg/home.vue'
import SvgPatient from '@/components/svg/patient.vue'
import SvgNotification from '@/components/svg/notification.vue'
import { useRoute } from 'vue-router'
import { ILink } from '~/interfaces/ILink';
import { UserCircle2, LogOut} from 'lucide-vue-next'

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

const route = useRoute()

const isCurrentPage = (path: string) => {
  return route.path === path
}


</script>

<template>
  <div
    class="grid h-[100vh] grid-cols-[max-content_1fr] grid-rows-[min-content_1fr] bg-neutral-600"
  >
    <div class="flex h-24 items-center justify-center bg-primary-600 pl-3 pr-8">
      <div class="font-semibold text-white">Digital Patient Twin</div>
    </div>
    <div class="z-10 flex pl-3 pr-8 shadow-normal h-24 items-center justify-end">
      <button class="appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-lg">
        <SvgNotification class="h-12 w-12 px-2 relative fill-black" />
        <div class="bg-primary-500 rounded-full w-4 h-4 text-[10px] absolute top-8 right-[87px] flex justify-center items-center">
          <div class="text-white">+9</div>
        </div>
      </button>
      <button class="appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-lg">
        <user-circle-2 class="h-12 w-12 px-2"/>
      </button>
    </div>
    <div class="flex w-56 flex-col justify-between bg-primary-600 pl-10 pt-6">
      <ul>
        <li v-for="link in links" :key="link.path" class="mb-9">
          <NuxtLink
            :to="link.path"
            class="flex items-center appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-l-lg"
            :class="{ 'bg-primary-450 text-white rounded-l-lg': isCurrentPage(link.path) }"
          >
          <div class="py-2 pl-3 flex justify-center items-center gap-2">
            <span>
              <component :is="link.icon" class="fill-white"></component>
            </span>
            <span :class="{ 'text-white': !isCurrentPage(link.path) }">{{ link.text }}</span>
          </div>
          </NuxtLink>
        </li>
      </ul>
      <div class="h-24">
        <NuxtLink
            to="/login"
            class="flex items-center appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-l-lg"
          >
          <div class="py-2 pl-3 flex justify-center items-center gap-2">
            <log-out class="h-8 w-8 pr-2 pl-1 stroke-white"/>
            <div class="text-white">Log out</div>
          </div>
          </NuxtLink>
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
