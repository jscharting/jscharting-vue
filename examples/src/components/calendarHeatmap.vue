<template>
	<JSCharting
		:options="chartOptions()"
		style="height:200px;  max-width:800px;"
	></JSCharting>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	name: 'calendarHeatmap',
	data() {
		return {
			chartOptions: () => {
				return {
					debug: true,
					type: 'calendar year solid',
					title_label_text: 'Daily Steps 2017',
					data: './resources/stepData17-18.csv',
					calendar: {
						range: ['1/1/2017', '12/31/2017'],
						defaultEdgePoint: {
							tooltip: '',
							mouseTracking: false
						}
					},
					legend_position: 'right',
					palette: {
						colors: [
							'#f7fcfd',
							'#e0ecf4',
							'#bfd3e6',
							'#9ebcda',
							'#8c96c6',
							'#8c6bb1',
							'#88419d',
							'#810f7c',
							'#4d004b'
						],
						colorBar_axis_scale_interval: 5000
					},
					defaultPoint_tooltip: '<b>%name</b><br> %zValue Steps',
					toolbar_visible: false
				};
			}
		};
	},
	components: {
		JSCharting
	}
};
</script>
