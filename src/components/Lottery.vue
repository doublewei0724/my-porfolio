<template>
  <!-- <button
    @click="$router.push('/')"
    class="text-white bg-gray-700 px-2 py-1 rounded m-1"
  >
    返回主页
  </button> -->
  <!-- header -->
  <div class="header flex justify-between items-center p-2 relative"
    :style="`background: url(${baseUrl}images/header_bg.png); background-size: auto 100%`">
    <div class="flex items-center gap-2">
      <img :src="baseUrl + '/images/logo_title.svg'" alt="Logo" class="h-10" />
    </div>
    <div class="flex items-center">
      <div class="flex gap-1 bg-[#eacb83;] text-[#947c52] p-1 rounded-xl">
        <button :class="currentGameId === 1 ? 'active' : ''" @click="switchGame(1)" class="p-1 text-xs">
          动物运动会1
        </button>
        <button :class="currentGameId === 3 ? 'active' : ''" @click="switchGame(3)" class="p-1 text-xs">
          动物运动会3
        </button>
      </div>
      <van-icon name="wap-nav" size="2rem" color="#5f5d5d" @click="showDropdown = !showDropdown"
        class="cursor-pointer ml-1" />
    </div>
  </div>

  <van-popup v-model:show="showDropdown" position="top">
    <van-cell title="比赛规则" @click="openDialog('rules')" />
    <van-cell title="开放API" @click="openDialog('api')" />
  </van-popup>

  <van-dialog v-model:show="showDialog" :title="dialogTitle" class="custom-dialog">
    <PopupContent :contentType="dialogContent" :gameId="currentGameId" />
  </van-dialog>

  <div>
    <div class="bg-[#f7e1ac] flex flex-col px-2">
      <div
        class="w-56 m-auto px-10 py-2 shadow-lg flex justify-center items-center rounded-b-[30px] bg-gradient-to-t from-[#fdf4e1] to-[#f7e1ac]"
        style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3)">
        <img :src="baseUrl + '/images/logo.svg'" alt="" class="w-6 h-6 mr-1" />
        <span class="text-[#61350b] text-lg">彩票频道主办</span>
      </div>
      <div class="flex items-center text-[#61350b] font-black">
        <img :src="baseUrl + '/images/gold_medal.svg'" alt="" class="w-8 h-8 mr-1" />
        <span class="text-base">参赛选手</span>
      </div>
    </div>
    <div class="bg-gradient-to-t from-[#fdf4e1] to-[#f7e1ac] p-2 grid grid-cols-3 gap-2">
      <div v-for="animal in animals" :key="animal.id"
        class="relative flex items-end border-[3px] border-white shadow-md pl-0.5 pt-5 rounded-lg bg-opacity-0">
        <img :src="animal.animalImage" :alt="animal.name" class="w-14 h-14" />
        <div class="text-left text-[#61350b] mb-1">
          <div class="font-bold text-base tracking-tighter">
            {{ animal.name }}
          </div>
          <div class="text-xs tracking-tight">{{ animal.englishName }}</div>
        </div>
        <img :src="baseUrl + '/images/medal.gif'" alt="medal" class="absolute top-0 right-0.5 w-7 h-auto" />
        <div class="absolute top-1.5 right-3 text-white text-sm font-black leading-4">
          {{ animal.id }}
        </div>
      </div>
    </div>
  </div>

  <div class="bg-[#f0d8a1] text-[#61350b] text-sm font-bold flex justify-between items-center px-4 py-2">
    <div>
      <div>{{ currentTime.date }}</div>
      <div>{{ currentTime.time }}</div>
    </div>
    <div class="flex flex-col">
      <span class="text-blue-700 font-black text-base">赛场实况({{ currentDescription.duration }})</span>
      <span>({{ currentDescription.details }})</span>
    </div>
  </div>

  <!-- iframe -->
  <div class="flex justify-center items-center">
    <div class="overflow-hidden">
      <iframe :src="iframeSrc" frameborder="0" allowfullscreen
        :style="{ width: `${iframeSize}px`, height: `${iframeSize}px` }" class="scale-105 pointer-events-none"
        @mousedown="allowInteraction"></iframe>
    </div>
  </div>

  <!-- 日期选择器 DatePicker -->
  <div class="bg-[#efd38f] relative p-2 flex items-center justify-between">
    <div class="text-xl text-[#61350b] font-black">往期数据</div>
    <div>
      <div class="border px-2 py-1 rounded cursor-pointer bg-white text-[#333333] text-sm" @click="showPicker = true">
        <van-icon name="notes-o" size="20" class="mr-2"></van-icon>
        <span>{{ formattedDate }}</span>
      </div>

      <van-popup v-model:show="showPicker" position="bottom" style="z-index: 2009">
        <van-date-picker v-model="selectedDate" :columns-type="columnsType" :min-date="minDate" :max-date="maxDate"
          @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </div>
  </div>

  <div class="animal-list bg-[#f7e1ac] p-2">
    <div class="flex items-center justify-center mt-2 mb-4">
      <div class="flex-1 border-t border-[#61350b] mx-2"></div>
      <div class="text-center text-lg font-bold text-[#61350b]">
        参赛动物队列号
      </div>
      <div class="flex-1 border-t border-[#61350b] mx-2"></div>
    </div>
    <div class="flex justify-between items-center">
      <div v-for="animal in animals" :key="animal.id" class="flex flex-col items-center">
        <img :src="animal.image" :alt="animal.name" class="w-12 h-12 mt-2" />
        <div class="flex items-center mt-1">
          <div class="w-6 h-6 rounded-full flex justify-center items-center text-white font-bold text-sm"
            :style="{ backgroundColor: animal.color }">
            {{ animal.id }}
          </div>
          <div class="text-[#61350b] text-sm">{{ animal.name }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 开奖历史表格 -->
  <table class="w-full text-left border-collapse border border-gray-300 bg-white">
    <thead>
      <tr class="bg-[#f7e1ac]">
        <th class="w-[16%]">期次</th>
        <th class="w-[12%]">时间</th>
        <th class="w-[12%]">冠军</th>
        <th class="w-[12%]">亚军</th>
        <th class="w-[12%]">季军</th>
        <th class="w-[12%]">No4</th>
        <th class="w-[12%]">No5</th>
        <th class="w-[12%]">No6</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in paginatedResults" :key="result.issue" @click="toggleRow(result.issue)"
        class="cursor-pointer">
        <td class="text-xs text-[#b0b0b0]">{{ result.issue }}</td>
        <td class="text-xs text-[#333333]">
          {{ result.issueTime }}
        </td>
        <td v-for="(value, index) in result.result.split(',')" :key="index">
          <!-- 翻转容器 -->
          <div class="flip-container" :class="{ flipped: flippedRows.includes(result.issue) }">
            <div class="flipper">
              <div class="front">
                <img :src="getImagePath(value?.trim())" alt="" class="w-8 h-8" />
              </div>
              <div class="back w-8 h-8 flex items-center justify-center text-white text-base font-bold rounded-full"
                :style="{ backgroundColor: getBackgroundColor(value?.trim()) }">
                {{ value?.trim() }}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- 分页 Pagination -->
  <div class="flex items-center justify-around bg-gradient-to-b from-[#fdf4e1] to-[#f7e1ac] py-2">
    <van-pagination v-model="currentPage" :total-items="totalResults" :show-page-size="3" force-ellipses>
      <template #prev-text>
        <van-icon name="arrow-left" />
      </template>
      <template #next-text>
        <van-icon name="arrow" />
      </template>
      <template #page="{ text }">
        {{ text }}
      </template>
    </van-pagination>

    <div class="flex items-center text-sm text-[#333]">
      <span>前往</span>
      <input type="number" v-model="inputPage" @blur="goToPage" placeholder="" min="1" :max="totalPages"
        class="w-14 p-1 mx-1 rounded-md border border-gray-300 bg-white" />
      <span>页</span>
    </div>
  </div>

  <!-- footer -->
  <footer class="py-5 px-3 bg-gradient-to-t from-[#fdf4e1] to-[#f7e1ac]">
    <div class="container mx-auto flex justify-evenly items-center">
      <div class="flex">
        <img :src="baseUrl + '/images/footer_icon_1.svg'" alt="" class="w-auto h-10" />
        <img :src="baseUrl + '/images/footer_icon_2.svg'" alt="" class="w-auto h-10" />
      </div>
      <div class="flex">
        <img :src="baseUrl + '/images/footer_icon_3.svg'" alt="" class="w-auto h-10" />
        <img :src="baseUrl + '/images/footer_icon_4.svg'" alt="" class="w-auto h-10" />
      </div>
      <div class="flex">
        <img :src="baseUrl + '/images/footer_icon_5.svg'" alt="" class="w-auto h-10" />
        <img :src="baseUrl + '/images/footer_icon_6.svg'" alt="" class="w-auto h-10" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { fetchResults } from "../services/api.js";
import PopupContent from "@/components/PopupContent.vue";
import { showToast } from "vant";

const baseUrl = import.meta.env.BASE_URL;
const results = ref([]);
const flippedRows = ref([]);
const currentGameId = ref(1);
const currentDate = ref("");
const today = new Date();
const currentTime = ref({
  date: "",
  time: "",
});
const iframeSrc = ref("https://game.bjcxe.com/?gid=1");
const iframeSize = ref(0);
const showPicker = ref(false);
const selectedDate = ref([]);
const showDropdown = ref(false);
const showDialog = ref(false);
const dialogTitle = ref("");
const dialogContent = ref("");
// 日期选择器配置
const columnsType = ["year", "month", "day"];
const minDate = new Date(2024, 0, 1);
const maxDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
const pageSize = 10;
const currentPage = ref(1);
const totalResults = computed(() => results.value.length);
const totalPages = computed(() => Math.ceil(totalResults.value / pageSize));
const inputPage = ref("");

// 动物参赛信息
const animals = ref([
  {
    id: 1,
    name: "饿小宝",
    englishName: "Exiaobao",
    color: "#d03125",
    image: baseUrl + "/images/icon_1.png",
    animalImage: baseUrl + "/images/animal_1.png",
  },
  {
    id: 2,
    name: "盒马",
    englishName: "Freshipoo",
    color: "#134e91",
    image: baseUrl + "/images/icon_2.png",
    animalImage: baseUrl + "/images/animal_2.png",
  },
  {
    id: 3,
    name: "票票",
    englishName: "Piaopiao",
    color: "#008b8b",
    image: baseUrl + "/images/icon_3.png",
    animalImage: baseUrl + "/images/animal_3.png",
  },
  {
    id: 4,
    name: "虾仔",
    englishName: "Xiazai",
    color: "#f6e58d",
    image: baseUrl + "/images/icon_4.png",
    animalImage: baseUrl + "/images/animal_4.png",
  },
  {
    id: 5,
    name: "支小宝",
    englishName: "Zhixiaobao",
    color: "#8b008b",
    image: baseUrl + "/images/icon_5.png",
    animalImage: baseUrl + "/images/animal_5.png",
  },
  {
    id: 6,
    name: "欢猩",
    englishName: "Huanxing",
    color: "#8b4513",
    image: baseUrl + "/images/icon_6.png",
    animalImage: baseUrl + "/images/animal_6.png",
  },
]);

// 彩票类型时间和信息
const descriptions = {
  1: {
    duration: "60秒/场",
    details: "35秒竞猜+20秒比赛+5秒颁奖",
  },
  3: {
    duration: "180秒/场",
    details: "155秒竞猜+20秒比赛+5秒颁奖",
  },
};

// 分页数据
const paginatedResults = computed(() => {
  const start = Math.max(0, (currentPage.value - 1) * pageSize);
  const end = Math.min(results.value.length, start + pageSize);
  return results.value.slice(start, end);
});

// 页码跳转
const goToPage = () => {
  const page = parseInt(inputPage.value, 10);
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    inputPage.value = "";
  } else if (inputPage.value) {
    showToast(`请输入 1 到 ${totalPages.value} 的有效页码`);
    inputPage.value = "";
  }
};

