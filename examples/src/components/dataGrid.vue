<style>
.dataGrid {
	margin: 20px auto;
}
</style>

<template>
	<JSCGrid :options="options" class="dataGrid"></JSCGrid>
</template>

<script>
import { JSCGrid } from 'jscharting-vue';

export default {
	name: 'dataGrid',
	data() {
		return {
			options: {
				className: 'jscTable',
				data: [
					['Art', 5, 10],
					['Greg', 3, 6],
					['Olivia', 11, 8],
					['Steve', 11, 4],
					['Anna', 3, 8]
				],
				columns: [
					{ header: 'Name' },
					{ header: 'Value One' },
					{ header: 'Value Two' },
					{ header: 'Sum', value: '{%1+%2}' }
				]
			}
		};
	},
	components: {
		JSCGrid
	}
};
</script>
