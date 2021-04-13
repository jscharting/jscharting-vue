<style scoped>
.liveData {
	height: 400px;
}
</style>

<template>
	<JSCharting
		:options="chartOptions"
		ref="myChart"
		class="liveData"
		@rendered="start"
	>
	</JSCharting>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
	beforeUnmount: function() {
		clearInterval(this.INTERVAL_ID);
	},
	name: 'liveData',
	setup() {
		const myChart = ref({} as JSCharting);
		let date = new Date(2020, 0, 10).getTime();
		let INTERVAL_ID = 0;
		let useShift = true;

		const start = function(chart: JSC.Chart) {
			INTERVAL_ID = setInterval(function() {
				myChart && addData(chart);
			}, 800);
		};

		const playPause = function(val: boolean) {
			if (val) {
				clearInterval(INTERVAL_ID);
			} else {
				start(myChart.value?.instance as JSC.Chart);
			}
		};
		const addData = function(chart: JSC.Chart) {
			chart
				.series(0)
				.points.add(
					{ y: Math.random() * 200, x: new Date(date) },
					{ shift: useShift }
				);
			date = date + 24 * 3600000 * 2;
		};

		const chartOptions = reactive({
			debug: true,
			legend: { position: 'inside top right' },
			yAxis: { formatString: 'c' },
			defaultSeries: { type: 'line', opacity: 1 },
			title: { label: { text: 'Data Total: %sum Average: %average' } },
			defaultPoint: {
				label: { text: '%yValue' },
				marker: {
					type: 'circle',
					size: 11,
					outline: { color: 'white', width: 2 }
				}
			},
			xAxis: { overflow: 'hidden', scale: { type: 'time' } },
			margin: { right: 20 },
			animation: { duration: 400 },
			toolbar: {
				margin: 5,
				items: {
					'Shift Values': {
						type: 'checkbox',
						value: true,
						tooltip:
							'The shift option determines whether the first point in the series is removed when adding a new point.',
						events: {
							change: function(val: boolean) {
								useShift = val;
							}
						}
					},
					Stop: {
						type: 'option',
						icon: { name: 'system/default/pause' },
						boxVisible: true,
						label: { text: 'Pause' },
						events: {
							change: function(val: boolean) {
								playPause(val);
							}
						},
						states: {
							select: {
								icon: { name: 'system/default/play' },
								label: { text: 'Play' }
							}
						}
					}
				}
			},
			series: [
				{
					name: 'Purchases',
					points: [
						['1/1/2020', 29.9],
						['1/2/2020', 71.5],
						['1/3/2020', 106.4],
						['1/6/2020', 129.2],
						['1/7/2020', 144.0],
						['1/8/2020', 176.0]
					]
				}
			]
		} as JSC.JSCChartConfig);
		return {
			INTERVAL_ID,
			date,
			chartOptions,
			myChart,
			start
		};
	},
	components: {
		JSCharting
	}
});
</script>
