<template>
  <div class="min-h-screen p-8 text-center">
    <h1 class="text-black text-3xl font-bold mb-6">My Portfolio</h1>
    <div class="space-y-4">
      <router-link to="/lottery" class="block p-4 bg-blue-500 text-white rounded">動物彩開獎網</router-link>
      <router-link to="/chart" class="block p-4 bg-blue-500 text-white rounded">圖表</router-link>
      <a :href="base + 'pc01/index.html'" class="block p-4 bg-blue-500 text-white rounded" target="_blank">
        PC模板01
      </a>
      <a :href="base + 'pc02/index.html'" class="block p-4 bg-blue-500 text-white rounded" target="_blank">
        PC模板02
      </a>
      <a :href="base + 'demo/index.html'" class="block p-4 bg-blue-500 text-white rounded" target="_blank">
        Demo
      </a>
    </div>
  </div>
</template>

<script setup>
const base = import.meta.env.BASE_URL;
</script>
