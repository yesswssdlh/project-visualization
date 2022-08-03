<template>
  <div class="container-help">
    <div class="bgBox">社区帮扶</div>

    <el-date-picker
      v-model="value2"
      type="month"
      placeholder="请选择日期"
      class="block"
      size="small"
      popper-class="date-style"
      value-format="yyyy-MM"
      @change="changeDate"
    >
    </el-date-picker>

    <dir id="mychartHelp"></dir>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getHelpRecord2, getHelpRecord3 } from "@/api/screen";
export default {
  name: "communityHelp",
  data() {
    return {
      helpData: "",
      myChart: {},
      xData: "", //横坐标数据
      yData: "", //对应横坐标的纵坐标数据
      value2: "",
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    // 发请求获取数据
    async getHelpRecord() {
      const result = await getHelpRecord2();
      return result;
    },
    // 获取近半年帮扶记录
    async getHelpRecordData(data) {
      const result = await getHelpRecord3(data);
      return result;
    },
    getXData(e) {
      let result = [];
      for (let k in e) {
        result.push(k);
      }
      return result;
    },
    getYData(e) {
      let result = [];
      for (let k in e) {
        result.push(e[k]);
      }
      return result;
    },
    async initEcharts() {
      try {
        const result = await this.getHelpRecord();
        this.xData = this.getXData(result.result);
        this.yData = this.getYData(result.result);
      } catch (error) {
        alert(error);
      }
      const option = {
        tooltip: {
          //提示框组件。
          trigger: "axis", //trigger触发方式
        },
        xAxis: {
          data: this.xData,
          // boundaryGap值为false的时候，折线第一个点在y轴上
          boundaryGap: false,
          axisLabel: {
            //设置刻度值
            textStyle: {
              // 刻度下面文字颜色
              color: "#00ffff",
            },
            // 刻度下面文字大小
            fontSize: 16,
          },
        },
        yAxis: {
          min: 0, // 设置y轴刻度的最小值
          max: 3, // 设置y轴刻度的最大值
          splitNumber: 3, // 设置y轴刻度间隔个数
          axisLabel: {
            //设置刻度值
            textStyle: {
              // 刻度下面文字颜色
              color: "#00ffff",
            },
            // 刻度下面文字大小
            fontSize: 16,
          },
        },
        series: [
          {
            data: this.yData,
            type: "line", // 类型设置为折线图
            // 折线图上圆点大小
            symbolSize: 8,
            itemStyle: {
              normal: {
                // 折线图圆点颜色
                color: "#ffbe00",
                areaStyle: {
                  //区域填充样式
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(247, 247, 4, 0.1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(247, 247, 4, 0.5)",
                    },
                  ]),
                },
              },
            },
          },
        ],
      };
      this.myChart = echarts.init(document.getElementById("mychartHelp"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    // 点击日期选择器，修改折线图
    async changeDate(e) {
      const result = await this.getHelpRecordData(e);
      // console.log("result",result)
      this.xData = this.getXData(result.result);
      this.yData = this.getYData(result.result);
      const option = {
        tooltip: {
          //提示框组件。
          trigger: "axis", //trigger触发方式
        },
        xAxis: {
          data: this.xData,
          // boundaryGap值为false的时候，折线第一个点在y轴上
          boundaryGap: false,
          axisLabel: {
            //设置刻度值
            textStyle: {
              // 刻度下面文字颜色
              color: "#00ffff",
            },
            // 刻度下面文字大小
            fontSize: 16,
          },
        },
        yAxis: {
          min: 0, // 设置y轴刻度的最小值
          max: 3, // 设置y轴刻度的最大值
          splitNumber: 3, // 设置y轴刻度间隔个数
          axisLabel: {
            //设置刻度值
            textStyle: {
              // 刻度下面文字颜色
              color: "#00ffff",
            },
            // 刻度下面文字大小
            fontSize: 16,
          },
        },
        series: [
          {
            data: this.yData,
            type: "line", // 类型设置为折线图
            // 折线图上圆点大小
            symbolSize: 8,
            itemStyle: {
              normal: {
                // 折线图圆点颜色
                color: "#ffbe00",
                areaStyle: {
                  //区域填充样式
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(247, 247, 4, 0.1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(247, 247, 4, 0.5)",
                    },
                  ]),
                },
              },
            },
          },
        ],
      };
      this.myChart = echarts.init(document.getElementById("mychartHelp"));
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
@import url("@/assets/style/common.scss");
.container-help {
  position: relative;
  width: 506px;
  height: 309px;
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
.block {
  width: 180px;
  position: absolute;
  top: 70px;
  left: 315px;
  z-index: 100;
}
#mychartHelp {
  width: 480px;
  height: 300px;
  position: absolute;
  top: 45px;
  left: 28px;
  z-index: 99;
}
</style>
