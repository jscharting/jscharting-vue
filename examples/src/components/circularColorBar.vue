<template>
	<JSCharting
		:options="chartOptions"
		style="max-width: 800px;height:400px; margin: 0 auto;"
	/>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	name: 'circularColorBar',
	components: { JSCharting },
	data() {
		return {
			chartOptions: {
				legend_visible: false,
				defaultTooltip_enabled: false,
				xAxis_spacingPercentage: 0.4,
				yAxis: [
					{
						id: 'ax1',
						defaultTick: {
							padding: 10,
							enabled: false
						},
						customTicks: [350, 600, 700, 800, 850],
						line: {
							width: 10,

							/* Defining the option will enable it. */
							breaks: {},

							/* Palette is defined at series level with an ID referenced here. */
							color: 'smartPalette:pal1'
						},
						scale_range: [350, 850]
					},
					{
						id: 'ax2',
						scale_range: [0, 850],
						defaultTick: {
							padding: 10,
							enabled: false
						},
						customTicks: [0, 300, 600, 700, 800, 850],
						line: {
							width: 10,
							color: 'smartPalette:pal2'
						}
					}
				],
				defaultSeries: {
					type: 'gauge column roundcaps',
					shape: {
						label: {
							text: '%max',
							align: 'center',
							verticalAlign: 'middle'
						}
					}
				},
				series: [
					{
						type: 'column roundcaps',
						name: 'Temperatures',
						yAxis: 'ax1',
						palette: {
							id: 'pal1',
							pointValue: '%yValue',
							ranges: [
								{ value: 350, color: '#FF5353' },
								{ value: 600, color: '#FFD221' },
								{ value: 700, color: '#77E6B4' },
								{ value: [800, 850], color: '#21D683' }
							]
						},
						shape_label: { style: { fontSize: 28 } },
						points: [['x', [350, 680]]]
					},
					{
						yAxis: 'ax2',
						name: 'Temperatures',
						palette: {
							id: 'pal2',
							pointValue: '{%yValue/850}',
							colors: [
								'#ffffd9',
								'#edf8b0',
								'#c7e9b4',
								'#7fcdbb',
								'#41b6c3',
								'#1d91c0',
								'#225ea8',
								'#253494',
								'#081d58'
							]
						},
						shape_label: {
							text: '%value',
							style: { fontSize: 28 }
						},
						points: [['x', 320]]
					}
				]
			}
		};
	}
};
</script>
