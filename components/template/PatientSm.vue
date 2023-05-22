<script setup>
    import Pinrotated from '../svg/pinrotated.vue';
    import { Pencil, LineChart} from 'lucide-vue-next'
</script>

<template>
    <div class="flex items-center bg-neutral-500 w-[550px] h-[66px] rounded-lg px-4">
        <div class="grid grid-cols-[1fr_9fr_5fr_4fr_2fr_2fr] grid-rows-1">
            <Pinrotated class="self-center"/>
            <span class="self-center pl-4">full name</span>
            <span class="self-center">22/05/2023</span>
            <span class="self-center">andere</span>
            <NuxtLink class="self-center" to="dokter/[dokterid]/patients/[patientid]/edit">
                <pencil/>
            </NuxtLink>
            <NuxtLink class="self-center" to="dokter/[dokterid]/patients/[patientid]">
                <Line-chart/>
            </NuxtLink>
        </div>
    </div>
</template>