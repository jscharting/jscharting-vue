<style>
.chartA {
	max-width: 700px;
	height: 250px;
	margin: 0 auto;
}

.chartB {
	max-width: 700px;
	height: 450px;
	margin: 0 auto;
}
</style>

<template>
	<div>
		<JSCharting
			ref="chartA"
			v-if="dataLoaded"
			:options="configA"
			class="chartA"
		/>
		<JSCharting
			ref="chartB"
			v-if="dataLoaded"
			:options="configB"
			class="chartB"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'masterDetail',
	props: {
		dataLoaded: { type: Boolean, default: false }
	},
	setup() {
		const initialView = [1990, 2015];

		//Chart references
		const chartA = ref({} as JSCharting);
		const chartB = ref({} as JSCharting);

		//The series data
		const series: any = ref([]);

		let dataLoaded = ref(false);

		const configA = reactive({
			debug: true,
			title: { label: { text: 'Births to Unmarried Women by Age Group' } },
			animation: false,
			legend: {
				template: '%icon %name',
				position: 'bottom'
			},
			defaultPoint: { marker: { type: 'none' } },
			defaultSeries: { mouseTracking: { enabled: false } },
			yAxis: {
				alternateGridFill: 'none',
				label: { text: 'Number of births' }
			},
			xAxis: {
				formatString: 'd',
				label: { text: 'Year' },
				markers: [
					{
						value: initialView,
						legendEntry: { visible: false }
					}
				]
			},
			toolbar: {
				items: {
					export: { visible: false },
					slider: {
						position: 'inside top',
						type: 'range',
						label: { text: '1940-2015' },
						visible: true,
						width: 595,
						value: initialView,
						min: 1940,
						max: 2015,
						throttle: 6,
						events: {
							change: function(range: any) {
								const chartDetail = chartB.value?.instance as JSC.Chart,
									chart = chartA.value?.instance as JSC.Chart;
								//Update marker position on main chart.
								if (chart && chartDetail) {
									chart
										.axes('x')
										.markers(0)
										.options({ value: range });
									//Update details chart zoom
									chartDetail.axes('x').zoom(range);
								}
							}
						}
					}
				}
			},
			series: series.value
		} as JSC.JSCChartConfig);

		const configB = reactive({
			title: { label: { text: 'Detail' } },
			animation: false,
			debug: true,
			legend: { visible: false },
			defaultPoint: {
				marker: { type: 'none' },
				tooltip: '%seriesName %icon %yValue'
			},
			yAxis: {
				alternateGridFill: 'none',
				label: { text: 'Number of births' }
			},
			xAxis: {
				crosshair: { enabled: true },
				formatString: 'd',
				label: { text: 'Year' }
			},
			series: series.value
		} as JSC.JSCChartConfig);

		onMounted(async () => {
			const response = await fetch(
				'https://data.cdc.gov/resource/fvae-a8ai.csv'
			);
			const text = await response.text();
			series.value = JSC.nest()
				.key('age_group')
				.key('year')
				.rollup('birth_number')
				.series(JSC.csv2Json(text));
			configA.series = series;
			configB.series = series;
			dataLoaded.value = true;
		});
		return {
			dataLoaded,
			configA,
			configB,
			chartA,
			chartB
		};
	},
	methods: {},
	components: {
		JSCharting
	}
});
</script>
