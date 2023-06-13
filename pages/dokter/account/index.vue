<script setup lang='ts'>
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
  const names = fullName.split(' ');
  const firstName = names[0];
  const lastName = names[names.length - 1];

  return [firstName, lastName];
}

const fullName = useUser().value?.idTokenClaims?.name?.toString() ?? '';

const [firstName, lastName] = divideFullName(fullName);
console.log('First Name:', firstName);
console.log('Last Name:', lastName); 
</script>

<template>
  <div>hallo</div>
  <div>{{ useUser().value?.idTokenClaims?.name }}</div>
  <div>{{ divideFullName(fullName)[0] }}</div>
  <div>{{ divideFullName(fullName)[1] }}</div>
  <div>{{ useUser().value?.idTokenClaims?.preferred_username }}</div>
</template>

<style scoped>

</style>