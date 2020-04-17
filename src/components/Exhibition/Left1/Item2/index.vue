<template>
  <div id="bg-img">
    <ve-ring
      height="9rem"
      :data="chartData"
      :legend-visible="false"
      :judge-width="true"
      :extend="chartExtend"
    ></ve-ring>
  </div>
</template>

<script>
export default {
  data() {
    this.chartExtend = {
      legend: { show: false }, //隐藏legend
      series: {
        center: ["50%", "50%"],
        radius: ["80%", "50%"]
      }
    };
    this.grid = {
      top: "1%",
      left: "30px",
      right: "1%",
      // borderWidth: 0,
      show: "true"
    };
    this.settings = {
      label: {
        normal: {
          position: "outside"
        }
      },
      labelLine: {
        normal: {
          length: 0,
          length2: 0
        }
      }
    };

    return {
      chartData: {
        columns: ["title", "count"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 }
        ]
      },
      custheme: require("../../../../styles/customed.json")
    };
  },
  props: {
    ringDate: Array
  },
  watch: {
    ringDate: function(value, oldValue) {
      this.chartData.rows = value;
    }
  }
};
</script>

<style scoped>
#bg-img {
  margin: 0 auto;
  height: 6rem;
  width: 11.125rem;
  z-index: 200;
}
</style>