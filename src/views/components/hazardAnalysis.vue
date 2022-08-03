<template>
  <div class="container-analysis">
    <div class="bgBox">隐患分析</div>
    <dir id="mychartAnalysis"></dir>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getHiddenDangerClassify } from "@/api/screen";

export default {
  name: "hazardAnalysis",
  data() {
    return {
      myChart: {},
      pieData: [],
      pieName: [],
      textTitle: [],
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    // 发送请求，获取数据
    async getHiddenDangerClass() {
      const result = await getHiddenDangerClassify();
      return result;
    },
    getPiename(e) {
      let result = [];
      for (let i = 0; i < e.length; i++) {
        result.push(e[i]["hazard_classification"]);
      }
      return result;
    },
    getPiedata(e) {
      let result = [{}, {}, {}];
      for (let i = 0; i < e.length; i++) {
        result[i]["value"] = e[i]["number"];
        result[i]["name"] = e[i]["hazard_classification"];
      }
      return result;
    },
    async initEcharts() {
      try {
        this.textTitle = await this.getHiddenDangerClass();
        this.pieData = this.getPiedata(this.textTitle.result);
        this.pieName = this.getPiename(this.textTitle.result);
      } catch (error) {
        alert(error);
      }
      // 饼图
      const option = {
        tooltip: {
          //提示框组件。
          trigger: "item", //trigger触发方式
        },
        legend: {
          // 图例
          data: this.pieName,
          // 图例列表的布局朝向
          orient: "horizontal",
          // 图例列表距离顶部的距离
          top: "90%",
          //图例字体样式
          textStyle: {
            color: "#fff",
            fontSize: "16",
          },
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: `${this.textTitle.message}`,
          top: "80",
          left: "center",
          textStyle: {
            fontSize: "48px",
            color: "#00ffff",
          },
        },
        series: [
          {
            type: "pie", //饼图
            label: {
              show: false,
            },
            radius: ["40%", "70%"], //饼图半径
            data: this.pieData,
          },
        ],
        color: ["#FFFF00", "#F59A23", "#D9001B"],
      };
      this.myChart = echarts.init(document.getElementById("mychartAnalysis"));
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
.container-analysis {
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
#mychartAnalysis {
  width: 480px;
  height: 259px;
  position: absolute;
  top: 40px;
  left: 17px;
  z-index: 99;
}
</style>
