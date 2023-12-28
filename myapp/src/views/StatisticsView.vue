<template>
  <AdminLayout>
    <div class="w-full flex justify-between mt-8">
      <div
        :class="{ 'bg-gray-300': selectedChart === 'week' }"
        class="flex items-center border duration-300 py-1 px-3 rounded-md hover:bg-gray-200 hover:scale-105 active:bg-gray-300 active:scale-95"
      >
        <input
          type="radio"
          id="week"
          class="hidden"
          name="chartType"
          value="week"
          v-model="selectedChart"
        />
        <label for="week" class="font-semibold cursor-pointer">Doanh thu tuần</label>
      </div>
      <div
        :class="{ 'bg-gray-300': selectedChart === 'month' }"
        class="flex items-center border duration-300 py-1 px-3 rounded-md hover:bg-gray-200 hover:scale-105 active:bg-gray-300 active:scale-95"
      >
        <input
          type="radio"
          id="month"
          class="hidden"
          name="chartType"
          value="month"
          v-model="selectedChart"
        />
        <label for="month" class="font-semibold cursor-pointer">Doanh thu tháng</label>
      </div>
      <div
        :class="{ 'bg-gray-300': selectedChart === 'year' }"
        class="flex items-center border duration-300 py-1 px-3 rounded-md hover:bg-gray-200 hover:scale-105 active:bg-gray-300 active:scale-95"
      >
        <input
          type="radio"
          id="year"
          class="hidden"
          name="chartType"
          value="year"
          v-model="selectedChart"
        />
        <label for="year" class="font-semibold cursor-pointer">Doanh thu năm</label>
      </div>
    </div>
    <canvas ref="myChart" width="600" height="200" class="mt-8"></canvas>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import { Chart, registerables } from "chart.js";
import { useUserStore } from "../stores/userStore";
const userStore = useUserStore();

const myChart = ref(null);
const selectedChart = ref("week");
let chartInstance = null;
const today = new Date();
const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
onMounted(() => {
  Chart.register(...registerables);
  renderChart(selectedChart.value);
});

watch(selectedChart, (newValue) => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  renderChart(newValue);
});

async function renderChart(chartType) {
  const ctx = myChart.value.getContext("2d");
  let chartData;

  switch (chartType) {
    case "week":
      try {
        const weekDataArray = [];
        const today = new Date(formattedDate);
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(today);
          currentDate.setDate(today.getDate() - today.getDay() + i);
          daysOfWeek.push(currentDate.toISOString().slice(0, 10));
        }

        for (const day of daysOfWeek) {
          const dayData = await userStore.getRevenueByDay(day);
          weekDataArray.push(dayData);
        }

        chartData = createWeekChartData(weekDataArray);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
        chartData = getFallbackWeekData();
      }
      break;
    case "month":
      try {
        const monthDataArray = [];
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
          const day = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${i
            .toString()
            .padStart(2, "0")}`;
          const dayData = await userStore.getRevenueByDay(day);
          monthDataArray.push(dayData);
        }

        chartData = createMonthChartData(monthDataArray);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
        chartData = getFallbackMonthData();
      }
      break;
    case "year":
      try {
        const yearDataArray = [];
        const currentYear = new Date().getFullYear();

        for (let month = 1; month <= 12; month++) {
          const monthData = await userStore.getRevenueByMonth(currentYear, month);
          yearDataArray.push(monthData);
        }

        chartData = createYearChartData(yearDataArray);
      } catch (error) {
        console.error("Error fetching yearly data:", error);
        chartData = getFallbackYearData();
      }
      break;
    default:
      chartData = {};
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function getFallbackWeekData() {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Doanh thu tuần (Fallback Data)",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
}

function getFallbackMonthData() {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const dataForMonth = Array.from({ length: daysInMonth }, () => 0);
  return {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    datasets: [
      {
        label: "Doanh thu tháng (Fallback Data)",
        data: dataForMonth,
        backgroundColor: Array.from({ length: daysInMonth }, () => "rgba(54, 162, 235, 0.2)"),
        borderColor: Array.from({ length: daysInMonth }, () => "rgba(54, 162, 235, 1)"),
        borderWidth: 1,
      },
    ],
  };
}

function getFallbackYearData() {
  const dataForYear = Array.from({ length: 12 }, () => 0);
  return {
    labels: Array.from({ length: 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Doanh thu năm (Fallback Data)",
        data: dataForYear,
        backgroundColor: Array.from({ length: 12 }, () => "rgba(255, 206, 86, 0.2)"),
        borderColor: Array.from({ length: 12 }, () => "rgba(255, 206, 86, 1)"),
        borderWidth: 1,
      },
    ],
  };
}

function createWeekChartData(weekDataArray) {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = weekDataArray.map((item) => item.totalRevenue || 0);

  return {
    labels: labels,
    datasets: [
      {
        label: "Doanh trong tuần",
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
}

function createMonthChartData(monthDataArray) {
  const labels = monthDataArray.map((item, index) => index + 1);
  const data = monthDataArray.map((item) => item.totalRevenue);

  return {
    labels: labels,
    datasets: [
      {
        label: "Doanh trong tháng",
        data: data,
        backgroundColor: Array.from({ length: data.length }, () => "rgba(54, 162, 235, 0.2)"),
        borderColor: Array.from({ length: data.length }, () => "rgba(54, 162, 235, 1)"),
        borderWidth: 1,
      },
    ],
  };
}

function createYearChartData(yearDataArray) {
  const labels = Array.from({ length: 12 }, (_, i) => i + 1);
  const data = yearDataArray.map((monthData) => monthData.totalRevenue);

  return {
    labels: labels,
    datasets: [
      {
        label: "Doanh trong năm",
        data: data,
        backgroundColor: Array.from({ length: 12 }, () => "rgba(255, 206, 86, 0.2)"),
        borderColor: Array.from({ length: 12 }, () => "rgba(255, 206, 86, 1)"),
        borderWidth: 1,
      },
    ],
  };
}
</script>
