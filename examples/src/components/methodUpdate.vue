<template>
	<div>
		<JSCharting :options="options" style="height:400px;"></JSCharting>
		<button v-on:click="updateData">Update Chart Data</button>
	</div>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	name: 'methodUpdate',
	data() {
		let options = {
			type: 'line spline',
			title: { label: { text: 'Series updates' } },
			legend: {
				position: 'inside top right'
			},
			xAxis: { scale: { type: 'time' } },
			defaultPoint: {
				marker: {
					outline: {
						width: 2,
						color: 'currentColor'
					},
					fill: 'white'
				}
			},
			series: [
				{
					name: 'Purchases',
					points: this.randomPoints()
				}
			]
		};
		return {
			options
		};
	},
	methods: {
		updateData() {
			this.options = {
				series: [
					{
						name: 'Purchases',
						points: this.randomPoints()
					}
				]
			};
		},
		randomPoints() {
			let points = [];
			for (let i = 1; i < 12; i++) {
				points.push({
					id: 'p' + i,
					x: `1/${i * 2}/2020`,
					y: Math.random() * 10
				});
			}
			return points;
		}
	},
	components: {
		JSCharting
	}
};
</script>
