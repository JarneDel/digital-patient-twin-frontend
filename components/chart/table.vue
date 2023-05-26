<script setup lang="ts">

    defineProps({
        hartslag: {
            type: Object,
            required: true
        },
        bloeddruk: {
            type: Object,
            required: true
        },
        // zuurstof: {
        //     type: Number,
        //     required: true
        // },
        // temperatuur: {
        //     type: Number,
        //     required: true
        // },
        // ademhaling: {
        //     type: Number,
        //     required: true
        // },
    })

</script>

<template>
    <table hartslag="hartslag" class="table-auto">
        <thead>
            <tr>
            <th class="px-4 py-2"></th>
            <th class="px-4 py-2"></th>
            <th class="px-4 py-2"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td class="flex items-center justify-between w-[300px] bg-neutral-500 px-4 py-2">
                <div class="font-semibold">hartslag</div>
                <svg-heartrate />
            </td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[0] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[1] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[2] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[3] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[4] }}</td>
            </tr>
            <tr>
            <td class="bg-neutral-500 px-4 py-2">bloeddruk</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ bloeddruk[0] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ bloeddruk[1] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ bloeddruk[2] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ bloeddruk[3] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ bloeddruk[4] }}</td>
            </tr>
            <tr>
            <td class="bg-neutral-500 px-4 py-2">hartslag</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[0] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[1] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[2] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[3] }}</td>
            <td class="border border-white bg-neutral-600 px-4 py-2">{{ hartslag[4] }}</td>
            </tr>
        </tbody>
    </table>
</template>