<script setup lang="ts">
import SvgHome from '@/components/svg/home.vue'
import SvgPatient from '@/components/svg/patient.vue'
import SvgNotification from '@/components/svg/notification.vue'
import { UserCircle2, LogOut} from 'lucide-vue-next'
</script>

<template>
  <div
    class="grid h-[100vh] grid-cols-[max-content_1fr] grid-rows-[min-content_1fr] bg-neutral-600"
  >
    <div class="pl-3 pr-8 h-24 flex items-center justify-center">
      <div class="font-semibold">Digital Patient Twin</div>
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
    <div class="w-56 pl-10 pt-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center my-4">
          <SvgHome class="h-8 w-8 pr-2" />
          <div>Home</div>
        </div>
        <div class="flex items-center my-4">
          <SvgPatient class="h-8 w-8 pr-2" />
          <div>Patienten</div>
        </div>
        <div class="flex items-center my-4">
          <SvgNotification class="h-8 w-8 pr-2" />
          <div>Meldingen</div>
        </div>
      </div>

      <div>
        <div class="flex items-center mb-16">
          <log-out class="h-8 w-8 pr-2 pl-1"/>
          <div>Log out</div>
        </div>
      </div>
    </div>
    <div class="z-0 overflow-auto bg-white">
      <div>hello</div>
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
      <slot />
    </div>
  </div>
</template>
