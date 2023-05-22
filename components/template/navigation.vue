<script setup lang="ts">
// imports
import SvgHome from '@/components/svg/home.vue'
import SvgPatient from '@/components/svg/patient.vue'
import SvgNotification from '@/components/svg/notification.vue'
import { UserCircle2, LogOut} from 'lucide-vue-next'
import { ILink } from '~/interfaces/ILink';

const links: ILink[] = [
  {
    text: 'Home',
    path: '/dokter/[id]',
    icon: SvgHome
  },
  {
    text: 'Patienten',
    path: '/dokter/[id]/patienten',
    icon: SvgPatient
  },
  {
    text: "Meldingen",
    path: '/dokter/[id]/meldingen',
    icon: SvgNotification
  }
]

</script>

<template>
  <div
    class="grid h-[100vh] grid-cols-[max-content_1fr] grid-rows-[min-content_1fr] bg-neutral-600"
  >
    <div class="pl-3 pr-8 h-24 flex items-center justify-center bg-primary-600">
      <div class="font-semibold text-white">Digital Patient Twin</div>
    </div>
    <div class="z-10 flex pl-3 pr-8 shadow-normal h-24 items-center justify-end">
      <div>
        <SvgNotification class="h-12 w-12 px-2 relative" />
        <div class="bg-primary-500 rounded-full w-4 h-4 text-[10px] absolute top-8 right-[87px] flex justify-center items-center">
          <div class="text-white">+9</div>
        </div>
      </div>
      <user-circle-2 class="h-12 w-12 px-2"/>
    </div>
    <div class="w-56 pl-10 pt-6 flex flex-col justify-between bg-primary-600">
      <ul>
        <li v-for="link in links" class="mt-2">
          <NuxtLink
            :to="link.path"
            class="flex items-center"
          >
          <span>
            <component :is="link.icon"></component>
          </span>
          <span class="text-white">{{link.text}}</span>
          </NuxtLink>
        </li>
      </ul>

      <div>
        <button type="button">
          <div class="flex items-center mb-16">
            <log-out class="h-8 w-8 pr-2 pl-1 stroke-white"/>
            <div class="text-white">Log out</div>
          </div>
        </button>
      </div>
    </div>
    <div class="z-0 overflow-auto bg-white">
      <div>hello</div>
      <slot />
      <footer class="flex justify-center items-center">
        <div class="bg-white text-tertiary-500 pb-5 pt-2">MCT 2023</div>
      </footer>
    </div>
  </div>
</template>
