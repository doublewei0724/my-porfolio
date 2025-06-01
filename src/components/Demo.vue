<template>
  <div class="bg-[#f5f5f5] text-black max-w-[1200px] m-auto">
    <div class="w-full text-left">
      <button
        @click="$router.push('/')"
        class="text-white text-sm bg-gray-700 px-2 py-1 rounded m-1"
      >
        返回主页
      </button>
    </div>
    <div class="text-center bg-white py-4 border-b border-gray-200">
      <h1 class="text-[35px] font-bold tracking-[10px] text-gray-800">
        模板展示
      </h1>
      <p class="text-[20px] text-gray-500 tracking-widest">产品案例</p>
    </div>

    <div class="px-1 py-4 mx-auto space-y-12">
      <div v-for="(group, gIndex) in templateGroups" :key="gIndex">
        <p class="text-blue-600 text-xl font-bold mb-1">{{ group.title }}</p>
        <p class="text-red-600 text-base mb-3">{{ group.subtitle }}</p>

        <div v-if="group.items.length">
          <swiper @swiper="onSwiperInit" :modules="[Navigation]" :slides-per-view="isMobile ? 1 : group.slidesPerView"
            :space-between="20" :navigation="{
              nextEl: `.next-btn-${gIndex}`,
              prevEl: `.prev-btn-${gIndex}`,
            }">
            <swiper-slide v-for="(item, i) in group.items" :key="i">
              <div @click="showBig(item.big, group.type)" :class="[
                group.type === 'pc' ? 'w-[300px]' : 'w-[250px]',
                'cursor-pointer mx-auto bg-white',
              ]">
                <div :style="{ height: group.type === 'h5' ? '400px' : '300px' }" class="overflow-y-auto">
                  <img :src="item.img" class="w-full object-cover" />
                </div>
                <div>
                  <img v-if="item.bottom" :src="item.bottom" class="w-full" />
                </div>
              </div>
            </swiper-slide>
            <template #container-end>
              <div :class="`swiper-button-prev prev-btn-${gIndex} left-0`"></div>
              <div :class="`swiper-button-next next-btn-${gIndex} right-0`"></div>
            </template>
          </swiper>
        </div>
      </div>
    </div>

    <footer class="bg-gray-100 text-white text-sm">
      <div class="m-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-[#333]">
        <div class="flex items-center justify-center gap-2 mb-2">
          <img :src="baseUrl + 'demo/images/logo.png'" alt="Logo" class="h-8" />
          <p class="font-bold text-base">Fun Plus Gaming</p>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-1">联系我们</h3>
          <p>Telegram:</p>
          <p>
            <a href="https://t.me/FPGgm" target="_blank" class="text-blue-600 hover:underline">@FPGgm</a>
          </p>
          <p>
            <a href="https://t.me/FPGgaming" target="_blank" class="text-blue-600 hover:underline">@FPGgaming</a>
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-1 invisible">占位標題</h3>
          <p>
            Email:
            <a href="mailto:fhbwfenghuang@gmail.com" class="text-blue-600 hover:underline">fhbwfenghuang@gmail.com</a>
          </p>
          <p>
            WhatsApp:
            <a href="https://wa.me/639296255555" target="_blank" class="text-blue-600 hover:underline">+639296255555</a>
          </p>
        </div>
        <div class="flex flex-col justify-center">
          <h3 class="font-semibold text-base mb-1">关注我们</h3>
          <p>
            官方网站:
            <a href="https://fhbw.cc/" class="text-blue-600 hover:underline">https://fhbw.cc/</a>
          </p>
        </div>
      </div>

      <p class="text-center py-4 text-xs text-gray-500 bg-[#18191b]">
        版权所有 © FunPlusGaming 2024 COPY RIGHT
      </p>
    </footer>

    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/80 flex justify-center items-center overflow-y-auto"
      @click="closeModal">
      <img :src="modalImage" :class="modalImageClass" class="object-contain my-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const baseUrl = import.meta.env.BASE_URL;
const isMobile = ref(false);
const showModal = ref(false);
const modalImage = ref("");
const modalType = ref<"h5" | "pc">("h5");
const swiperRefs = ref<any[]>([]);

onMounted(() => {
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  updateIsMobile();
});


