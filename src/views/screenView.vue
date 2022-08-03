<template>
  <div class="container">
    <div class="bgBox">智慧雨花台社区</div>
    <!-- 天气与日期 -->
    <div class="title">
      <div>
        <img :src="src" class="title-img" />&nbsp;&nbsp;&nbsp;&nbsp;
        {{ weather.tem }}°C&nbsp;&nbsp;&nbsp;&nbsp;{{ weather.wea }}
      </div>
      <div>{{ value }}&nbsp;{{ week }}</div>
    </div>

    <!-- 所有的echarts图表 -->
    <community-help class="boxHelp"></community-help>
    <party-member class="boxParty"></party-member>
    <hazard-analysis class="boxHazard"></hazard-analysis>
    <device-information
      class="boxInformation"
      @showModal="showModal"
    ></device-information>
    <device-status class="boxStatus"></device-status>
    <hazard-tracking class="boxTracking"></hazard-tracking>

    <!-- 百度地图组件 -->
    <!-- map-type地图类型 -->
    <baidu-map
      center="江苏省南京市雨花台区普德村-132号"
      :zoom="zoom"
      class="baidumap"
      map-type="BMAP_HYBRID_MAP"
      :scroll-wheel-zoom="true"
      :map-click="false"
      :removeCopyright="none"
    >

      <!-- 烟感器 -->
      <template v-if="showSmoke">
        <bm-marker
          v-for="(item, index) in smokeData"
          :key="index"
          :position="item"
          :icon="{
            url: require('@/assets/images/smoke.png'),
            size: { width: 45, height: 70 },
            opts: { imagesSize: { width: 45, height: 70 } },
          }"
        >
        </bm-marker>
      </template>

      <!-- 温感器 -->
      <template v-if="showTemperature">
        <bm-marker
          v-for="(item, index) in temperatureData"
          :key="index"
          :position="item"
          :icon="{
            url: require('@/assets/images/temp.png'),
            size: { width: 45, height: 70 },
            opts: { imagesSize: { width: 45, height: 70 } },
          }"
        >
        </bm-marker>
      </template>

      <!-- 燃气感 -->
      <template v-if="showGas">
        <bm-marker
          v-for="(item, index) in gasData"
          :key="index"
          :position="item"
          :icon="{
            url: require('@/assets/images/gas.png'),
            size: { width: 45, height: 70 },
            opts: { imagesSize: { width: 45, height: 70 } },
          }"
        >
        </bm-marker>
      </template>

      <!-- 雨花台党支部 -->
      <bm-marker
        :position="cityData"
        :icon="{
          url: require('@/assets/images/member1.png'),
          size: { width: 45, height: 70 },
          opts: { imagesSize: { width: 45, height: 70 } },
        }"
      >
      </bm-marker>

      <bm-label
        content="雨花台社区党群服务中心"
        :position="{ lng: 118.78068605163478, lat: 32.0099984429217 }"
        :labelStyle="{
          color: 'red',
          fontSize: '18px',
          backgroundColor: 'transparent',
          border: 'none',
          fontWeight: '700',
        }"
      />
    </baidu-map>
  </div>
</template>

<script>
import communityHelp from "@/views/components/communityHelp.vue";
import partyMember from "@/views/components/partyMember.vue";
import hazardAnalysis from "@/views/components/hazardAnalysis.vue";
import deviceInformation from "@/views/components/deviceInformation.vue";
import deviceStatus from "@/views/components/deviceStatus.vue";
import hazardTracking from "@/views/components/hazardTracking.vue";

import moment from "moment";

import {
  getWeather,
  getEquipmentLocation,
  getPartyMemberNum,
} from "@/api/screen";

