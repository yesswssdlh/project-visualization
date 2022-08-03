<template>
  <div class="container-Status">
    <div class="bgBox">设备状态</div>
    <dir id="mychartStatus"></dir>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getEquipment } from "@/api/screen";

export default {
  name: "deviceStatus",
  data() {
    return {
      myChart: {},
      pieData: [],
      pieName: [],
      textTitle: [],
      statusData: [],
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    // 发送请求，获取数据
    async getEquipmentData() {
      const result = await getEquipment();
      return result;
    },
    getPiename(e) {
      let result = [];
      for (let i = 0; i < e.length; i++) {
        result.push(e[i]["productsubtypename"]);
      }
      return result;
    },
    getPiedata(e) {
      let result = [{}, {}, {}, {}, {}];
      for (let i = 0; i < e.length; i++) {
        result[i]["value"] = e[i]["number"];
        result[i]["name"] = e[i]["productsubtypename"];
        result[i]["status"] = e[i]["status"];
      }
      return result;
    },
    async initEcharts() {
      try {
        this.textTitle = await this.getEquipmentData();
        this.pieData = this.getPiedata(this.textTitle.result);
        this.pieName = this.getPiename(this.textTitle.result);
      } catch (error) {
        alert(error);
      }
      const option = {
        tooltip: {
          show: true,
          //提示框组件。
          trigger: "item", //trigger触发方式
          formatter: function () {
            const result = arguments[0].data;
            return (
              result.name +
              "<br/>在线" +
              result.status["在线"] +
              "个<br/>离线" +
              result.status["离线"] +
              "个"
            );
          },
        },
        legend: {
          // 图例
          data: this.pieName,
          // 图例列表的布局朝向
          orient: "horizontal",
          left: 0,
          top: 0,
          //图例字体样式
          textStyle: {
            color: "#fff",
            fontSize: "16",
          },
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: `全部设备\n\n${this.textTitle.message}`,
          top: "80",
          left: "center",
          // 字体样式
          textStyle: {
            fontSize: "19px",
            color: "#00ffff",
          },
        },
        series: [
          {
            // 饼图
            type: "pie",
            label: {
              show: true,
              formatter: "{b}", // b代表名称
              color: "#fff",
              fontSize: 16,
            },
            radius: ["40%", "60%"], //饼图半径
            data: this.pieData,
          },
        ],
      };
      this.myChart = echarts.init(document.getElementById("mychartStatus"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container-Status {
  position: relative;
  width: 506px;
  height: 321px;
  background-image: url("@/assets/images/category-border.png");
  background-size: 100% 100%;
  background-color: rgba(12, 52, 129, 0.4);
  border-radius: 8px;
}
.bgBox {
  width: 506px;
  height: 63px;
  position: absolute;
  text-align: center;
  line-height: 63px;
  z-index: 99;
  background-image: url("@/assets/images/title-bg.png");
  background-size: 100% 100%;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  border-radius: 8px;
}
#mychartStatus {
  width: 480px;
  height: 259px;
  position: absolute;
  top: 70px;
  left: 26px;
  z-index: 99;
}
</style>
