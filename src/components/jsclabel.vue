<template>
	<div></div>
</template>

<script>
import * as JSC from 'jscharting';
export default {
	name: 'JSCLabel',
	props: {
		options: { type: String, default: '' }
	},
	mounted: function() {
		this.renderLabel();
	},
	beforeDestroy: function() {
		this.destroyLabel();
	},
	watch: {
		options: function() {
			this.renderLabel();
		}
	},
	methods: {
		destroyLabel: function() {
			const containerElement = this.$el;
			containerElement.innerHTML = '';
		},
		renderLabel: function() {
			this.destroyLabel();
			const containerElement = this.$el;
			JSC.label(containerElement, this.options);
		}
	}
};
</script>
