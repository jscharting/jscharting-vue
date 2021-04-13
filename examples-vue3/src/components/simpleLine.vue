<template>
	<JSCharting :options="chartOptions" style="max-width: 800px;height:400px;" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'simpleLine',
	components: { JSCharting },
	setup() {
		const chartOptions = reactive({
			legend: { visible: false },
			title: { label: { text: 'Cost over time' } },
			yAxis: [
				/* Main axis is defined first. */
				{ formatString: 'c' },
				/* Secondary axis will sync with main axis by default. */
				{
					id: 'secondY',
					orientation: 'opposite',
					line: { color: '#e2e2e2' },
					defaultTick: {
						enabled: false,
						gridLine: { visible: false }
					}
				}
			],
			xAxis: {
				crosshair: { enabled: true },
				scale: { type: 'time' }
			},
			defaultSeries: {
				type: 'line',
				defaultPoint: { marker: { visible: false } },
				lastPoint: {
					label: { text: '<b>%seriesName</b>' },
					yAxisTick: {
						axisId: 'secondY',
						label: { text: '%yValue' }
					}
				}
			},
			series: [
				{
					name: 'Purchases',
					points: [
						['1/1/2020', 29.9],
						['2/1/2020', 97.5],
						['3/1/2020', 110.4],
						['4/1/2020', 129.2],
						['5/1/2020', 144.0],
						['6/1/2020', 176.0],
						['7/1/2020', 182.0],
						['8/1/2020', 186.0],
						['9/1/2020', 181.0],
						['10/1/2020', 178.0],
						['11/1/2020', 184.0],
						['12/1/2020', 176.0]
					]
				},
				{
					name: 'Taxes',
					points: [
						['1/1/2020', 86.9],
						['2/1/2020', 79.5],
						['3/1/2020', 95.4],
						['4/1/2020', 97.2],
						['5/1/2020', 123.0],
						['6/1/2020', 111.0],
						['7/1/2020', 122.0],
						['8/1/2020', 135.0],
						['9/1/2020', 140.0],
						['10/1/2020', 139.0],
						['11/1/2020', 135.0],
						['12/1/2020', 132.0]
					]
				},
				{
					name: 'Supplies',
					points: [
						['1/1/2020', 129.9],
						['2/1/2020', 111.5],
						['3/1/2020', 66.4],
						['4/1/2020', 29.2],
						['5/1/2020', 88.0],
						['6/1/2020', 102.0],
						['7/1/2020', 82.0],
						['8/1/2020', 75.0],
						['9/1/2020', 162.0],
						['10/1/2020', 110.0],
						['11/1/2020', 90.0],
						['12/1/2020', 85.0]
					]
				},
				{
					name: 'Rent',
					points: [
						['1/1/2020', 56.9],
						['2/1/2020', 56.5],
						['3/1/2020', 56.4],
						['4/1/2020', 56.2],
						['5/1/2020', 75.0],
						['6/1/2020', 56.0],
						['7/1/2020', 56.0],
						['8/1/2020', 56.0],
						['9/1/2020', 56.0],
						['10/1/2020', 67.0],
						['11/1/2020', 67.0],
						['12/1/2020', 67.0]
					]
				}
			]
		} as JSC.JSCChartConfig);
		return {
			chartOptions
		};
	}
});
</script>
