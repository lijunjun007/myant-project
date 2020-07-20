<template>
  <div :id="id">
  </div>
</template>

<script>
export default {
mounted () {
	this.drawEchart(this.id, this.data)
},

data () {
return {
	echartObj: null
}
},
watch: {
	data: {
		handler (newValue, oldValue) {
			this.drawEchart(this.id, newValue)
		},
		deep: true
	}
},
props: {
	id: {
		type: String,
		required: true
	},
	data: {
		type: Object,
		required: true
	}
},
methods: {
	drawEchart (id, data) {
		const _this = this
		this.echartObj = this.$echarts.init(document.getElementById(id))
		this.echartObj.setOption(data)
		window.addEventListener('resize', function () {
			_this.echartObj.resize()
		})
	}
},
beforeDestroy () {
	if (this.echartObj) {
		this.echartObj.clear()
	}
}
}

</script>
<style scoped>
</style>