function showBig(src: string, type: "h5" | "pc") {
  modalImage.value = src;
  modalType.value = type;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function onSwiperInit(swiper: any) {
  swiper.navigation?.destroy();
  swiper.navigation?.init();
  swiper.navigation?.update();
}

const modalImageClass = computed(() => {
  if (isMobile.value) {
    return "w-[85%] h-auto";
  }

  if (modalType.value === "h5") {
    return "w-[35%] h-auto";
  }

  if (modalType.value === "pc") {
    return "w-[50%]";
  }

  return "";
});

const templateGroups = [
  {
    title: "六合论坛模板展示区-H5",
    subtitle: "(滑动图面看更多详情、点击看大图)",
    type: "h5",
    slidesPerView: 3,
    items: [
      {
        img: baseUrl + "demo/images/h5/h5_forum_template1.png",
        big: baseUrl + "demo/images/h5/big_h5_forum_template1.png",
        bottom: baseUrl + "demo/images/h5/h5_forum_bottom_template1.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_forum_template2.png",
        big: baseUrl + "demo/images/h5/big_h5_forum_template2.png",
        bottom: baseUrl + "demo/images/h5/h5_forum_bottom_template1.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_forum_template3.png",
        big: baseUrl + "demo/images/h5/big_h5_forum_template3.png",
        bottom: baseUrl + "demo/images/h5/h5_forum_bottom_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_forum_template4.png",
        big: baseUrl + "demo/images/h5/big_h5_forum_template4.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_forum_template5.png",
        big: baseUrl + "demo/images/h5/big_h5_forum_template5.png",
        bottom: baseUrl + "demo/images/h5/h5_forum_bottom_template5.png",
      },
    ],
  },
  {
    title: "综合站模板展示区-PC",
    subtitle: "(点击右侧箭头观看更多模板、点击看大图)",
    type: "pc",
    slidesPerView: 3,
    items: [
      {
        img: baseUrl + "demo/images/pc/pc_template1.png",
        big: baseUrl + "demo/images/pc/big_pc_template1.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template2.png",
        big: baseUrl + "demo/images/pc/big_pc_template2.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template3.png",
        big: baseUrl + "demo/images/pc/big_pc_template3.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template4.png",
        big: baseUrl + "demo/images/pc/big_pc_template4.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template5.png",
        big: baseUrl + "demo/images/pc/big_pc_template5.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template6.png",
        big: baseUrl + "demo/images/pc/big_pc_template6.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template7.png",
        big: baseUrl + "demo/images/pc/big_pc_template7.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template8.png",
        big: baseUrl + "demo/images/pc/big_pc_template8.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_template9.png",
        big: baseUrl + "demo/images/pc/big_pc_template9.png",
      },
    ],
  },
  {
    title: "综合站模板展示区-H5",
    subtitle: "(滑动图面看更多详情、点击右侧箭头观看更多模板、点击看大图)",
    type: "h5",
    slidesPerView: 3,
    items: [
      {
        img: baseUrl + "demo/images/h5/h5_template1.png",
        big: baseUrl + "demo/images/h5/big_h5_template1.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template1.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template2.png",
        big: baseUrl + "demo/images/h5/big_h5_template2.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template18.png",
        big: baseUrl + "demo/images/h5/big_h5_template18.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template18.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template3.png",
        big: baseUrl + "demo/images/h5/big_h5_template3.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template4.png",
        big: baseUrl + "demo/images/h5/big_h5_template4.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template16.png",
        big: baseUrl + "demo/images/h5/big_h5_template16.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template16.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template5.png",
        big: baseUrl + "demo/images/h5/big_h5_template5.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template17.png",
        big: baseUrl + "demo/images/h5/big_h5_template17.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template17.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template7.png",
        big: baseUrl + "demo/images/h5/big_h5_template7.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template8.png",
        big: baseUrl + "demo/images/h5/big_h5_template8.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template9.png",
        big: baseUrl + "demo/images/h5/big_h5_template9.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template10.png",
        big: baseUrl + "demo/images/h5/big_h5_template10.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template11.png",
        big: baseUrl + "demo/images/h5/big_h5_template11.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template12.png",
        big: baseUrl + "demo/images/h5/big_h5_template12.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template13.png",
        big: baseUrl + "demo/images/h5/big_h5_template13.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template4.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template14.png",
        big: baseUrl + "demo/images/h5/big_h5_template14.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template15.png",
        big: baseUrl + "demo/images/h5/big_h5_template15.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_template6.png",
        big: baseUrl + "demo/images/h5/big_h5_template6.png",
        bottom: baseUrl + "demo/images/h5/h5_bottom_template2.png",
      },
    ],
  },
  {
    title: "国际模板展示区-H5",
    subtitle: "(滑动图面看更多详情、点击右侧箭头观看更多模板、点击看大图)",
    type: "h5",
    slidesPerView: 3,
    items: [
      {
        img: baseUrl + "demo/images/h5/h5_national_template1.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template1.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template1.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template2.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template2.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template3.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template3.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template4.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template4.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template4.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template5.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template5.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template4.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template6.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template6.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template7.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template7.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template5.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template2.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template2.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template8.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template8.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template9.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template9.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_national_template10.png",
        big: baseUrl + "demo/images/h5/big_h5_national_template10.png",
        bottom: baseUrl + "demo/images/h5/h5_national_bottom_template5.png",
      },
    ],
  },
  {
    title: "国际模板展示区-PC",
    subtitle: "(点击右侧箭头观看更多模板、点击看大图)",
    type: "pc",
    slidesPerView: 3,
    items: [
      {
        img: baseUrl + "demo/images/pc/pc_national_template1.png",
        big: baseUrl + "demo/images/pc/big_pc_national_template1.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_national_template2.png",
        big: baseUrl + "demo/images/pc/big_pc_national_template2.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_national_template3.png",
        big: baseUrl + "demo/images/pc/big_pc_national_template3.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_national_template4.png",
        big: baseUrl + "demo/images/pc/big_pc_national_template4.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_national_template5.png",
        big: baseUrl + "demo/images/pc/big_pc_national_template5.png",
      },
      {
        img: baseUrl + "demo/images/pc/pc_national_template6.png",
        big: baseUrl + "demo/images/pc/big_pc_national_template6.png",
      },
    ],
  },
  {
    title: "投注模板展示区-H5",
    subtitle: "(滑动图面看更多详情、点击右侧箭头观看更多模板、点击看大图)",
    type: "h5",
    slidesPerView: 3,
    items: [
      {
        img: baseUrl + "demo/images/h5/h5_bet_template1.png",
        big: baseUrl + "demo/images/h5/h5_bet_template1.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_bet_template2.png",
        big: baseUrl + "demo/images/h5/h5_bet_template2.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_bet_template3.png",
        big: baseUrl + "demo/images/h5/h5_bet_template3.png",
      },
      {
        img: baseUrl + "demo/images/h5/h5_bet_template4.png",
        big: baseUrl + "demo/images/h5/h5_bet_template4.png",
      },
    ],
  },
];
</script>

<style scoped>
.swiper-button-prev,
.swiper-button-next {
  color: #888;
  top: 50%;
  transform: translateY(-50%);
}
</style>
