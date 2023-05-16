<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const userData = ref(route.params.id)
console.log(userData.value);

// fetch the user information when params change
</script>

<template>
  <div>
    Hallo dokter: {{ userData }}
  </div>
</template>

<style scoped>

</style>