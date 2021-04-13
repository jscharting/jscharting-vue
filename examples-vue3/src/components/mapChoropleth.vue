<style>
.mapChart {
	height: 500px;
	max-width: 700px;
}
</style>

<template>
	<JSCharting
		:options="mapOptions"
		v-if="dataLoaded"
		class="mapChart"
	></JSCharting>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'mapChoropleth',
	props: {
		dataLoaded: { type: Boolean, default: false }
	},
	setup() {
		const series: any = ref([]);
		let dataLoaded = ref(false);
		const mapOptions = reactive({
			type: 'map solid',
			title: {
				label: {
					text:
						'Percentage of population lacking access to basic drinking water',
					style: { fontSize: 14 }
				},
				position: 'center'
			},
			mapping: {
				projection: {
					type: 'lambertConformalConic',
					parallels: [10, 9]
				}
			},
			defaultPoint: {
				tooltip: '%name <b>{%zValue:n1}%</b>',
				outline: { color: 'white', width: 0.5 },
				states: {
					hover: {
						outline: { color: '#7a7a7a' }
					}
				},
				focusGlow: { width: 2 }
			},
			legend: { position: 'bottom' },

			palette: {
				pointValue: p => p.options('z'),
				colors: [
					'#ff3d00',
					'#ff7213',
					'#ffa726',
					'#ffc041',
					'#ffd85b',
					'#fff176',
					'#eaee87',
					'#d6eb99',
					'#c1e8aa',
					'#6ec1bb',
					'#1b9acb'
				].reverse(),
				colorBar: {
					width: 8,
					axis: {
						crosshair: {
							label: { text: '{%value:n1}%' },
							outline: { width: 0 }
						},
						defaultTick: { label: { text: '%value%' } }
					}
				}
			}
		} as JSC.JSCChartConfig);

		onMounted(async () => {
			const response = await fetch(
				'./resources/access-to-drinking-water-by-country.csv'
			);
			const text = await response.text();

			const mapData = JSC.csv2Json(text);

			const points = JSC.nest()
				.key('country_code')
				.pointRollup(function(key, val) {
					let values = val[0];
					return {
						map: values.country_code,
						z: 100 - values.value
					};
				})
				.points(mapData);
			series.value = [{ points }];
			mapOptions.series = series;
			dataLoaded.value = true;
		});

		return {
			mapOptions,
			dataLoaded
		};
	},
	components: {
		JSCharting
	}
});
</script>
