<script lang='ts' setup>
// imports
import SvgHome from '@/components/svg/home.vue'
import SvgPatient from '@/components/svg/patient.vue'
import SvgNotification from '@/components/svg/notification.vue'
import { useRoute } from 'vue-router'
import { ILink } from '~/interfaces/ILink'
import { LogOut, LucideChevronRight } from 'lucide-vue-next'
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
    class='grid h-[100vh] grid-cols-[max-content_1fr] grid-rows-[min-content_1fr] bg-neutral-600'
  >
    <div :class='{
      "pl-3 pr-8": isOpen
         }'
         class='flex h-16 items-center justify-center bg-primary-600  relative  transition-all ease-out'>
      <NuxtLink class='font-semibold text-white rounded-md transition-colors mx-auto' to='/dokter'>
        <h1 v-if='isOpen' class='p-2'>Digital Patient Twin</h1>
        <img v-else alt='Digital Patient Twin' class='block w-8 h-8 mx-auto' src='/DigitalPatientTwin.png'>
      </NuxtLink>
      <Button
        :class='isOpen? "rotate-180" : "rotate-0"'
        class='rounded-full bg-primary-550 drop-shadow-md w-8 h-8 absolute -right-4 -bottom-4 z-10 hover:bg-primary-450 transition-all duration-300 focus:bg-primary-450'
        type='button'
        @click='isOpen = !isOpen'>
        <LucideChevronRight class='ml-1.5 w-6 h-6' color='white' />
      </Button>
    </div>
    <div :class='isOpen? "pl-3 pr-8": ""'
         class='z-[8] flex shadow-normal h-16 items-center justify-end pr-4'>
      <SearchProp></SearchProp>
      <NuxtLink to='/dokter/account'>
        <button
          class='appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-lg'>
          <user-circle-2 class='h-12 w-12 px-2 text-neutral-700' />
        </button>
      </NuxtLink>
    </div>
    <div :class='{
        "w-56 pl-10": isOpen,
        "px-4 w-20": !isOpen,
         }'
         class='flex flex-col justify-between bg-primary-600 pt-6 transition-all ease-out'
    >
      <ul>
        <li v-for='link in links' :key='link.path' class='mb-9'>
          <NuxtLink
            :class='isOpen && isCurrentPage(link.path) ? "bg-primary-450 text-white rounded-l-lg": "" + !isOpen && isCurrentPage(link.path) ? "bg-primary-450 text-white rounded-lg" : ""'
            :to='link.path'
            class='flex items-center appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-l-lg'
          >
            <div :class='isOpen? " pl-3": "flex-grow"'
                 class=' flex py-2 justify-center items-center gap-2'

            >
            <span>
              <component :is='link.icon' class='fill-white'></component>
            </span>
              <span v-if='isOpen' :class="{ 'text-white': !isCurrentPage(link.path) }">{{ link.text }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <div class='h-24'>
        <button
          class='flex items-center appearance-none border-transparent focus-visible:border-tertiary-500 border-2 focus-visible:outline-none rounded-l-lg'
          type='button'
          @click='logout'
        >
          <div class='py-2 pl-3 flex justify-center items-center gap-2'>
            <log-out class='h-8 w-8 pr-2 pl-1 stroke-white' />
            <div v-if='isOpen' class='text-white whitespace-nowrap'>Log out</div>
          </div>
        </button>
      </div>
    </div>
    <div ref='scrollDiv' class='overflow-auto flex flex-col min-h-full bg-neutral-50' @scroll='onScrollEvent'>
      <main class='flex-grow'>
        <slot />
      </main>
        <footer
          class='mt-auto flex items-center justify-center'
        >
          <div class='pb-5 pt-2 text-tertiary-500'>MCT 2023</div>
        </footer>
    </div>
  </div>
</template>
