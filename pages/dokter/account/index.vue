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

<template>
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
</template>

