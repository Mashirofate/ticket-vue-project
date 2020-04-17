<template>
  <div id="exhibition" class="bg-img">
    <div class="item1">
      <Left1 :activity="activity" class="mt-7"></Left1>
    </div>
    <div class="item2">
      <center1 :activity="activity"></center1>
    </div>
    <div class="item3">
      <center2></center2>
    </div>
    <div class="item4">
      <right1 :vaId="activity.aId"></right1>
    </div>
    <!-- <div class="item5">
      <left2></left2>
    </div>-->
    <div class="item6">
      <right2 :vaId="activity.aId" class="mt-3"></right2>
    </div>
  </div>
</template>

<script>
import Center1 from "@/components/Exhibition/Center1/index";
import Center2 from "@/components/Exhibition/Center2/index";
import Left1 from "@/components/Exhibition/Left1/index";
// import Left2 from "@/components/Exhibition/Left2/index";
import Right1 from "@/components/Exhibition/Right1/index";
import Right2 from "@/components/Exhibition/Right2/index";

import { getVaByVaId } from "@/api/va";

export default {
  components: {
    Center1,
    Center2,
    Left1,
    // Left2,
    Right1,
    Right2
  },
  data() {
    return {
      activity: {}
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      let vaId = this.$route.params.id;
      getVaByVaId(vaId).then(res => {
        let { data } = res;
        this.activity = data;
      });
    }
  }
};
</script>

<style>
body {
  margin: initial !important;
}

.bg-img {
  background-image: url("../../assets/src_imgs/background/1.png");
  width: 120rem;
  height: 67.5rem;
}

.item1 {
  position: absolute;
  left: 10px;
}

.item2 {
  position: absolute;
  left: 680px;
}

.item3 {
  position: absolute;
  left: 420px;
  top: 110px;
}

.item4 {
  position: absolute;
  left: 1600px;
  top: 30px;
}

/* .item5 {
  position: absolute;
  left: 10px;
  top: 770px;
} */

.item6 {
  position: absolute;
  left: 10px;
  top: 755px;
}
</style>>
