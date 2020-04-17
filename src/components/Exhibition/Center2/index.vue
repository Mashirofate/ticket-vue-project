<template>
  <div>
    <div class="bg-img">
      <ve-bmap
        height="570px"
        width="1080px"
        :settings="chartSettings"
        :series="chartSeries"
        :tooltip="chartTooltip"
      ></ve-bmap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      key: "oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK",
      bmap: {
        center: [120, 30],
        zoom: 14,
        roam: true,
        mapStyle: {}
      }
    };
    this.chartTooltip = { show: true };
    return {
      chartSeries: [
        {
          type: "scatter",
          coordinateSystem: "bmap",
          data: [
            [120, 30, 1] // 经度，维度，value，...
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.ve-bmap {
  border-radius: 20px;
}

.bg-img {
  background-image: url("../../../assets/src_imgs/center_02.png");
  height: 40.625rem;
  width: 72.8125rem;
  padding: 40px;
}
</style>