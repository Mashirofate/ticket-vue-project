<template>
  <div>
    <div class="bg-img">
      <ve-line
        class="char"
        :data="chartData"
        :settings="chartSettings"
        width="350px"
        height="280px"
      ></ve-line>
    </div>
  </div>
</template>

<script>

 export default {
    data: function () {
      this.chartSettings = {
        xAxisType: 'value'
      }
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    }
  }

</script>

<style scoped>
.bg-img {
  background-image: url("../../../assets/src_imgs/fr_04.png");
  height: 16.3125rem;
  width: 24.4375rem;
  background-repeat: no-repeat no-repeat;
  background-size: 24.4375rem 16.3125rem;
  position: absolute;
}

.char {
  top: 5px;
  position: absolute;
  z-index: 10;
}
</style>