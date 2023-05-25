<script setup>

    defineProps({
        name: {
            type: String,
            required: true
        }
    })

</script>

<template>
    <div class="h-[160px] w-[360px] rounded-md bg-neutral-600 shadow-normal flex flex-col p-5 justify-center">
        <div class="font-semibold text-lg w-[318px]">Ben je zeker dat je {{ name }} niet meer zal behandelen?</div>
        <div class="flex justify-between mt-4">
            <div>
                <button class="border-solid border-2 border-tertiary-400 rounded-md px-5 py-2 text-black font-semibold active:bg-neutral-300 hover:bg-neutral-500">Ja</button>
            </div>
            <div>
                <button class="bg-primary-400 rounded-md px-5 py-2 text-white font-semibold active:bg-primary-500 hover:bg-primary-375">Nee</button>
            </div>
        </div>
    </div>
</template>