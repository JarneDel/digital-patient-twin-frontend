<script setup>
    import { ArrowUp, LineChart } from 'lucide-vue-next';
    import Heartrate from '../svg/heartrate.vue';

</script>

<template>
    <div class="grid grid-cols-[12px_120px_250px_150px_150px_150px_48px] shadow-normal grid-rows-1 p-2 w-[900px] bg-white rounded-lg my-3">
        <div class="bg-primary-375 w-[3px]"></div>
        <Heartrate class="fill-primary-325 bg-primary-250 w-12 h-12 p-2 rounded-lg self-center" />
        <!-- heartrate en streepje moeten van kleur kunnen veranderen dynamisch -->
        <div class="self-center">
            <div>Joshy Jonckheere</div>
            <div class="text-sm text-neutral-100">16:53</div>
        </div>
        <div class="self-center">
            <div>22/05/2003</div>
            <div class="text-sm text-neutral-100">20 jaar</div>
        </div>
        <div class="flex flex-col items-center pr-10">
            <div>Hartslag</div>
            <div class="flex items-center">
                <ArrowUp />
                <div class="text-base font-semibold">120 bpm</div>
            </div>
        </div>
        <div class="self-center">
            <div>actief voor</div>
            <div class="text-sm text-neutral-100">7 minuten</div>
        </div>
        <div class="self-center">
            <NuxtLink to="dokter/[dokterid]/patients/[patientid]">
                <Line-chart />
            </NuxtLink>
        </div>
    </div>

    <div class="grid grid-cols-[12px_120px_250px_150px_150px_150px_48px] shadow-normal grid-rows-1 p-2 w-[900px] bg-white rounded-lg">
        <div class="bg-other-200 w-[3px]"></div>
        <Heartrate class="fill-other-200 bg-other-50 w-12 h-12 p-2 rounded-lg self-center" />
        <!-- heartrate en streepje moeten van kleur kunnen veranderen dynamisch -->
        <div class="self-center">
            <div>Joshy Jonckheere</div>
            <div class="text-sm text-neutral-100">16:53</div>
        </div>
        <div class="self-center">
            <div>22/05/2003</div>
            <div class="text-sm text-neutral-100">20 jaar</div>
        </div>
        <div class="flex flex-col items-center pr-10">
            <div>Hartslag</div>
            <div class="flex items-center">
                <ArrowUp />
                <div class="text-base font-semibold">120 bpm</div>
            </div>
        </div>
        <div class="self-center">
            <div>actief voor</div>
            <div class="text-sm text-neutral-100">7 minuten</div>
        </div>
        <div class="self-center">
            <NuxtLink to="dokter/[dokterid]/patients/[patientid]">
                <Line-chart />
            </NuxtLink>
        </div>
    </div>
</template>
