<style>
.methodUpdate {
	height: 400px;
}
</style>

<template>
	<div>
		<JSCharting :options="options" class="methodUpdate"></JSCharting>
		<button v-on:click="updateData">Update Data</button>
	</div>
</template>

<script>
import JSCharting from 'jscharting-vue';

const data = [
	['1/1/2020', 29.9],
	['1/2/2020', 71.5],
	['1/3/2020', 106.4],
	['1/6/2020', 129.2],
	['1/7/2020', 144.0],
	['1/8/2020', 176.0]
];

export default {
	data() {
		return {
			name: 'methodUpdate',
			updateData: () => {
				this.options = {
					series: [
						{
							name: 'Purchases',
							points: randomPoints()
						}
					]
				};
			},
			options: {
				type: 'line',
				title_label_text: 'Series updates',
				legend_position: 'inside bottom right',
				xAxis: { scale_type: 'time' },
				series: [
					{
						name: 'Purchases',
						points: randomPoints()
					}
				]
			}
		};
	},
	components: {
		JSCharting
	}
};

function randomPoints() {
	return data.map((row, i) => {
		return { id: 'p' + i, x: row[0], y: Math.random() * 10 };
	});
}
</script>
