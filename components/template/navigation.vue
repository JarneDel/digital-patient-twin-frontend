<script lang="ts" setup>
// imports
import SvgHome from '@/components/svg/home.vue'
import SvgPatient from '@/components/svg/patient.vue'
import SvgNotification from '@/components/svg/notification.vue'
import { useRoute } from 'vue-router'
import { ILink } from '~/interfaces/ILink'
import { LogOut, LucideChevronRight, UserCircle2 } from 'lucide-vue-next'
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

const logout = async () => {
  await msalInstance.logoutPopup()
  navigateTo('/login')
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
  } else {
    isScrolledToBottom.value = false
  }
}
const isOpen = ref<Boolean>(false)
// store isOpen in localstorage
watch(isOpen, () => {
  localStorage.setItem('navigationIsOpen', isOpen.value.toString())
})

// load isOpen from localstorage
onMounted(() => {
  const isOpenFromLocalStorage = localStorage.getItem('navigationIsOpen')
  if (isOpenFromLocalStorage) {
    isOpen.value = isOpenFromLocalStorage === 'true'
  }
})
</script>

<template>
  <div
    class="grid h-[100vh] grid-cols-[max-content_1fr] grid-rows-[min-content_1fr] bg-neutral-600"
  >
    <div
      :class="{
        'pl-3 pr-8': isOpen,
      }"
      class="relative flex h-16 items-center justify-center bg-primary-600 transition-all ease-out"
    >
      <NuxtLink
        class="mx-auto rounded-md font-semibold text-white transition-colors outline-none ring-transparent ring-2 focus:ring-tertiary-500 p-1"
        to="/dokter"
      >
        <h1 v-if="isOpen" class="p-2">Digital Patient Twin</h1>
        <img
          v-else
          alt="Digital Patient Twin"
          class="mx-auto block h-8 w-8"
          src="/DigitalPatientTwin.png"
        />
      </NuxtLink>
      <button
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
        class="absolute -bottom-4 -right-4 z-10 h-8 w-8 rounded-full bg-primary-550 drop-shadow-md transition-all duration-300 hover:bg-primary-450 focus:bg-primary-450 outline-none ring-transparent ring-2 focus:ring-tertiary-500"
        type="button"
        @click="isOpen = !isOpen"
      >
        <LucideChevronRight class="ml-1.5 h-6 w-6" color="white" />
      </button>
    </div>
    <div
      :class="isOpen ? 'pl-3 pr-8' : ''"
      class="z-[8] flex h-16 items-center justify-end pr-4 shadow-normal"
    >
      <SearchProp></SearchProp>
      <NuxtLink
        to="/dokter/account"
        class="appearance-none rounded-lg border-2 border-transparent focus-visible:border-tertiary-500 focus-visible:outline-none"
      >
        <user-circle2 class="h-12 w-12 px-2 text-neutral-700" />
      </NuxtLink>
    </div>
    <div
      :class="{
        'w-56 pl-10': isOpen,
        'w-20 px-4': !isOpen,
      }"
      class="flex flex-col justify-between bg-primary-600 pt-6 transition-all ease-out"
    >
      <ul>
        <li v-for="link in links" :key="link.path" class="mb-9">
          <NuxtLink
            :class="
              isOpen && isCurrentPage(link.path)
                ? 'rounded-l-lg bg-primary-450 text-white'
                : '' + !isOpen && isCurrentPage(link.path)
                ? 'rounded-lg bg-primary-450 text-white'
                : ''
            "
            :to="link.path"
            class="flex appearance-none items-center rounded-l-lg border-2 border-transparent focus-visible:border-tertiary-500 focus-visible:outline-none"
          >
            <div
              :class="isOpen ? ' pl-3' : 'flex-grow'"
              class="flex items-center justify-center gap-2 py-2"
            >
              <span>
                <component :is="link.icon" class="fill-white"></component>
              </span>
              <span
                v-if="isOpen"
                :class="{ 'text-white': !isCurrentPage(link.path) }"
                >{{ link.text }}</span
              >
            </div>
          </NuxtLink>
        </li>
      </ul>
      <div class="h-24">
        <button
          class="flex appearance-none items-center rounded-l-lg border-2 border-transparent focus-visible:border-tertiary-500 focus-visible:outline-none"
          type="button"
          @click="logout"
        >
          <div class="flex items-center justify-center gap-2 py-2 pl-3">
            <log-out class="h-8 w-8 stroke-white pl-1 pr-2" />
            <div v-if="isOpen" class="whitespace-nowrap text-white">
              Log out
            </div>
          </div>
        </button>
      </div>
    </div>
    <div
      ref="scrollDiv"
      class="flex min-h-full flex-col overflow-auto bg-neutral-50"
      @scroll="onScrollEvent"
    >
      <main class="flex-grow">
        <slot />
      </main>
      <footer class="mt-auto flex items-center justify-center">
        <div class="pb-5 pt-2 text-tertiary-500">MCT 2023</div>
      </footer>
    </div>
  </div>
</template>
