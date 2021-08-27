<template>
	<div>
		<p>Two way selection binding. Use dropdown or hover a series line.</p>
		<label>
			Selected:
			<select v-model="selected" @change="selectSeries">
				<option v-for="ser in series" :value="ser.name">{{ ser.name }}</option>
			</select>
		</label>

		<JSCharting
			ref="myChart"
			v-if="dataLoaded"
			:options="chartOptions"
			@rendered="selectSeries"
      style="height:400px;"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'interactiveLine',
	props: {
		dataLoaded: { type: Boolean, default: false }
	},
	components: { JSCharting },
	setup() {
		const myChart = ref({} as JSCharting);
		const series: any = ref([]);
		let dataLoaded = ref(false);
		let selected = ref('Average');

		const chartInstance = () => myChart.value?.instance as JSC.Chart;

		const chartOptions = reactive({
			type: 'spline',
			title: { label: { text: 'Average US Unemployment Rate' } },
			defaultTooltip: { enabled: false },
			yAxis: {
				defaultTick: { label: { text: '%value%' } },
				scale: { range: [2, 14] }
			},
			xAxis: {
				scale: { type: 'time' },
				formatString: 'yyyy'
			},
			defaultPoint: {
				marker: {
					visible: false,
					size: 12
				},
				states: {
					// Point hover and mute states are not necessary
					hover: { enabled: false },
					mute: { enabled: false }
				},
				events: {
					mouseOver: function() {
						const point = this as JSC.Point;
						selected.value = point.series.options('name');
						selectSeries();
						return false;
					}
				},
				focusGlow: { width: 0 }
			},
			legend: { visible: false },
			defaultSeries: {
				// Default line is translucent and desaturated
				line: {
					opacity: 0.2,
					color: 'desaturate',
					width: 1
				},
				states: {
					select: {
						// Selected line is solid, and thicker.
						line: {
							opacity: 1,
							color: 'currentColor',
							width: 3
						}
					},
					// Series hover and mute states are not necessary
					hover: { enabled: false },
					mute: { enabled: false }
				}
			}
		} as JSC.JSCChartConfig);

		onMounted(async () => {
			const response = await fetch('./resources/laborForceUs.csv');
			const text = await response.text();
			series.value = makeSeries(text);
			chartOptions.series = series;
			dataLoaded.value = true;
		});

		const selectionChanged = () => {
			selectSeries();
		};

		// Set the selected series on the chart.
		function selectSeries(argChart?: JSC.Chart) {
			const chart = chartInstance() || argChart;
			chart?.series().each(function(s) {
				s.options({ selected: selected.value == s.name });
			});
		}

		return {
			chartOptions,
			myChart,
			series,
			selectionChanged,
			selectSeries,
			selected,
			dataLoaded
		};
	}
});

function ref2Chart(ref: any) {
	return ref.value?.instance as JSC.Chart;
}

// Convert csv text to a chart series
function makeSeries(csvText: string) {
	// Parse the csv text into JSON.
	const data = JSC.csv2Json(csvText, {
		coerce: function(d: any) {
			return {
				state: d.state === 'Total' ? 'Average' : d.state,
				year: d.year,
				rate: (parseInt(d.unemployed) * 100) / parseInt(d.labor_force)
			};
		}
	}).filter(function(x) {
		return parseInt(x.year) > 1990;
	});

	// Create a series for the chart.
	return JSC.nest()
		.key('state')
		.key('year')
		.pointRollup(function(key, val) {
			const values = val[0];
			return {
				x: '1/1/' + values.year,
				y: values.rate
			};
		})
		.series(data);
}
</script>
