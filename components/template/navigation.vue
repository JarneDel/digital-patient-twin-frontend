<script setup lang="ts">
// imports
import SvgHome from '@/components/svg/home.vue'
import SvgPatient from '@/components/svg/patient.vue'
import SvgNotification from '@/components/svg/notification.vue'
import { useRoute } from 'vue-router'
import { ILink } from '~/interfaces/ILink';
import { LogOut, UserCircle2 } from 'lucide-vue-next'
import { msalInstance } from '~/auth'

const links: ILink[] = [
  {
    text: 'Home',
    path: '/dokter',
    icon: SvgHome,
  },
  {
    text: 'Patienten',
    path: '/dokter/patienten',
    icon: SvgPatient,
  },
  {
    text: 'Meldingen',
    path: '/dokter/meldingen',
    icon: SvgNotification,
  },
]
const scrollDiv = ref<HTMLDivElement | null>(null)

const route = useRoute()

const isCurrentPage = (path: string) => {
  return route.path === path
}

const logout = () => {
  msalInstance.logoutPopup()
}

const isScrolledToBottom = useWatchIfScrolledToBottom
// required for infinite scroll in meldingen
const onScrollEvent = () => {
  // check if scroll is at the bottom
  if (!scrollDiv.value) return
  if (!scrollDiv.value.clientHeight) return
  const scrollHeight = scrollDiv.value.scrollTop + scrollDiv.value.clientHeight
  const scrollMax = scrollDiv.value.scrollHeight
  if (scrollHeight > scrollMax - 100) {
    console.log('scrolled to bottom')
    // load more
    isScrolledToBottom.value = true
  }else {
    isScrolledToBottom.value = false
  }

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
      <NuxtLink to="/dokter/account">
        <button class="appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-lg">
          <user-circle-2 class="h-12 w-12 px-2 text-neutral-700"/>
        </button>
      </NuxtLink>
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
          <button class="py-2 pl-3 flex justify-center items-center gap-2" @click='logout'>
            <log-out class="h-8 w-8 pr-2 pl-1 stroke-white"/>
            <div class="text-white">Log out</div>
          </button>
          </NuxtLink>
      </div>

    </div>
    <div class="z-0 overflow-auto bg-neutral-50" @scroll='onScrollEvent' ref='scrollDiv'>
      <div class="pb-20 relative min-h-full">
        <div class="min-h-full">
          <slot />
        </div>
        <footer
          class="absolute right-[50%] bottom-0 mt-11 flex items-center justify-center"
        >
          <div class="pb-5 pt-2 text-tertiary-500">MCT 2023</div>
        </footer>
      </div>
    </div>
  </div>
</template>
