<template>
  <div>
    <div v-if="contentType === 'rules'">
      <div class="p-4 text-[#333]">
        <p class="text-center text-[#4caf50] text-xl pb-2">
          动物运动会{{ gameId === 1 ? "(60秒)" : "(180秒)" }}
        </p>
        <div class="bg-[#ffeb3b] px-2 py-3 relative text-left rounded-md">
          <p class="text-sm leading-relaxed">
            温馨提示<br />
            您的信任对我们非常重要！我们依据最新的监管要求制定了
            《互动竞猜彩分专用户服务协议》、《法律声明及隐私权政策》，提醒您阅读。如您不同意上述协议的内容，或无法准确理解上述协议任何条款的含义，请不要进行后续操作。
          </p>
        </div>
        <div class="shadow-md bg-[#f9f9f9] mt-4 p-2">
          <p class="text-lg text-left">1.游戏动物介绍</p>
          <p class="text-sm text-gray-700 mb-4 text-left">
            支付宝动物运动会是线上模拟百米冲刺的比赛，参与比赛的动物包括：
          </p>
          <ul class="space-y-2 flex items-start flex-col pl-2">
            <li class="player-item">
              <span class="player-number bg-red-500">1</span>
              <span class="player-name">号选手 ➤ 傻小宝</span>
              <img :src="baseUrl + 'images/animal_1.png'" class="player-images" />
            </li>
            <li class="player-item">
              <span class="player-number bg-blue-500">2</span>
              <span class="player-name">号选手 ➤ 鲸 马</span>
              <img :src="baseUrl + 'images/animal_2.png'" class="player-images" />
            </li>
            <li class="player-item">
              <span class="player-number bg-green-500">3</span>
              <span class="player-name">号选手 ➤ 票 票</span>
              <img :src="baseUrl + 'images/animal_3.png'" class="player-images" />
            </li>
            <li class="player-item">
              <span class="player-number bg-yellow-500">4</span>
              <span class="player-name">号选手 ➤ 虾 仔</span>
              <img :src="baseUrl + 'images/animal_4.png'" class="player-images" />
            </li>
            <li class="player-item">
              <span class="player-number bg-purple-500">5</span>
              <span class="player-name">号选手 ➤ 支小宝</span>
              <img :src="baseUrl + 'images/animal_5.png'" class="player-images" />
            </li>
            <li class="player-item">
              <span class="player-number bg-orange-500">6</span>
              <span class="player-name">号选手 ➤ 欢 猴</span>
              <img :src="baseUrl + 'images/animal_6.png'" class="player-images" />
            </li>
          </ul>
          <p class="text-sm text-gray-700 mt-4 text-left">
            用户可以竞猜参赛小动物的排名，猜对即可获得相应奖励。
          </p>
        </div>
        <div class="bg-[#f9f9f9] shadow-md mt-4 p-2">
          <p class="text-lg text-left">2.查看比赛介绍</p>
          <ul class="space-y-4">
            <!-- 分分 -->
            <li v-if="gameId === 1">
              <p class="text-sm text-gray-700 mb-2 text-left">
                支付宝观看比赛：在支付宝APP首页，搜索【动物运动会】即可进行观看。
              </p>
              <div class="flex">
                <img :src="baseUrl + 'images/zfb_1.png'" alt="" class="w-1/2" />
                <img :src="baseUrl + 'images/zfb_2.png'" alt="" class="w-1/2" />
              </div>
            </li>
            <!-- 三分 -->
            <li v-else>
              <p class="text-sm text-gray-700 mb-2 text-left">
                支付宝观看比赛：在支付宝APP首页 ➔ 程序 ➔【更多】 ➔【彩票】
                ➔【动物运动会】
              </p>
              <div class="flex justify-center">
                <img :src="baseUrl + 'images/zfb_4.png'" alt="" class="w-1/2" />
              </div>
            </li>
            <li>
              <div>
                <p class="text-sm text-gray-700 mb-2">支付宝扫码观看比赛</p>
                <div class="flex justify-center">
                  <img :src="baseUrl + 'images/zfb_qr.png'" alt="" class="w-1/2" />
                </div>
              </div>
              <!-- 三分 -->
              <div v-if="gameId === 3" class="mt-2">
                <p class="text-sm text-gray-700 mb-2">淘宝APP扫码观看</p>
                <div class="flex justify-center">
                  <img :src="baseUrl + 'images/tb_qr.png'" alt="" class="w-3/4" />
                </div>
              </div>
            </li>
            <li>
              <p class="text-sm text-gray-700 mb-2">跳转观看：</p>
              <div class="flex justify-evenly">
                <a
                  href="https://ur.alipay.com/_1k1PAqmtsQRGf0zdziw7eS"
                  target="_blank"
                  class="flex justify-center"
                >
                  <img :src="baseUrl + 'images/zfb.svg'" alt="" class="w-full" />
                </a>
                <!-- 三分 -->
                <a
                  v-if="gameId === 3"
                  href="https://m.tb.cn/h.TYnyiKS"
                  target="_blank"
                  class="flex justify-center"
                >
                  <img :src="baseUrl + 'images/tb.svg'" alt="" class="w-full" />
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="p-2 bg-[#f9f9f9] shadow-md mt-4">
          <p class="text-lg text-left">3.游戏活动时间</p>
          <p
            v-if="gameId === 1"
            class="text-sm text-gray-700 leading-relaxed text-left"
          >
            2022年8月9日上线，活动全天开展，在活动时间内，动物运动会每60秒一期，由35秒选择竞猜的时间
            +
            20秒比赛时间5秒颁奖时间组成，各用户可以在每一期运动会的前35秒时间段内选择竞猜的小动物，选择时间结束后即刻开始进行比赛。比赛时间为
            20秒，小动物们在20秒内进行角逐产生名次，每一期动物赛跑比赛的结果排名均由独立的算法随机产生，与动物的类型、体型等无任何关联。
          </p>
          <p v-else class="text-sm text-gray-700 leading-relaxed text-left">
            2020年1月2日上线，活动全天开展，在活动时间内，动物运动会每3分钟一期，由2分40秒选择竞猜的时间
            +
            20秒比赛时间组成，各用户可以在每一期运动会的前2分40秒时间段内选择竞猜的小动物，选择时间结束后即刻开始进行比赛。比赛时间为
            20秒，小动物们在20秒内进行角逐产生名次，每一期动物赛跑比赛的结果排名均由独立的算法随机产生，与动物的类型、体型等无任何关联。
          </p>
        </div>
        <div class="p-2 bg-[#f9f9f9] shadow-md mt-4">
          <p class="text-lg text-left">4.游戏竞猜玩法</p>
          <p class="text-sm text-gray-700 mb-2 text-left">
            用户可以选择猜冠军、亚军或季军，猜对即可获得奖励：
          </p>
          <ul class="space-y-2 pl-4 list-disc text-left text-sm">
            <li>
              <span class="font-semibold">猜冠军：</span
              >选中包含第一名的动物即可获得奖励。
            </li>
            <li>
              <span class="font-semibold">猜亚军：</span
              >选中包含第二名的动物即可获得奖励。
            </li>
            <li>
              <span class="font-semibold">猜季军：</span
              >选中包含第三名的动物即可获得奖励。
            </li>
          </ul>
        </div>
        <div class="p-2 bg-[#f9f9f9] shadow-md mt-4">
          <p class="text-lg text-left">5.游戏记录查看</p>
          <ul class="space-y-2 pl-4 list-disc text-left text-sm">
            <li>
              比赛记录：滑动到首页下方的比赛结果可在动物和队列号之间切换显示方式。
            </li>
            <li>
              比赛统计：计算标准为，最近100期内的各个小动物获得冠军次数的统计。
            </li>
            <li>
              往期数据：最近10期的结果，点击右上方“日期”，可查看更多的往期记录。
            </li>
          </ul>
        </div>
        <div class="p-2 bg-[#f9f9f9] shadow-md mt-4">
          <p class="text-lg text-left">6.游戏其他说明</p>
          <p class="text-sm text-gray-700 leading-relaxed text-left">
            如因遇到不可抗力或其他客观原因导致活动无法继续进行，本公司拥有一切游戏解释归属权，
            以首页系统所发布公告为准。活动期间，如有用户存在违规行为（包括但不限于机器作弊），
            将取消用户参与活动的获奖资格，并有权依据平台相关规则进行处理。
            本平台可根据活动举办的实际情况，在法律允许的范围内，
            对本活动规则进行变动或调整，相关变动或调整将公布在活动首页页面上。
          </p>
        </div>
      </div>
    </div>

    <div v-if="contentType === 'api'">
      <div class="bg-[#f8f9fa]">
        <p class="text-xl p-2 text-[#333]">API文档说明</p>
        <p class="text-sm text-[#999] p-2">官方永久无偿提供</p>
        <div class="w-11/12 m-auto p-2 bg-white">
          <h2 class="text-lg text-green-600 mb-4 text-left">最新比赛结果</h2>
          <div class="mb-4 text-left text-sm">
            <img :src="baseUrl + 'images/iframeImg.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_1.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_2.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_3.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_4.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_5.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_6.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_7.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_8.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_9.png'" class="w-full" />
						<img :src="baseUrl + 'images/api_10.png'" class="w-full" />
						</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const baseUrl = import.meta.env.BASE_URL;

// 接收父组件传递的属性
defineProps({
  contentType: String,
  gameId: Number,
});
</script>
