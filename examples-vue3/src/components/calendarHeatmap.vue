<template>
	<JSCharting
		:options="chartOptions"
		style="height:200px;  max-width:800px;"
	></JSCharting>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'calendarHeatmap',
	setup() {
		const chartOptions = reactive({
			debug: true,
			type: 'calendar year solid',
			title: { label: { text: 'Daily Steps 2017' } },
			data: './resources/stepData17-18.csv',
			calendar: {
				range: ['1/1/2017', '12/31/2017'],
				defaultEdgePoint: {
					tooltip: '',
					mouseTracking: false
				}
			},
			legend: { position: 'right' },
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
				colorBar: { axis: { scale: { interval: 5000 } } }
			},
			defaultPoint: { tooltip: '<b>%name</b><br> %zValue Steps' },
			toolbar: { visible: false }
		} as JSC.JSCChartConfig);
		return {
			chartOptions
		};
	},
	components: {
		JSCharting
	}
});
</script>
