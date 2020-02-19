<style>
.calendarChart {
	height: 600px;
}
</style>

<template>
	<JSCharting :options="options" class="calendarChart"></JSCharting>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	data() {
		return {
			name: 'calendarChart',
			options: {
				debug: true,
				type: 'calendar month solid',
				title: {
					label_text: 'Exam Schedule January 2018',
					position: 'center',
					label_style_fontSize: 22
				},
				legend: {
					position: 'bottom',
					template: '%icon %name',
					customEntries: [
						{
							name: 'Biology',
							icon_color: '#4285F4'
						},
						{
							name: 'Philosophy',
							icon_color: '#fE4C14'
						},
						{
							name: 'Computer Science',
							icon_color: '#DBCB18'
						},
						{
							name: 'Physics',
							icon_color: '#15AC20'
						},
						{
							name: 'History',
							icon_color: '#D150B1'
						},
						{
							name: 'Mathematics',
							icon_color: '#FF9A00'
						},
						{
							name: 'Economics',
							icon_color: '#00C8C2'
						},
						{
							name: 'Business Studies',
							icon_color: '#808ED7'
						}
					]
				},
				defaultSeries: {
					shape_innerPadding: 0,
					mouseTracking_enabled: false,
					legendEntry_visible: false
				},
				defaultPoint: {
					label: {
						text: '<b>%name</b><br>%events',
						align: 'center',
						verticalAlign: 'top',
						style_fontSize: 20
					},
					attributes_events: ''
				},
				toolbar_visible: false,
				yAxis_visible: false,
				series: [
					{
						points: [
							{
								date: [1515099600000, 1515445200000],
								attributes: {
									subject: 'Biology',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#4285F4><br>'
									]
								}
							},
							{
								date: [1515186000000, 1515445200000],
								attributes: {
									subject: 'Philosophy',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#fE4C14><br>'
									]
								}
							},
							{
								date: [1515358800000, 1515877200000],
								attributes: {
									subject: 'Computer Science',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#DBCB18><br>'
									]
								}
							},
							{
								date: [1515618000000, 1515963600000],
								attributes: {
									subject: 'Physics',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#15AC20><br>'
									]
								}
							},
							{
								date: [1515877200000, 1516309200000],
								attributes: {
									subject: 'History',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#D150B1><br>'
									]
								}
							},
							{
								date: [1516136400000, 1516741200000],
								attributes: {
									subject: 'Mathematics',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#FF9A00><br>'
									]
								}
							},
							{
								date: [1516482000000, 1517086800000],
								attributes: {
									subject: 'Economics',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#00C8C2><br>'
									]
								}
							},
							{
								date: [1516914000000, 1517346000000],
								attributes: {
									subject: 'Business Studies',
									events: [
										'<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=#808ED7><br>'
									]
								}
							}
						]
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
