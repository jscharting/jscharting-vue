<style>
.areaStep {
	height: 400px;
}
</style>

<template>
	<JSCharting :options="options" class="areaStep"></JSCharting>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	data() {
		return {
			name: 'areaStep',
			options: {
				debug: true,
				defaultSeries_type: 'areaStep',
				defaultSeries_opacity: 0.85,
				title_label_text:
					'Units Sold Last Week.  [Total: %sum, Top Seller: %maxSeriesName]',
				yAxis_label_text: 'Units',
				xAxis: {
					scale_type: 'time'
				},
				yAxis_scale_type: 'stacked',
				series: [
					{
						name: 'Muhammad',
						points: [
							{
								x: '3/8/2016',
								y: 62
							},
							{
								x: '3/9/2016',
								y: 70
							},
							{
								x: '3/10/2016',
								y: 80
							},
							{
								x: '3/11/2016',
								y: 78
							},
							{
								x: '3/12/2016',
								y: 69
							},
							{
								x: '3/13/2016',
								y: 78
							},
							{
								x: '3/14/2016',
								y: 52
							},
							{
								x: '3/15/2016',
								y: 38
							},
							{
								x: '3/16/2016',
								y: 11
							},
							{
								x: '3/17/2016',
								y: 19
							}
						]
					},
					{
						name: 'Bentley',
						points: [
							{
								x: '3/8/2016',
								y: 51
							},
							{
								x: '3/9/2016',
								y: 73
							},
							{
								x: '3/10/2016',
								y: 46
							},
							{
								x: '3/11/2016',
								y: 54
							},
							{
								x: '3/12/2016',
								y: 24
							},
							{
								x: '3/13/2016',
								y: 58
							},
							{
								x: '3/14/2016',
								y: 85
							},
							{
								x: '3/15/2016',
								y: 62
							},
							{
								x: '3/16/2016',
								y: 89
							},
							{
								x: '3/17/2016',
								y: 100
							}
						]
					},
					{
						name: 'Blake',
						points: [
							{
								x: '3/8/2016',
								y: 109
							},
							{
								x: '3/9/2016',
								y: 97
							},
							{
								x: '3/10/2016',
								y: 91
							},
							{
								x: '3/11/2016',
								y: 114
							},
							{
								x: '3/12/2016',
								y: 129
							},
							{
								x: '3/13/2016',
								y: 104
							},
							{
								x: '3/14/2016',
								y: 116
							},
							{
								x: '3/15/2016',
								y: 143
							},
							{
								x: '3/16/2016',
								y: 145
							},
							{
								x: '3/17/2016',
								y: 115
							}
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
