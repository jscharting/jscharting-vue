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
		/>
	</div>
</template>

<script>
import JSCharting, { JSC } from 'jscharting-vue';

const chartConfig = () => {
	return {
		type: 'spline',
		title_label_text: 'Average US Unemployment Rate',
		defaultTooltip_enabled: false,
		yAxis: {
			defaultTick_label_text: '%value%',
			scale_range: [2, 14]
		},
		xAxis: {
			scale_type: 'time',
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
			focusGlow_width: 0
		},
		legend_visible: false,
		defaultSeries: {
			// Default line is translucent and desaturated
			line: {
				opacity: 0.2,
				color: 'desaturate'
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
			},
			line_width: 1
		}
	};
};

export default {
	name: 'interactiveLine',
	components: { JSCharting },
	mounted: function() {
		const me = this;
		fetch('./resources/laborForceUs.csv')
			.then(function(response) {
				return response.text();
			})
			.then(function(text) {
				me.series = me.makeSeries(text);
				me.chartOptions = JSC.merge(chartConfig(), {
					defaultPoint: {
						events: {
							mouseOver: function() {
								var point = this;
								me.selected = point.series.options('name');
								me.selectSeries();
								return false;
							}
						}
					},
					series: me.series
				});
				me.dataLoaded = true;
			});
	},
	data() {
		return {
			series: [],
			dataLoaded: false,
			chartOptions: chartConfig(),
			selected: 'Average'
		};
	},
	methods: {
		selectionChanged: () => {
			selectSeries();
		},
		selectSeries: function(argChart) {
			const me = this;
			const chart = me.chartInstance() || argChart;
			chart?.series().each(function(s) {
				s.options({ selected: me.selected == s.name });
			});
		},
		chartInstance: function() {
			return this.$refs.myChart.instance;
		},
		// Convert csv text to a chart series
		makeSeries: csvText => {
			// Parse the csv text into JSON.
			var data = JSC.csv2Json(csvText, {
				coerce: function(d) {
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
					var values = val[0];
					return {
						x: '1/1/' + values.year,
						y: values.rate
					};
				})
				.series(data);
		}
	}
};
</script>
