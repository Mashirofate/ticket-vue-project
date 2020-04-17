<template>
  <div class="top-bg-img">
    <item1 :count="count.工作人员入场 + count.票务入场" class="item1"></item1>
    <item2 :ringDate="ringDate" class="item2"></item2>

    <item3 :vaEmployeenumber="count.工作人员入场" class="item3"></item3>
    <item4 :vaTicketnumber="count.票务入场" class="item4"></item4>

    <item5 :vaEmployeenumber="activity.aEmployeenumber" class="item5"></item5>
    <item6 :vaTicketnumber="activity.aTicketnumber" class="item6"></item6>

    <item7 :count="count.实名入场" class="item7"></item7>
    <item8 :count="count.未实名入场" class="item8"></item8>

    <item9 class="item9"></item9>

    <item10 :imgs="headsImg" class="item10"></item10>
  </div>
</template>

<script>
import Item1 from "./Item1/index";
import Item2 from "./Item2/index";
import Item3 from "./Item3/index";
import Item4 from "./Item4/index";
import Item5 from "./Item5/index";
import Item6 from "./Item6/index";
import Item7 from "./Item7/index";
import Item8 from "./Item8/index";
import Item9 from "./Item9/index";
import Item10 from "./Item10/index";
import Item11 from "./Item11/index";
export default {
  components: {
    Item1,
    Item2,
    Item3,
    Item4,
    Item5,
    Item6,
    Item7,
    Item8,
    Item9,
    Item10,
    Item11
  },
  name: "left1",
  data() {
    return {
      websock: null,
      count: {},
      headsImg: Array
    };
  },
  props: {
    activity: Object
  },
  watch: {
    activity: {
      handler: function(val, oldVal) {
        this.initWebSocket(val.aId);
      },
      deep: true
    }
  },
  computed: {
    ringDate: function() {
      let date = [
        {
          title: "入场",
          count: this.count.工作人员入场 + this.count.票务入场
        },
        {
          title: "未入场",
          count:
            this.activity.vaEmployeenumber +
            this.activity.vaTicketnumber -
            (this.count.工作人员入场 + this.count.票务入场)
        }
      ];
      return date;
    }
  },
  methods: {
    initWebSocket(vaId) {
      const wsuri = "ws://127.0.0.1:8080/RealTimeOtherServer/" + vaId;
      console.log(wsuri);
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      // let actions = { test: "12345" };
      // this.websocketsend(JSON.stringify(actions));
      this.$notify({
        title: "成功",
        message: "各个入口实时人数连接成功",
        type: "success"
      });
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      console.log(redata);
      this.count = redata.typeCount;
      this.headsImg = redata.headsImg;
    },
    websocketclose(e) {
      this.$notify({
        title: "警告",
        message: "各个入口实时人数已关闭",
        type: "warning"
      });
      //关闭
      console.log("断开连接", e);
    }
  },
  destroyed() {
    this.websock.close();
  }
};
</script>

<style lang="scss" scoped>
.top-bg-img {
  background-image: url("../../../assets/src_imgs/shape.png");
  height: 45.3125rem;
  width: 24.4375rem;
  position: absolute;
}

.item1 {
  position: absolute;
  top: 60px;
  left: 10px;
}

.item2 {
  position: absolute;
  top: 45px;
  left: 200px;
}

.item3 {
  position: absolute;
  top: 190px;
  left: 10px;
}

.item4 {
  position: absolute;
  top: 190px;
  left: 205px;
}

.item5 {
  position: absolute;
  top: 300px;
  left: 20px;
}

.item6 {
  position: absolute;
  top: 300px;
  left: 215px;
}

.item7 {
  position: absolute;
  top: 410px;
  left: 20px;
}

.item8 {
  position: absolute;
  top: 410px;
  left: 215px;
}

.item9 {
  position: absolute;
  top: 480px;
  left: 10;
}

.item10 {
  position: absolute;
  top: 560px;
  left: 10;
}
</style>