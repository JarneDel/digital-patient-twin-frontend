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
    <div class="card">
      <div class="header">
        <img src="/Images/random_profile.jpg" class="h-7 w-7 rounded-lg"/>
        <div class="text-white">{{ fullName }}</div>
        <ul>
          <li class="py-4 text-white">
            <div>Email</div>
            <div>
              {{ useUser().value?.idTokenClaims?.preferred_username }}
            </div>
            <i class="fas fa-mobile-alt"></i>
          </li>
          <li class="py-4 text-white">
            <div>Telefoonnummer</div>
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

<style scoped>
body {
  background: #72c4bf;
}

.card {
  position: relative;
  height: auto;
  width: 300px;
  margin: 100px auto;
  border-radius: 12px;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  height: auto;
  width: 95%;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -30px;
  border-radius: 12px;
  padding: 1rem 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-image: linear-gradient(to right, #72c4bf, #72c4bf);
}

.header h3 {
  font-family: sans-serif;
  color: white;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 1px;
}

.header p {
  font-family: sans-serif;
  /* color: rgb(236, 233, 233); */
  font-size: 13px;
  top: 166px;
  left: 90px;
}



</style>
