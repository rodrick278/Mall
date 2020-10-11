module.exports={
  configureWebpack:{
    resolve:{
      // 配置别名
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'src/components',
        'network':'@/network',
      }
    }
  }
}