<template>
  <div>
    <page-header-wrapper title="基本信息">
      <div class="boxs-content">
        <a-form-model>
          <a-form-model-item label="账号">
            <a-input />
          </a-form-model-item>
          <a-form-model-item label="名称">
            <a-input />
          </a-form-model-item>
          <a-form-model-item label="地址">
            <a-input />
          </a-form-model-item>
          <a-form-model-item label="报告标题">
            <a-input />
          </a-form-model-item>
          <a-form-model-item label="LOGO">
            <a-button icon="cloud-upload" @click="$refs.modal.edit(1)">点击上传</a-button>
          </a-form-model-item>

          <a-form-model-item label="介绍">
            <editor :init="init1"></editor>
          </a-form-model-item>
          <a-form-model-item label="预约说明">
            <editor :init="init2"></editor>
          </a-form-model-item>

          <a-form-model-item label="显示结果">
            <a-select>
              <a-select-option key="true">
                显示
              </a-select-option>
              <a-select-option key="false">
                不显示
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="测试者登录方式">
            <a-select>
              <a-select-option key="false">
                账户密码登录
              </a-select-option>
              <a-select-option key="true">
                手机验证码登录
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="结束语">
            <a-input />
          </a-form-model-item>
          <a-button type="primary">确认</a-button>
        </a-form-model>
      </div>
    </page-header-wrapper>
    <cut ref="modal" @ok="setavatar"></cut>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import cut from '@/components/cutImg/cut'
  export default {
	components: {
    Editor,
    cut
	},
	created () {
	},

	data () {
	return {
		init1: {
        // 组件
        plugins:
          ' lists image colorpicker textcolor wordcount contextmenu autoresize',
        // 工具栏
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat ',
        branding: false,
        min_height: 300,
        menubar: false
	},
		init2: {
        // 组件
        plugins:
          ' lists image colorpicker textcolor wordcount contextmenu autoresize',
        // 工具栏
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat ',
        branding: false,
        min_height: 300,
        menubar: false
      },
    option: {
      img: ''
    }
	}
	},

	methods: {
    setavatar (url) {
      this.option.img = url
    }
  }
  }

</script>
<style scoped>
.boxs-content{
	width: 50%;
	margin: 0 auto;
}
.boxs-content>form>.ant-form-item{
	margin-bottom: 0 !important;
}
</style>
