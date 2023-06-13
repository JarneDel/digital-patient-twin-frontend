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
    <div class="mx-8 h-auto w-fit rounded-lg bg-secondary-300 py-8 px-6 shadow-normal">
      <img
      class='w-32 h-32 mx-auto rounded-full object-cover'
      src='/Images/random_profile.jpg'
      alt='doctor'
      />
      <div class="mx-8 my-2 flex flex-col items-center justify-center md:flex-row">
        <div class="lg:col-span-1">
          <TextKop2 class="my-5">Persoonlijke informatie</TextKop2>
          <div class="flex flex-col gap-5">
            <div class="flex items-center">
              <h1 class="mr-3 font-medium capitalize">achternaam</h1>
              <div>{{ divideFullName(fullName)[0] }}</div>
            </div>
            <div class="flex items-center">
              <h1 class="mr-3 font-medium capitalize">voornaam:</h1>
              <div>{{ divideFullName(fullName)[1] }}</div>
            </div>
          </div>

          <TextKop2 class="my-5">Contact informatie</TextKop2>
          <div class="flex items-center">
            <h1 class="mr-3 font-medium capitalize">email:</h1>
            <div>
              {{ useUser().value?.idTokenClaims?.preferred_username }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
