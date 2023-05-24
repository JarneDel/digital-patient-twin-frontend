<template>
  <div class="w-64">
    <label for="">hartslag</label>

    <span class="pl-4 text-sm">0</span>
    <input
      type="range"
      min="0"
      max="100"
      name=""
      id=""
      class="slider-thumb h-2 w-full appearance-none rounded bg-tertiary-500 focus:outline-none"
      oninput="this.previousElementSibling.innerText = this.value"
    />
    <!-- <div class="-mt-2 flex w-full justify-between">
      <span class="text-sm text-gray-600">0</span>
      <span class="text-sm text-gray-600">1000</span>
    </div> -->
    <h1>test</h1>
    <Input
      class="range pr-6 accent-tertiary-500"
      type="range"
      value="0"
      min="0"
      max="1000"
      onChange="rangeSlide(this.value)"
      onmousemove="rangeSlide(this.value)"
    ></Input>
  </div>
</template>
