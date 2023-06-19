<script setup lang="ts">
import { Mail } from 'lucide-vue-next'

useHead({
  title: 'Je account',
  meta: [
    {
      name: 'description',
      content: 'Je accountgegevens.',
    },
  ],
})

function divideFullName(fullName: string): [string, string] {
  const names = fullName.split(' ')
  const firstName = names[0]
  const lastName = names[names.length - 1]

  return [firstName, lastName]
}

const fullName = useUser().value?.idTokenClaims?.name?.toString() ?? ''

const [lastName, firstName] = divideFullName(fullName)
console.log('First Name:', firstName)
console.log('Last Name:', lastName)
</script>

<template>
  <div class="mx-auto my-12 max-w-[67rem]">
    <h2 v-if="fullName !== null" class="mx-8 mb-8 mt-6 text-3xl font-semibold text-neutral-800">
      Mijn gegevens
    </h2>
    <div class="flex flex-col relative my-[150px] items-center justify-center">
      <div
        class="shadow-3xl shadow-shadow-500 relative mx-auto flex w-[400px] flex-col items-center rounded-[20px] bg-white bg-clip-border p-4 drop-shadow-2xl"
      >
        <div class="h-34 relative flex w-full justify-center rounded-xl bg-cover">
          <div
            class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-secondary-500"
          >
            <img
              class="h-full w-full rounded-full"
              src="/Images/avatar_default.png"
              alt=""
            />
          </div>
        </div>
        <div class="mt-16 flex flex-col items-center">
          <h4 class="text-xl font-bold text-neutral-800">
            {{ fullName }}
          </h4>
          <p class="mt-4 text-base font-normal text-gray-600">
            <span class="inline">
              <Mail class="mr-2 inline-block align-middle" />
            </span>
            <span class="inline-block align-middle">
              {{ useUser().value?.idTokenClaims?.preferred_username }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
