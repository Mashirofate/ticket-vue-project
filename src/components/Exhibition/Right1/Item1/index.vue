<template>
  <div class="pt-1 time text-white">
    <div class="bg-img mt-2 text-center"></div>
    <h1 class="data">{{time}}</h1>

    <div class="data1">
      <h5 class="data1-1">
        <strong>{{data}}</strong>
      </h5>
    </div>

    <h3 class="week">
      <strong>{{week}}</strong>
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      time: "",
      week: ""
    };
  },
  created() {
    this.currentTime();
  },
  methods: {
    currentTime() {
      setInterval(this.getTime, 500);
    },
    getTime: function() {
      var _this = this;
    
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();

      _this.data = yy + "/" + mm + "/" + dd;
      _this.time = hh + ":" + mf + ":" + ss;

      var week;
      if (new Date().getDay() == 0) week = "星期日";
      if (new Date().getDay() == 1) week = "星期一";
      if (new Date().getDay() == 2) week = "星期二";
      if (new Date().getDay() == 3) week = "星期三";
      if (new Date().getDay() == 4) week = "星期四";
      if (new Date().getDay() == 5) week = "星期五";
      if (new Date().getDay() == 6) week = "星期六";

      _this.week = week;
    }
  }
};
</script>

<style scoped>
.data {
  position: absolute;
  top: 90px;
  left: 80px;
  z-index: 10;
  width: 100px;
}

.data1 {
  background-image: url("../../../../assets/src_imgs/date_02.png");
  height: 1.625rem;
  width: 8rem;

  position: absolute;
  top: 165px;
  left: 80px;
  z-index: 10;
}

.data1-1 {
  height: 1.625rem;
  width: 8rem;
  position: absolute;
  top: -17px;
  left: 30px;
  z-index: 10;
}

.time {
  position: absolute;
}

.week {
  position: absolute;
  top: 210px;
  left: 120px;
  z-index: 10;
  width: 100px;
}

.bg-img {
  background-image: url("../../../../assets/src_imgs/date_01.png");
  height: 16.25rem;
  width: 16.25rem;
  position: absolute;
  left: 0.9375rem;
  z-index: 1;
}
</style>