<template>
	<div>
		<p class="examplesDescription">
			With one setting, you can provide a datagrid representation of your
			charts.
		</p>
		<JSCharting
			:options="chartOptions"
			style=" height:400px; margin: 20px auto;"
		></JSCharting>
	</div>
</template>

<script lang="ts">
import JSCharting, { JSC } from 'jscharting-vue';

export default {
	name: 'chartDataGrid',
	components: { JSCharting },
	data() {
		return {
			chartOptions: {
				grid: { enabled: true },
				title: { label: { text: 'Sales by quarter' } },
				xAxis: { label: { text: 'Quarters' } },
				yAxis: { formatString: 'c', label: { text: 'USD' } },
				series: [
					{
						name: 'Gross Sales',
						points: [
							{ name: 'Q1', y: 50120 },
							{ name: 'Q2', y: 53465 },
							{ name: 'Q3', y: 62165 },
							{ name: 'Q4', y: 52156 }
						]
					},
					{
						name: 'Net Sales',
						points: [
							{ name: 'Q1', y: 32654 },
							{ name: 'Q2', y: 35645 },
							{ name: 'Q3', y: 42651 },
							{ name: 'Q4', y: 30153 }
						]
					}
				]
			}
		};
	}
};
</script>
