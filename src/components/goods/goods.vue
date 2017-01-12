<template>
	<div class="goods">
		<div class="menu-wrapper" id="wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" id="wrapper2">
			<ul class="wrapperUl">
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="tittle">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" alt="">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import IScroll from 'iscroll';
import $ from 'jquery';
// import shopcart from 'components/shopcart/shopcart';

const ERR_OK = 0;

export default{
	props:{
		type:Object
	},
	data(){
		return{
			goods:[],
			listheight:[],
			scrollY:0,
			liHeight:[],
			scrollTops:'',
			theKey:0
		}
	},
	mounted(){
		this.classMap = ['decrease','discount','special','invoice','gurantee'];

		this.$http.get('/api/goods').then((response) => {
			response = response.body;
			if(response.erron === ERR_OK){
				this.goods = response.data;
				this.$nextTick(() => {
					// this.currnetIndex();
					this.initScroll();
					this.leftFun();
				});

			}
		});
	},
	methods:{
		initScroll(){
			let myScroll1 = new IScroll('#wrapper');
			let myScroll2 = new IScroll('#wrapper2',{
				probeType: 3
			});
			let _that = this;
			myScroll2.on('scroll',function(pos){
				console.log(Math.round(pos.y));
				 _that.currnetIndex();
			});

		},
		currnetIndex(){
			let _thisl = this;
			for(let i=0;i<$('#wrapper2 .food-list').length;i++){
				this.liHeight.push($('#wrapper2 .food-list').eq(i).height());
			};
			//console.log(this.liHeight);
			this.scrollY = Math.abs($('#wrapper2 .wrapperUl').css('transform').replace(/[^0-9\-,]/g,'').split(',')[5]);
			//console.log(_this.scrollTops);
			let height1 = 0;
			let height2 = 0;
			for(let i=0;i<this.liHeight.length;i++){
				height1 += this.liHeight[i];
				height2 += this.liHeight[i+1];
				if(this.scrollY<height1&&this.scrollY>=height2){
					//console.log(i);
					_thisl.theKey = i;
					return i;
				}
			}
			return 0;

		},
		leftFun(){
			let thisI = this.theKey;
			$('#wrapper li').eq(thisI).css('background','#ccc');
		}
	},
	components:{
		// shopcart
	}
}
</script>
<style>
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
	}
	.menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.menu-item{
		display: table;
		height: 54px;
		width: 56px;
		line-height: 54px;
		padding: 0 12px;
	}
	.menu-item .icon{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height: 12px;
		margin-right: 2px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.menu-item .icon.decrease{
		background-image: url(decrease_3@2x.png);
	}
	.menu-item .icon.discount{
		background-image: url(discount_3@2x.png);
	}
	.menu-item .icon.special{
		background-image: url(special_3@2x.png);
	}
	.menu-item .icon.invoice{
		background-image: url(invoice_3@2x.png);
	}
	.menu-item .icon.gurantee{
		background-image: url(guarantee_3@2x.png);
	}
	.menu-item .text{
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.foods-wrapper{
		flex: 1;
	}
	.foods-wrapper .tittle{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147,153,159);
		background: #f3f5f7;
	}
	.foods-wrapper .food-item{
		display: flex;
		margin: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding-bottom: 18px;
	}
	.foods-wrapper .food-item:last-child{
		border-bottom: none;
		margin-bottom: 0;
	}
	.food-item .icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.food-item .content{
		flex: 1;
	}
	.food-item .content .name{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.food-item .content .desc{
		margin-bottom: 8px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.food-item .content .extra{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.food-item .content .extra .count{
		margin-right: 12px;
	}
	.food-item .content .price{
		font-weight: 700;
		line-height: 24px;
	}
	.food-item .content .price .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.food-item .content .price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.menu-item.currnet{
		position: relative;
		margin-top: -1px;
		z-index: 10;
		background: #fff;
		font-weight: 700;
	}
	.menu-item.currnet .text{
		border: none;

	}

</style>
