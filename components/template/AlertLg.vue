<script setup>
    import { ArrowUp, LineChart } from 'lucide-vue-next';
    import Heartrate from '../svg/heartrate.vue';
</script>

<template>
    <div class="grid grid-cols-[12px_60px_200px_110px_110px_80px_40px] grid-rows-1 p-2">
        <div class="bg-pink-600 w-1"></div>
        <Heartrate />
        <div>
            <div>Joshy Jonckheere</div>
            <div class="text-sm text-neutral-100">16:53</div>
        </div>
        <div>
            <div>22/05/2003</div>
            <div class="text-sm text-neutral-100">20 jaar</div>
        </div>
        <div class="flex flex-col justify-center items-center">
            <div>Hartslag</div>
            <div class="flex items-center">
                <ArrowUp />
                <div class="text-base font-semibold">120 bpm</div>
            </div>
        </div>
        <div>
            <div>actief voor</div>
            <div class="text-sm text-neutral-100">7 minuten</div>
        </div>
        <div>
            <Line-chart/>
        </div>
    </div>
</template>
