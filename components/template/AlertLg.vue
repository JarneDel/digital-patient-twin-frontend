<script setup>
import { ArrowUp } from 'lucide-vue-next';
</script>

<template>
    <div class="grid grid-cols-[1fr_1fr_2fr_2fr_1fr_2fr_1fr] grid-rows-1 p-2">
        <div class="bg-pink-600 w-1"></div>
        <div> Dit is een icon</div>
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
                <arrowUp />
                <div class="text-base font-semibold">120 bpm</div>
            </div>
        </div>
        <div>
            <div>actief voor</div>
            <div class="text-sm text-neutral-100">7 minuten</div>
        </div>
        <div>
            icon
        </div>
    </div>
</template>