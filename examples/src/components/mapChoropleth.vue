<style>
.mapChart {
	height: 600px;
}
</style>

<template>
	<JSCharting
		v-if="dataLoaded"
		:options="mapOptions"
		class="mapChart"
	></JSCharting>
</template>

<script>
import JSCharting, { JSC } from 'jscharting-vue';

const mapChartOptions = () => {
	return {
		type: 'map solid',
		title: {
			label: {
				text: 'Percentage of population lacking access to basic drinking water',
				style_fontSize: 14
			},
			position: 'center'
		},
		mapping_projection: {
			type: 'lambertConformalConic',
			parallels: [10, 9]
		},
		defaultPoint: {
			tooltip: '%name <b>{%zValue:n1}%</b>',
			outline: { color: 'white', width: 0.5 },
			states_hover: {
				outline: { color: '#7a7a7a' }
			},
			focusGlow_width: 2
		},
		legend_position: 'bottom',

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
						label_text: '{%value:n1}%',
						outline_width: 0
					},
					defaultTick_label: { text: '%value%' }
				}
			}
		}
	};
};

export default {
	name: 'mapChoropleth',
	mounted: function() {
		const me = this;
		fetch('./resources/access-to-drinking-water-by-country.csv')
			.then(function(response) {
				return response.text();
			})
			.then(function(text) {
				let jsonData = JSC.csv2Json(text);
				const points = JSC.nest()
					.key('country_code')
					.pointRollup(function(key, val) {
						let values = val[0];
						return {
							map: values.country_code,
							z: 100 - values.value
						};
					})
					.points(jsonData);
				me.mapOptions = JSC.merge(mapChartOptions(), { series: [{ points }] });
				me.dataLoaded = true;
			});
	},
	data() {
		return {
			dataObject: undefined,
			mapOptions: mapChartOptions(),
			dataLoaded: false
		};
	},
	components: {
		JSCharting
	}
};
</script>
