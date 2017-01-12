<template>
	<div class="goods">
		我是rating
	</div>
</template>
<script type="text/ecmascript-6">
import $ from 'jquery';
export default{
	data(){
		return{

		}
	},
	mounted(){
		$.ajax({
			type:'POST',
			url:'http://172.16.0.77:3030/first',
			headers:{
				"Conten-Type":"http://172.16.0.77:3030/first"
			},
			success:function(data){
				console.log(data);
			}
		});
	},
	methods:{

	}
}
</script>
<style>

</style>
