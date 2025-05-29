<template>
  <div class="p-4">
    <button
      @click="$router.push('/')"
      class="mb-4 bg-gray-600 text-white px-4 py-2 rounded"
    >
      ← 返回首页
    </button>

    <h1 class="text-2xl font-bold mb-4">🚲 YouBike 新北市站点查询</h1>

    <input
      v-model="keyword"
      type="text"
      placeholder="请输入站点名称"
      class="w-full p-2 border rounded mb-4"
    />

    <div v-if="filteredList.length === 0">⚠️ 无符合站点</div>

    <div
      v-for="item in filteredList"
      :key="item.sno"
      class="border p-3 mb-2 rounded shadow-sm bg-white"
    >
      <div class="font-bold text-[#333]">
        {{ item.sna }}（{{ item.sarea }}）
      </div>
      <div class="text-sm text-gray-500">
        可借：{{ item.sbi }}，可还：{{ item.bemp }}
      </div>
      <div class="text-xs text-gray-400">更新：{{ item.mday }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ubikeData from "@/data/ubike.json"; // ✅ 注意这行路径正确
const data = ref(ubikeData);
const keyword = ref("");

const filteredList = computed(() =>
  data.value.filter((item) =>
    item.sna.toLowerCase().includes(keyword.value.toLowerCase())
  )
);
</script>
