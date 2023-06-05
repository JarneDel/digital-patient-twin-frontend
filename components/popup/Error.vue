<script setup lang="ts">

    defineProps({
        isOpen: {
            type: Boolean,
            required: false,
            default: false,
        },
    })

defineEmits(['update:isOpen', 'closeModal'])

</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="$emit('closeModal')" class="relative z-10">
            <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
            >
            <div class="fixed inset-0 bg-black bg-opacity-25"></div>
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
            <div
                class="flex min-h-full items-center justify-center p-4 text-center"
            >
                <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
                >
                <DialogPanel
                    class="shadow-xl w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all"
                >
                    <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                    >
                    Oops!
                    </DialogTitle>
                    <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        Er is iets misgelopen... Probeer opnieuw.
                    </p>
                    </div>

                    <div class="mt-4">
                    <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-tertiary-100/30 px-4 py-2 text-sm font-medium text-tertiary-600 ring-2 ring-tertiary-300 hover:bg-tertiary-200/40 focus:outline-none focus-visible:ring-tertiary-500"
                        @click="$emit('closeModal')"
                    >
                        Ok
                    </button>
                    </div>
                </DialogPanel>
                </TransitionChild>
            </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <!-- <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
            >
            <div class="fixed inset-0 bg-black bg-opacity-25"></div>
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
            <div
                class="flex min-h-full items-center justify-center p-4 text-center"
            >
                <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
                >
                <DialogPanel
                    class="shadow-xl w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all"
                >
                    <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                    >
                    Oops!
                    </DialogTitle>
                    <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        Er is iets misgelopen... Probeer opnieuw.
                    </p>
                    </div>

                    <div class="mt-4">
                    <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-tertiary-100/30 px-4 py-2 text-sm font-medium text-tertiary-600 ring-2 ring-tertiary-300 hover:bg-tertiary-200/40 focus:outline-none focus-visible:ring-tertiary-500"
                        @click="closeModal"
                    >
                        Ok
                    </button>
                    </div>
                </DialogPanel>
                </TransitionChild>
            </div>
            </div>
        </Dialog>
    </TransitionRoot> -->
</template>