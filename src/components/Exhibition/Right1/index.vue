<template>
  <div class="bg-img">
    <item1 class></item1>
    <ve-histogram
      id="char"
      :legend-visible="false"
      :grid="grid"
      :theme="custheme"
      :data="chartData"
      width="290px"
      height="440px"
      :extend="extend"
    ></ve-histogram>
  </div>
</template>

<script>
import Item1 from "./Item1/index";
export default {
  components: {
    Item1
  },
  data() {
    this.colors = ["#0AE2A4", "#217CC6"];
    this.grid = {
      top: 30,
      left: 60,
      right: 40,
      borderWidth: 0,
      show: "true"
    };
    this.extend = {
      series: {
        label: { show: true, position: "top" }
      }
    };
    return {
      websock: null,
      chartData: {
        columns: ["入口", "数量"],
        rows: []
      },
      custheme: require("../../../styles/customed.json")
    };
  },
  props: {
    vaId: 0
  },
  watch: {
    vaId: function(value, oldValue) {
      this.initWebSocket(value);
    }
  },
  methods: {
    initWebSocket(vaId) {
      const wsuri = "ws://127.0.0.1:8080/RealTimeEntranceServer/" + vaId;
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
      this.chartData.rows = redata;
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

<style scoped>
.bg-img {
  background-image: url("../../../assets/src_imgs/shape2.png");
  height: 45.3125rem;
  width: 18.125rem;
  margin: 0 auto;
}

#char {
  position: absolute;
  top: 300px;
}
</style>