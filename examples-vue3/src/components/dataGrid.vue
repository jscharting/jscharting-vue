<template>
	<JSCGrid :options="gridOptions" style="	margin: 20px auto;"></JSCGrid>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { JSCGrid, JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'dataGrid',
	components: { JSCGrid },
	setup() {
		const gridOptions = reactive({
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
		} as JSC.JSCGridConfig);
		return {
			gridOptions
		};
	}
});
</script>
