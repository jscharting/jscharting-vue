<style>
.mapChart {
	height: 600px;
}
</style>

<template>
	<JSCharting :options="options" class="mapChart"></JSCharting>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	data() {
		return {
			name: 'mapChart',
			options: {
				debug: true,
				type: 'map',
				legend_visible: false,
				title: {
					position: 'full',
					label_text: 'US Regions & Illinois'
				},
				palette: 'FiveColor8',
				series: [
					{
						/* The US must be specified in order to load the correct map. This however only needs to be specified once. */
						map: 'US.region:Northeast'
					},
					{
						map: 'region:Midwest',
						points: [
							{
								/* This point refers to one that is generated based on the midwest query. */
								map: 'us.il',
								color: '#C0F191'
							}
						]
					},
					{
						map: 'region:West'
					},
					{
						map: 'region:South'
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
