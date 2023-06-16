<script setup lang="ts">
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

<!-- <template>
  <div class="mx-auto my-12 max-w-[67rem]">
    <h2 v-if="fullName !== null" class="mx-8 mb-8 mt-6 text-3xl font-semibold">
      Mijn gegevens
    </h2>
    <div class="relative h-auto w-[300px] my-[100px] mx-auto rounded-xl">
      <div class="flex flex-col justify-between items-center absolute h-auto w-auto mx-0 my-auto left-0 right-0 -top-8 rounded-xl px-4 py-4 shadow-normal bg-secondary-300">
        <img src="/Images/random_profile.jpg" class="rounded-full mb-3"/>
        <div class="text-white text-2xl font-semibold">{{ fullName }}</div>
        <ul>
          <li class="py-4 text-white">
            <div class="font-semibold">Email</div>
            <div>
              {{ useUser().value?.idTokenClaims?.preferred_username }}
            </div>
            <i class="fas fa-mobile-alt"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div class="flex h-[100vh] flex-col items-center justify-center">
    <div
      class="shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:!shadow-none relative mx-auto flex w-[400px] flex-col items-center rounded-[20px] bg-white bg-clip-border p-4 dark:text-white"
    >
      <div class="h-34 relative flex w-full justify-center rounded-xl bg-cover">
        <div
          class="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400"
        >
          <img
            class="h-full w-full rounded-full"
            src="/Images/random_profile.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="mt-16 flex flex-col items-center">
        <h4 class="text-xl font-bold text-black">
          {{ fullName }}
        </h4>
        <p class="text-base font-normal text-gray-600">
          {{ useUser().value?.idTokenClaims?.preferred_username }}
        </p>
      </div>
      <!-- <div class="mb-3 mt-6 flex gap-14 md:!gap-14">
        <div class="flex flex-col items-center justify-center">
          <p class="text-2xl font-bold">17</p>
          <p class="text-sm font-normal text-gray-600">Posts</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-2xl font-bold">9.7K</p>
          <p class="text-sm font-normal text-gray-600">Followers</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-2xl font-bold dark:text-white">434</p>
          <p class="text-sm font-normal text-gray-600">Following</p>
        </div>
      </div> -->
    </div>
  </div>
</template>
