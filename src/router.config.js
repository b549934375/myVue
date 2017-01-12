import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import rating from 'components/rating/rating';

export default{
	routes:[
		{path:'/goods',component:goods},
		{path:'/seller',component:seller},
		{path:'/ratings',component:rating},
		{path:'*',redirect:'/goods'}
	],
	linkActiveClass:'active'
}