export default {
  name: "screenView",
  components: {
    // 社区帮扶
    communityHelp,
    // “60”党员
    partyMember,
    // 隐患分析
    hazardAnalysis,
    // 设备信息
    deviceInformation,
    // 设备状态
    deviceStatus,
    // 隐患跟踪
    hazardTracking,
  },
  data() {
    return {
      src: "",
      // 地图层级
      zoom: 19,
      value: "",
      none:'none',
      weather: "",
      week: "",
      intervalId: null,
      smokeData: "",
      temperatureData: "",
      gasData: "",
      cityData: "",
      showSmoke: true,
      showTemperature: false,
      showGas: false,
    };
  },
  async created() {
    // 获取天气信息
    this.weather = await this.getWeatherData();
    // 获取周几
    this.week = this.weather.week;
    // 获取天气信息前面的图片信息
    this.getSrc(this.weather);
    // 打开定时器
    this.dataRefreh();
    // 获取设备位置
    this.refactor(await this.getEquipmentLocationData());
    // 获取党组织位置
    // console.log(await this.getPartyMemberNumData());
    this.updateOrganize(await this.getPartyMemberNumData());
  },
  methods: {
    getSrc(e) {
      if (e.wea === "多云") {
        this.src = require("@/assets/images/cloudy.png");
      } else {
        this.src = require("@/assets/images/sun.png");
      }
    },
    getValue() {
      this.value = moment().format(`YYYY/M/D HH:mm`);
    },
    // 获取天气信息
    async getWeatherData() {
      const result = await getWeather();
      return result;
    },
    // 获取设备位置
    async getEquipmentLocationData() {
      const result = await getEquipmentLocation();
      return result.result;
    },
    // 获取党组织位置
    async getPartyMemberNumData() {
      const result = await getPartyMemberNum();
      return result.result;
    },
    // 重构设备位置数据
    refactor(e) {
      // 烟感器
      let smoke = [];
      // 温感器
      let temperature = [];
      // 燃感器
      let gas = [];
      e.forEach((item) => {
        if (item.productsubtypename === "感温火灾探测器") {
          smoke.push(item.latitudeLongitude);
        } else if (item.productsubtypename === "感烟火灾探测器") {
          temperature.push(item.latitudeLongitude);
        } else if (item.productsubtypename === "可燃气体探测器") {
          gas.push(item.latitudeLongitude);
        }
      });
      let smokeData = [{}, {}, {}, {}, {}];
      for (let i = 0; i < smoke.length; i++) {
        smokeData[i]["lng"] = smoke[i].split(",")[0];
        smokeData[i]["lat"] = smoke[i].split(",")[1];
      }
      this.smokeData = smokeData;

      let temperatureData = [{}, {}, {}, {}, {}];
      for (let i = 0; i < temperature.length; i++) {
        temperatureData[i]["lng"] = temperature[i].split(",")[0];
        temperatureData[i]["lat"] = temperature[i].split(",")[1];
      }
      this.temperatureData = temperatureData;

      let gasData = [{}, {}, {}, {}, {}];
      for (let i = 0; i < gas.length; i++) {
        gasData[i]["lng"] = gas[i].split(",")[0];
        gasData[i]["lat"] = gas[i].split(",")[1];
      }
      this.gasData = gasData;
    },
    // 重构党支部位置数据
    updateOrganize(e) {
      let result = {};
      result["lng"] = e[1]["latitude_longitude"].split(",")[0];
      result["lat"] = e[1]["latitude_longitude"].split(",")[1];
      this.cityData = Object.assign({}, result);
    },
    // 用于控制展示那个设备
    showModal(e) {
      if (e === "smoke") {
        this.showSmoke = true;
        this.showTemperature = false;
        this.showGas = false;
      } else if (e === "temperature") {
        this.showSmoke = false;
        this.showTemperature = true;
        this.showGas = false;
      } else if (e === "gas") {
        this.showSmoke = false;
        this.showTemperature = false;
        this.showGas = true;
      }
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.getValue(); //加载数据函数
      }, 1000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear();
  },
};
</script>

<style scoped lang="scss">
// 最外层容器
.container {
  position: relative;
}
// 智慧雨花社区样式
.bgBox {
  width: 1920px;
  height: 87px;
  position: absolute;
  text-align: center;
  line-height: 87px;
  z-index: 99;
  background-image: url("@/assets/images/main-title.png");
  background-size: 100% 100%;
  font-size: 50px;
  font-weight: 700;
  font-family: "HYXiaoBoZheZhiTiJ";
  color: #fff;
}
// 天气和时间
.title {
  width: 1890px;
  height: 30px;
  position: absolute;
  top: 43px;
  left: 10px;
  z-index: 99;
  font-size: 22px;
  font-family: "HYXiaoBoZheZhiTiJ";
  color: #fff;
  display: flex;
  justify-content: space-between;
  .title-img {
    width: 28px;
    height: 29px;
    // background-color: pink;
  }
}
//  社区帮扶
.boxHelp {
  width: 506px;
  height: 309px;
  position: absolute;
  top: 87px;
  left: 10px;
  z-index: 99;
}
// “60”党员
.boxParty {
  width: 506px;
  height: 321px;
  position: absolute;
  top: 408px;
  left: 10px;
  z-index: 99;
}
// 隐患分析
.boxHazard {
  width: 506px;
  height: 330px;
  position: absolute;
  top: 741px;
  left: 10px;
  z-index: 99;
}
// 设备信息
.boxInformation {
  width: 506px;
  height: 309px;
  position: absolute;
  top: 87px;
  left: 1404px;
  z-index: 99;
}
// 设备状态
.boxStatus {
  width: 506px;
  height: 321px;
  position: absolute;
  top: 408px;
  left: 1404px;
  z-index: 99;
}
// 隐患跟踪
.boxTracking {
  width: 506px;
  height: 330px;
  position: absolute;
  top: 741px;
  left: 1404px;
  z-index: 99;
}

//地图容器
.baidumap {
  width: 1920px;
  height: 1080px;
  position: absolute;
  z-index: 1;
}
</style>
