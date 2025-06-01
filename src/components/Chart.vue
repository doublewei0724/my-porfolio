<template>
  <div class="max-w-[1000px] m-auto">
    <div class="w-full text-left">
      <button
        @click="$router.push('/')"
        class="text-white text-sm bg-gray-700 px-2 py-1 rounded m-1"
      >
        返回主页
      </button>
    </div>
    <div class="max-w-[1000px] mx-auto px-2 space-y-12 py-4 bg-white text-black">
      <!-- 通用图表组件 -->
      <div v-for="chart in charts" :key="chart.id">
        <div class="text-center text-xl font-bold mb-3">{{ chart.title }}</div>

        <div class="text-center space-x-2 mb-3">
          <button
            v-for="type in chart.types"
            :key="type"
            @click="
              chart.active = type;
              nextTick(() => renderChart(chart));
            "
            class="px-3 py-1 rounded text-sm"
            :class="
              type === chart.active ? 'bg-blue-500 text-white' : 'bg-gray-200'
            "
          >
            {{ labelMap[type] }}
          </button>
        </div>

        <div
          :id="chart.id"
          class="w-full h-[400px] md:h-[480px] xl:h-[520px]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { reactive, nextTick, onMounted } from "vue";
const base = import.meta.env.BASE_URL;

// 显示标签
const labelMap = {
  today: "今天",
  week: "近7天",
  month: "近30天",
};

// 所有图表配置
const charts = reactive([
  {
    id: "bet-chart",
    title: "下注量分析",
    types: ["today", "week", "month"],
    active: "today",
    render: renderBetChart,
  },
  {
    id: "profit-chart",
    title: "盈亏总数据分析",
    types: ["today", "week", "month"],
    active: "today",
    render: renderProfitChart,
  },
  {
    id: "charge-chart",
    title: "充提差变化图",
    types: ["week", "month"],
    active: "week",
    render: renderChargeChart,
  },
  {
    id: "member-chart",
    title: "投注会员变化图",
    types: ["week", "month"],
    active: "week",
    render: renderMemberChart,
  },
]);

async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}

// 各图表绘制函数
function renderChart(chart) {
  const el = document.getElementById(chart.id);
  if (!el) return;
  chart.render(chart.active, el);
}

function safeInitChart(el) {
  const existing = echarts.getInstanceByDom(el);
  if (existing) existing.dispose();
  return echarts.init(el);
}

function renderBetChart(type, el) {
  fetchData(`${base}js/data.json`).then((data) => {
    const betData = data[type].bet;
    const isMobile = window.innerWidth < 768;
    const chart = safeInitChart(el);
    chart.setOption({
      backgroundColor: "#fff",
      tooltip: { trigger: "item" },
      legend: {
        orient: isMobile ? "horizontal" : "vertical",
        top: isMobile ? "bottom" : "middle",
        left: isMobile ? "center" : "75%",
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          fontSize: isMobile ? 10 : 12,
        },
      },
      series: [
        {
          type: "pie",
          radius: isMobile ? "55%" : "60%",
          center: isMobile ? ["50%", "40%"] : ["38%", "50%"],
          data: betData,
          label: {
            formatter: "{b}: {c}K ({d}%)",
            fontSize: isMobile ? 10 : 12,
          },
        },
      ],
    });
  });
}

function renderProfitChart(type, el) {
  fetchData(`${base}/js/data.json`).then((data) => {
    const profitData = data[type].profit;
    const chart = safeInitChart(el);
    chart.setOption({
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      xAxis: { type: "category", data: profitData.map((i) => i.name) },
      yAxis: { type: "value" },
      series: [
        {
          type: "bar",
          data: profitData.map((i) => i.value),
          itemStyle: {
            color: (p) => (p.value >= 0 ? "#67C23A" : "#F56C6C"),
          },
          label: {
            show: true,
            position: "top",
            formatter: (val) => `${val.value}K`,
          },
        },
      ],
    });
  });
}

function renderChargeChart(type, el) {
  fetchData(`${base}/js/summary-data.json`).then((data) => {
    const d = data.chargeWithdraw[type];
    const chart = safeInitChart(el);
    chart.setOption({
      tooltip: { trigger: "axis" },
      legend: { data: ["充值款", "提现款", "充提差"] },
      xAxis: { type: "category", data: d.date },
      yAxis: { type: "value" },
      series: [
        {
          name: "充值款",
          type: "line",
          data: d.recharge,
          smooth: true,
          itemStyle: { color: "#5470C6" },
        },
        {
          name: "提现款",
          type: "line",
          data: d.withdraw,
          smooth: true,
          itemStyle: { color: "#91CC75" },
        },
        {
          name: "充提差",
          type: "line",
          data: d.difference,
          smooth: true,
          itemStyle: { color: "red" },
          label: { show: true, formatter: (val) => `${val.value}K` },
        },
      ],
    });
  });
}

function renderMemberChart(type, el) {
  fetchData(`${base}/js/summary-data.json`).then((data) => {
    const d = data.memberGrowth[type];
    const chart = safeInitChart(el);
    chart.setOption({
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: d.date },
      yAxis: { type: "value" },
      series: [
        {
          name: "投注会员数",
          type: "line",
          data: d.members,
          itemStyle: { color: "#3B82F6" },
          label: { show: true, position: "top" },
        },
      ],
    });
  });
}

onMounted(() => {
  charts.forEach((c) => renderChart(c));
  window.addEventListener("resize", () => {
    charts.forEach((c) => {
      const chart = echarts.getInstanceByDom(document.getElementById(c.id));
      if (chart) chart.resize();
    });
  });
});
</script>

<style>

</style>
