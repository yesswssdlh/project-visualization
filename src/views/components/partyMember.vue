<template>
  <div class="container-party">
    <div class="bgBox">"60党员"</div>
    <dir id="mychartParty"></dir>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getPartyMemberNum2 } from "@/api/screen";
export default {
  name: "partyMember",
  data() {
    return {
      yData: [], //纵坐标
      xData: [], //相对纵坐标的横坐标数据
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    // 发送请求，获取数据
    async getPartyMemberNum() {
      const result = await getPartyMemberNum2();
      return result;
    },
    getYData(e){
      let result = [];
      for(let i = 0;i < e.length;i++){
        result.push(e[i].formerBranch)
      }
      return result
    },
    getXData(e){
      let result = [];
      for(let i = 0;i < e.length;i++){
        result.push(e[i].number)
      }
      return result
    },
    async initEcharts() {
      try {
      const result = await this.getPartyMemberNum();
      this.xData = this.getXData(result.result);
      this.yData = this.getYData(result.result);
      } catch (error) {
        alert(error)
      }
      // 基本柱状图
      const option = {
        tooltip:{ //提示框组件。
          trigger:'item' //trigger触发方式
        },
        xAxis: {
          xAxis: this.xData,
          axisLabel: {
            //设置刻度值
            textStyle: {
              // 刻度下面文字颜色
              color: "#00ffff",
            },
            // 刻度下面文字大小
            fontSize: 16,
          },
          splitLine: {
            // gird区域中的分割线
            show: false, //是否显示
          },
        },
        yAxis: {
          data: this.yData,
          axisLabel: {
            //设置刻度值
            textStyle: {
              // 刻度下面文字颜色
              color: "#00ffff",
              padding:[0, 0, 0, 20],
            },
            // 刻度下面文字大小
            fontSize: 16,
          },
          
        },
        // 解决柱状图坐标文字显示不完整的问题
        grid:{left:'2%',right:'10%',bottom:'2%',containLabel:true},
        series: [ //内容区域
          {
            type: "bar", //形状为柱状图
            data: this.xData,
            showBackground :true, //该属性设置为true，才可以设置柱条样式
            color:'#0284f2', //柱条颜色
            label: {
              // 图形上的文本标签
              show: true,
              position: "right", // 相对位置
              rotate: 0, // 旋转角度
              color: "#8bcaff",
              formatter:'共{c}人',
              fontSize: 16
            },
            
          },
        ],
      };
      const myChart = echarts.init(document.getElementById("mychartParty"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container-party {
  position: relative;
  width: 506px;
  height: 321px;
  background-image: url("@/assets/images/category-border.png");
  background-size: 100% 100%;
  border-radius: 8px; 
}
.bgBox {
  width: 506px;
  height: 65px;
  position: absolute;
  text-align: center;
  line-height: 65px;
  z-index: 99;
  background-image: url("@/assets/images/title-bg.png");
  background-size: 100% 100%;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  background-color: rgba(12, 52, 129, 0.4);
  border-radius: 8px; 

}
#mychartParty {
  width: 480px;
  height: 259px;
  position: absolute;
  top: 25px;
  left: 28px;
  z-index: 99;
}
</style>
