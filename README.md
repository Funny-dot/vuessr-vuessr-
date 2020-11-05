# vuessr-vuessr-

# 运行
    npm install
    npm run dev
    npm run build
# 重要代码路径
    修改 /src/store/index.js 获取数据代码
# vue中调用 store/index.js 
    <template>
           <div class="bar">
               <h2>异步Ajax数据：</h2>
               <span>{{ goods }}</span>
           </div>
       </template>
       
       <script>
           const fetchInitialData = ({ store }) => {
               store.dispatch('fetchBar');
           };
           export default {
               asyncData: fetchInitialData,
               data() {
                   return {
                       dd: ''
                   }
               },
               mounted() {
                   // 因为服务端渲染只有 beforeCreate 和 created 两个生命周期，不会走这里
                   // 所以把调用 Ajax 初始化数据也写在这里，是为了供单独浏览器渲染使用
                   let store = this.$store;
                   fetchInitialData({ store });
               },
               // 计算属性
               computed: {
                   goods(){
                       return this.$store.state.bar;
                   }
               },
               created(e){
       
               }
           }
       </script>
       
       <style>
       </style>