// 格式化选中日期为字符串
const formattedDate = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]}`;
});

// 更新当前时间
const updateCurrentTime = () => {
  const now = new Date();
  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  currentTime.value = {
    date: `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(now.getDate()).padStart(2, "0")} ${weekdays[now.getDay()]}`, // 加入星期几
    time: now.toLocaleTimeString("zh-CN", { hour12: false }),
  };
};

// 加载开奖结果数据
const loadResults = async (selectedDate) => {
  try {
    const data = await fetchResults(selectedDate, currentGameId.value);
    results.value = data.map((item) => ({
      ...item,
      issue: item.issue.slice(4),
      issueTime: new Date(item.issueTime).toTimeString().slice(0, 5),
    }));
  } catch (error) {
    console.error("加载开奖结果失败：", error);
    results.value = [];
  }
};

// 确认日期选择
const onConfirm = async (value) => {
  if (value?.selectedValues) {
    currentDate.value = value.selectedValues;
    showPicker.value = false;
    const selectedDate = currentDate.value.join(""); // 转为'YYYYMMDD'
    loadResults(selectedDate);
  } else {
    console.error("onConfirm 返回值类型错误:", value);
  }
};

// 切换彩种
const switchGame = (gameId) => {
  currentGameId.value = gameId;
  // 设置日期为当天
  currentDate.value = [
    String(today.getFullYear()),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ];
  iframeSrc.value =
    gameId === 1
      ? "https://game.bjcxe.com/?gid=1"
      : "https://game.bjcxe.com/?gid=3";

  // 加载新的开奖结果
  const selectedDate = currentDate.value.join(""); // 转为 'YYYYMMDD'
  loadResults(selectedDate);
};

// 弹窗
const openDialog = (type) => {
  dialogContent.value = type;
  dialogTitle.value = type === "rules" ? "比赛规则" : "开放API";
  showDialog.value = true;
  showDropdown.value = false;
};

// 历史号码切换图片/数字
const toggleRow = (issue) => {
  if (flippedRows.value.includes(issue)) {
    flippedRows.value = flippedRows.value.filter((id) => id !== issue);
  } else {
    flippedRows.value.push(issue);
  }
};

// 开奖数字对应颜色
const getBackgroundColor = (number) => {
  const animal = animals.value.find((a) => a.id === parseInt(number));
  return animal ? animal.color : "#ccc";
};

// 彩票类型说明信息动态更新
const currentDescription = computed(() => descriptions[currentGameId.value]);

// 获取图片路径
const getImagePath = (number) => {
  if (!number || isNaN(number)) return "";
  return `${baseUrl}images/history_${number}.png`;
};

// frame 宽度
const updateIframeSize = () => {
  iframeSize.value = Math.min(window.innerWidth, 500);
};

const allowInteraction = (event) => {
  event.target.classList.remove("pointer-events-none"); // 允许页面滚动
};

onMounted(() => {
  currentDate.value = [
    String(today.getFullYear()),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ];

  selectedDate.value = currentDate.value; // 设置 selectedDate 为当前日期
  const selectedDateStr = currentDate.value.join("");
  loadResults(selectedDateStr);

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000); // 每秒更新时间

  updateIframeSize(); // 初始化 iframe 尺寸
  window.addEventListener("resize", updateIframeSize); // 监听窗口大小变化事件
});

// 在组件销毁前，移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIframeSize);
});
</script>

<style scoped>
button.active {
  background-color: #f5dfa7;
  color: #5c584c;
  border: none;
}

thead th {
  border: 1px solid #facd68;
  padding: 0.25rem;
  text-align: center;
  font-size: 1rem;
  color: #61350b;
  font-weight: 900;
}

thead th:nth-child(odd) {
  background: #facd68;
}

tbody td {
  border: 1px solid #facd68;
  padding: 0.25rem;
  text-align: center;
}

tbody td:nth-child(odd) {
  background: #fffdf1;
}

tbody td img {
  margin: auto;
  object-fit: contain;
}

.flip-container {
  perspective: 800px;
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
}

.flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}

.flip-container.flipped .flipper {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  transform: rotateY(180deg);
}
</style>
