<script setup lang="ts">
defineProps({
  isRotated:{
    type: Boolean,
    required: false,
  },
})
</script>

<template>
    <svg width="44" height="44" viewBox="0 0 44 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
    :class="{'-rotate-[30deg]': isRotated}"
    >
        <g clip-path="url(#clip0_343_4896)">
        <path d="M25.9123 25.4904L27.1116 29.1465L26.1116 30.8786L20.0494 27.3786L16.0327 34.3357L14.6667 34.7017L14.3007 33.3357L18.3173 26.3786L12.2552 22.8786L13.2552 21.1465L16.8479 20.2571L22.3812 10.6731L20.9379 9.83972L21.9379 8.10767L33.889 15.0077L32.889 16.7397L31.4456 15.9064L25.9123 25.4904ZM15.5934 22.4965L24.6001 27.6965L23.8136 25.1255L29.7136 14.9064L24.1133 11.6731L18.2133 21.8921L15.5934 22.4965Z"/>
        </g>
        <defs>
        <clipPath id="clip0_343_4896">
        <rect x="16.1436" y="0.143555" width="32" height="32" rx="16" transform="rotate(30 16.1436 0.143555)"/>
        </clipPath>
        </defs>
    </svg>
</template>