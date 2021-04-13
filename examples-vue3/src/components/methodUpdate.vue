<template>
	<div>
		<JSCharting :options="chartOptions" style="height:400px;"></JSCharting>
		<button v-on:click="updateChartOptions">Update Chart Options Data</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'methodUpdate',
	setup() {
		const randomPoints = () => {
			let points = [];
			for (let i = 1; i < 12; i++) {
				points.push({
					id: 'p' + i,
					x: `1/${i * 2}/2020`,
					y: Math.random() * 10
				});
			}
			return points;
		};

		const chartOptions = reactive({
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
					points: randomPoints()
				}
			]
		} as JSC.JSCChartConfig);

		function updateChartOptions() {
			chartOptions.series = [
				{
					name: 'Purchases',
					points: randomPoints()
				}
			];
		}
		return {
			chartOptions,
			updateChartOptions
		};
	},
	components: {
		JSCharting
	}
});
</script>
