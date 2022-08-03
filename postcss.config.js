// 用于将组件中的px转换成对应的rem
module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 192, //设计稿的宽度是1920
        propList: ['*']
      }
    }
  }