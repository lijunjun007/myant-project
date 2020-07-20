<template>
  <page-header-wrapper>
    <div class="boxs-content">
      <a-form-model>
        <a-form-model-item label="原密码" placeholder="请输入原密码">
          <a-input />
        </a-form-model-item>
        <a-form-model-item label="新密码" placeholder="请输入新密码">
          <a-input />
        </a-form-model-item>
        <a-form-model-item label="确认新密码" placeholder="请输入确认新密码">
          <a-input />
        </a-form-model-item>
        <a-button type="primary">确认</a-button>
      </a-form-model>
    </div>
  </page-header-wrapper>
</template>

<script>
  export default {
	created () {
	},

	data () {
	return {
	}
	},

	methods: {}
  }

</script>
<style scoped>
.boxs-content{
	width: 50%;
	padding-top:50px;
	margin: 0 auto;
}
.boxs-content>form>.ant-form-item{
	margin-bottom: 0 !important;
}
</style>
