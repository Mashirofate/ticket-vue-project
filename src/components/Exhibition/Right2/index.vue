<template>
  <div>
    <div class="bg-img">
      <ve-line
        :legend-visible="false"
        class="char1"
        :theme="custheme"
        :data="chartData"
        style="width:100%"
        width="1860px"
        height="260px"
        :grid="grid"
        :extend="extend"
      ></ve-line>
    </div>
  </div>
</template>

<script>
import "v-charts/lib/style.css";
export default {
  data() {
    this.grid = {
      show: true,
      top: 60,
      left: 50,
      right: 50,
      borderWidth: 0
    };
    this.chartSettings = {
      xAxisType: "time"
    };
    this.dataZoom = [
      {
        type: "slider",
        start: 0,
        end: 20
      }
    ];
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    };
    return {
      websock: null,
      chartData: {
        columns: ["date", "count"],
        rows: []
      },
      dataEmpty: true,
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
      const wsuri = "ws://127.0.0.1:8080/RealTimePeopleServer/" + vaId;
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
        message: "实时人数连接成功",
        type: "success"
      });
    },
    websocketonerror() {
      this.$notify({
        title: "警告",
        message: "实时人数连接失败",
        type: "warning"
      });
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      this.chartData.rows.push(JSON.parse(e.data));
      // console.log(this.chartData.rows);
      // console.log(this.chartData.rows.length);
      if (this.chartData.rows.length >= 20) {
        this.chartData.rows.shift();
      }
    },
    websocketclose(e) {
      this.$notify({
        title: "警告",
        message: "各个入口实时人数连接已关闭",
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
  background-image: url("../../../assets/src_imgs/fr_01.png");
  height: 16.3125rem;
  width: 117.6rem;
  position: absolute;
  background-size: 117.6rem 16.3125rem;
}

.char1 {
  position: absolute;
  top: 10px;
  left: 10px;
}

.v-charts-component-loading {
  background-color: inherit !important;
}
</style>