<template>
	<div class="bar">
		<h2>异步Ajax数据：</h2>
		<div v-for="(item,i) in [1,2,3]" :key="i">
			{{item}}
		</div>
		<div v-for="(item,i) in goods" :key="i">
			{{item.goods_name}}
		</div>
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
