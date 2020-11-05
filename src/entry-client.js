// entry-client.js 客户端渲染入口文件
import Vue from 'vue'
import { app, store, router } from './main'

/*Vue-SSR 根据访问的路由会调用当前路由组件中的asyncData方法由服务端调用相关接口，根据数据
生成首屏对应的html，并在返回的html中写入 window.__INITIAL_STATE__ = {服务端请求到的数据}
不需要服务端渲染的数据则在 mounted 中请求接口。*/

/*路由切换时组件的asyncData方法并不会被调用，若该组件存在服务端渲染方法asyncData，可通过下面
三种方式客户端调用，并进行客户端渲染*/

//（1）
// 全局mixin，beforeRouteEnter，切换路由时，调用asyncData方法拉取数据进行客户端渲染
// 注意beforeRouteEnter无法直接获取到当前组件this，需使用next((vm)=>{ vm即为this }) 获取

/*Vue.mixin({
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter1')
    next((vm)=>{
        const {asyncData} = vm.$options
    console.log('beforeRouteEnter1'+ asyncData)
        if (asyncData) {
            asyncData(vm.$store, vm.$route).then(next).catch(next)
        } else {
            next()
        }
    })

  }
})*/


//（2）
// 全局mixin，beforeRouteUpdate，切换路由时，调用asyncData方法拉取数据进行客户端渲染
// beforeRouteUpdate可直接获取到this对象（2.2版本以上）
/*Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate2')
    const { asyncData } = this.$options
    if (asyncData) {
        // 传入store与route
        asyncData(this.$store, this.$route).then(next).catch(next)
    } else {
        next()
    }
  }
})*/

// （3）
// 注册全局mixin，所有组件beforeMount时，如果根组件_isMounted为真（即根实例已mounte，该钩子函数是由路由跳转触发的）
// 调用asyncData方法拉取数据进行客户端渲染
Vue.mixin({
  data(){ //全局mixin一个loading
    return {
      //loading:false
    }
  },
  beforeMount () {
    const { asyncData } = this.$options;
    let data=null; //把数据在computed的名称固定为data,防止重复渲染
    try{
      data=this.data; //通过try/catch包裹取值,防止data为空报错
    }catch(e){}
    if(asyncData&&!data){ //如果拥有asyncData和data为空的时候,进行数据加载
      //触发loading加载为true,显示加载器不显示实际内容
      //this.loading=true;
      //为当前组件的dataPromise赋值为这个返回的promise，通过判断这个的运行情况来改变loading状态或者进行数据的处理 (在组件内通过this.dataPromise.then保证数据存在)
      this.dataPromise=asyncData({store,route:router.currentRoute})
      // this.dataPromise.then(()=>{
      //   //this.loading=false;
      // }).catch(e=>{
      //  // this.loading=false;
      // })
    }else if(asyncData){
      //如果存在asyncData但是已经有数据了,也就是首屏情况的话返回一个成功函数,防止组件内因为判断then来做的操作因为没有promise报错
      this.dataPromise=Promise.resolve();
    }
  }
})
// 使用 window.__INITIAL_STATE__ 中的数据替换store中的数据
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})