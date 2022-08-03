<template>
  <div class="container-help">
    <div class="bgBox">设备信息</div>
    <div class="bgBox-box">
      <img
        src="@/assets/images/device-3.png"
        class="bgBox-img"
        @click="showModal('smoke')"
      />
      <img
        src="@/assets/images/device-2.png"
        class="bgBox-img"
        @click="showModal('temperature')"
      />
      <img
        src="@/assets/images/device-1.png"
        class="bgBox-img"
        @click="showModal('gas')"
      />
    </div>
    <div class="bgBox-number">
      <div>{{ inforData[0] }}个</div>
      <div>{{ inforData[1] }}个</div>
      <div>{{ inforData[2] }}个</div>
    </div>
    <div class="bgBox-font">
      <div>烟感器</div>
      <div>温感器</div>
      <div>燃感器</div>
    </div>
  </div>
</template>

<script>
import { getEquipment } from "@/api/screen";

export default {
  name: "deviceInformation",
  data() {
    return {
      inforData: "",
    };
  },
  methods: {
    // 发送请求，获取数据
    async getEquipmentData() {
      const result = await getEquipment();
      return result;
    },
    getInforData(e) {
      let result = [];
      for (let i = 0; i < 3; i++) {
        result.push(e[i].number);
      }
      return result;
    },
    showModal(e) {
      // console.log(e);
      this.$emit("showModal", e);
    },
  },
  async created() {
    const result = await this.getEquipmentData();
    this.inforData = this.getInforData(result.result);
  },
};
</script>

<style scoped lang="scss">
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
  width: 516px;
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
.bgBox-box {
  width: 506px;
  height: 224px;
  position: absolute;
  top: 70px;
  left: 0px;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  .bgBox-img {
    width: 128px;
    height: 188px;
    cursor: pointer;
  }
}
.bgBox-number {
  width: 506px;
  height: 95px;
  color: #fff;
  font-size: 48px;
  font-family: "SimHei";
  font-weight: 700;
  position: absolute;
  top: 120px;
  left: 0px;
  z-index: 99;
  display: flex;
  justify-content: space-around;
}
.bgBox-font {
  width: 506px;
  height: 95px;
  color: #fff;
  font-size: 26px;
  font-family: "SimHei";
  font-weight: 700;
  position: absolute;
  top: 210px;
  left: 0px;
  z-index: 99;
  display: flex;
  justify-content: space-around;
}
</style>
