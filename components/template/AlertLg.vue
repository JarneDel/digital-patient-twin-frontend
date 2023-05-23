<script setup lang="ts">
    import { ArrowUp, LineChart } from 'lucide-vue-next';
    import Heartrate from '../svg/heartrate.vue';
    import bloodpressure from '../svg/bloodpressure.vue'
    import temperature from '../svg/temperature.vue'
    import oxygen from '../svg/oxygen.vue'

    defineProps({
        type: {
            type: Object as PropType<
            'bloodpressures' | 'temperature' | 'oxygen' | 'heartrate'
            >,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        datetime: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
    })

</script>

<template>
    <div class="grid grid-cols-[12px_120px_250px_150px_150px_150px_48px] shadow-normal grid-rows-1 p-2 w-[900px] bg-white rounded-lg my-3">
        <div class="w-[3px]" :class="{
            'bg-primary-375': level === 'danger',
            'bg-other-200': level === 'warning',
        }"
        >
        </div>
        <bloodpressure 
            v-if="type === 'bloodpressures'"
            class="w-12 h-12 p-2 rounded-lg self-center"
            :class="{
                'fill-primary-325 bg-primary-250': level === 'danger',
                'fill-other-200 bg-other-50': level === 'warning',
            }"
        />
        <temperature
            v-else-if="type === 'temperature'"
            class="w-12 h-12 p-2 rounded-lg self-center"
            :class="{
                'bg-primary-250 text-primary-325': level === 'danger',
                'bg-other-50 text-tertiary-200': level === 'warning',
            }"
        />
        <oxygen
            v-else-if="type === 'oxygen'"
            class="w-12 h-12 p-2 rounded-lg self-center"
            :class="{
                'text-primary-325 bg-primary-250': level === 'danger',
                'text-other-200 bg-other-50': level === 'warning',
            }"
        />
        <Heartrate
            v-else-if="type === 'heartrate'"
            class="w-12 h-12 p-2 rounded-lg self-center"
            :class="{
                'fill-primary-325 bg-primary-250': level === 'warning',
                'fill-other-200 bg-other-50': level === 'danger',
                // 'fill-primary-325 bg-primary-250': level === 'danger',
                // 'fill-other-200 bg-other-50': level === 'warning',
            }"
        />
        <!-- <Heartrate class="fill-primary-325 bg-primary-250 w-12 h-12 p-2 rounded-lg self-center" /> -->
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
