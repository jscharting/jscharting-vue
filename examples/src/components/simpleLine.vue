<style>
.simpleLine {
	height: 400px;
}
</style>

<template>
	<JSCharting :options="options" class="simpleLine"></JSCharting>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	name: 'simpleLine',
	data() {
		return {
			options: {
				legend_visible: false,
				title_label_text: 'Cost over time',
				yAxis: [
					{ id: 'mainY', formatString: 'c' },
					{
						id: 'secondY',
						scale_syncWith: 'mainY',
						orientation: 'opposite',
						line_color: '#e2e2e2',
						defaultTick: {
							enabled: false,
							gridLine_visible: false
						}
					}
				],
				xAxis: {
					crosshair_enabled: true,
					scale: { type: 'time' }
				},
				defaultSeries: {
					type: 'line',
					defaultPoint_marker_visible: false,
					lastPoint: {
						label_text: '<b>%seriesName</b>',
						yAxisTick: {
							axisId: 'secondY',
							label_text: '%yValue'
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
			}
		};
	},
	components: {
		JSCharting
	}
};
</script>
