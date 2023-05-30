<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType';

    defineProps({
        timestamp: {
            type: Object,
            required: true
        },
        hartslag: {
            type: Object,
            required: true
        },
        bloeddruk: {
            type: Object,
            required: true
        },
        bloedzuurstof: {
            type: Object,
            required: true
        },
        temperatuur: {
            type: Object,
            required: true
        },
        ademFrequentie: {
            type: Object,
            required: true
        },
    })


</script>

<template>
    <div class="grid grid-cols-6 grid-rows-6 w-[850px]">
        <div class="text-end -mr-4">0:00</div>
        <div class="text-end -mr-4">{{ timestamp[1] }}</div>
        <div class="text-end -mr-4">{{ timestamp[2] }}</div>
        <div class="text-end -mr-4">{{ timestamp[3] }}</div>
        <div class="text-end -mr-4">{{ timestamp[4] }}</div>
        <div class="text-end -mr-4">{{ timestamp[5] }}</div>

        <div>zuurstof</div>
        <div class="text-center">{{bloedzuurstof[0]}}</div>
        <div class="text-center">{{bloedzuurstof[1]}}</div>
        <div class="text-center">{{bloedzuurstof[2]}}</div>
        <div class="text-center">{{bloedzuurstof[3]}}</div>
        <div class="text-center">{{bloedzuurstof[4]}}</div>
        
        <div>hartslag</div>
        <div class="text-center">{{hartslag[0]}}</div>
        <div class="text-center">{{hartslag[1]}}</div>
        <div class="text-center">{{hartslag[2]}}</div>
        <div class="text-center">{{hartslag[3]}}</div>
        <div class="text-center">{{hartslag[4]}}</div>

        <div>bloeddruk</div>
        <div class="text-center">{{bloeddruk[0]}}</div>
        <div class="text-center">{{bloeddruk[1]}}</div>
        <div class="text-center">{{bloeddruk[2]}}</div>
        <div class="text-center">{{bloeddruk[3]}}</div>
        <div class="text-center">{{bloeddruk[4]}}</div>

        <div>ademfrequentie</div>
        <div class="text-center">{{ademFrequentie[0]}}</div>
        <div class="text-center">{{ademFrequentie[1]}}</div>
        <div class="text-center">{{ademFrequentie[2]}}</div>
        <div class="text-center">{{ademFrequentie[3]}}</div>
        <div class="text-center">{{ademFrequentie[4]}}</div>

        <div>temperatuur</div>
        <div class="text-center">{{temperatuur[0]}}</div>
        <div class="text-center">{{temperatuur[1]}}</div>
        <div class="text-center">{{temperatuur[2]}}</div>
        <div class="text-center">{{temperatuur[3]}}</div>
        <div class="text-center">{{temperatuur[4]}}</div>

    </div>


    <!-- <table hartslag="hartslag" bloeddruk="bloeddruk" temperatuur="temperatuur" zuurstof="zuurstof" ademhaling="ademhaling" class="table-auto">
        <thead>
            <tr class="bg-primary-300 h-[52px] relative">
                <th class="px-4 py-2 font-semibold">8:00</th>
                <th class="px-4 py-2 font-semibold">8:20</th>
                <th class="px-4 py-2 font-semibold">8:40</th>
                <th class="px-4 py-2 font-semibold">9:00</th>
                <th class="px-4 py-2 font-semibold">9:20</th>
                <th class="px-4 py-2 font-semibold">9:40</th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">hartslag</div>
                    <div class="w-12 flex justify-center">
                        <svg-heartrate />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px] text-center">{{ hartslag[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">bloeddruk</div>
                    <div class="w-12 flex justify-center">
                        <svg-bloodpressure />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">zuurstof</div>
                    <div class="w-12 flex justify-center">
                        <svg-oxygen />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">ademhaling</div>
                    <div class="w-12 flex justify-center">
                        <svg-ademfrequentie />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">temperatuur</div>
                    <div class="w-12 flex justify-center">
                        <svg-temperature />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[4] }}</td>
            </tr>

            
        </tbody>
    </table> -->
</template>