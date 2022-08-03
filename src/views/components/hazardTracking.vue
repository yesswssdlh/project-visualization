<template>
  <div class="container-party">
    <div class="bgBox">隐患跟踪</div>
    <div class="all-title">
      <div class="all-title-time">上报时间</div>
      <div class="all-title-name">小区名称</div>
      <div >隐患类型</div>
    </div>
    <vue-seamless-scroll :data="listData" class="warp">
      <ul >
        <li v-for="(item, index) in listData" :key="index">
          <span class="item" v-text="item.troubleshootingTime"></span>
          <span class="item" v-text="item.hiddenDangerLocation"></span>
          <span class="item" v-text="item.hazardType"></span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
// 引入跑马灯
import vueSeamlessScroll from "vue-seamless-scroll";

import { getHiddenDanger } from '@/api/screen'
export default {
  name: "hazardTracking",
  components: {
    // 注册跑马灯组件
    vueSeamlessScroll,
  },
  data() {
    return {
      listData: [],
    };
  },
  async created(){
    const result =  await this.getHiddenDangerList();
    this.listData = result.result;
  },
  methods:{
    // 发送请求，获取数据
    async getHiddenDangerList(){
      const result = await getHiddenDanger();
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
.container-party {
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
.all-title{
  width: 480px;
  height: 30px;
  position: absolute;
  top: 60px;
  left: 26px;
  z-index: 99;
  display: flex;
  font-size: 18px;
  color: #66b5ff;
  .all-title-time{
    padding-left:37px
  }
  .all-title-name{
    padding-left: 95px;
    padding-right: 93px;
  }
}
.warp {
  width: 480px;
  height: 220px;
  position: absolute;
  top: 90px;
  left: 26px;
  z-index: 99;
  margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li,
    a {
      display: block;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: #00ffff;
    }
  }
}
.item{
  width: 151px;
  text-align: center;
}
</style>
