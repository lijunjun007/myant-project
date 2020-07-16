<template>
  <div>
    <a-row >
      <a-col :xs="{ span: 24 }" :xl="{ span: 12 }">
        <a-form class="liangbform">
          <a-form-item label="测评机构" class="clean-f-mri">
            <a-select default-value="4">
              <a-select-option value="1">
                测试商户（曾）
              </a-select-option>
              <a-select-option value="2">
                测试商户（孙）
              </a-select-option>
              <a-select-option value="3">
                测试商户（刘）
              </a-select-option>
              <a-select-option value="4">
                测试商户（军）
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="测评方案" class="clean-f-mri">
            <a-select default-value="4">
              <a-select-option value="1">
                ******表1
              </a-select-option>
              <a-select-option value="2">
                ******表2
              </a-select-option>
              <a-select-option value="3">
                ******表3
              </a-select-option>
              <a-select-option value="4">
                ******表4
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="测评量表" class="clean-f-mri">
            <a-select default-value="4">
              <a-select-option value="1">
                ******表1
              </a-select-option>
              <a-select-option value="2">
                ******表2
              </a-select-option>
              <a-select-option value="3">
                ******表3
              </a-select-option>
              <a-select-option value="4">
                ******表4
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="测评时间" class="clean-f-mri">
            <a-range-picker class="datepick" :placeholder="['开始时间','结束时间']"></a-range-picker>
          </a-form-item>
          <a-form-item label="文化程度" class="clean-f-mri">
            <a-select default-value="1">
              <a-select-option value="1">
                小学
              </a-select-option>
              <a-select-option value="2">
                初中
              </a-select-option>
              <a-select-option value="3">
                高中
              </a-select-option>
              <a-select-option value="4">
                专科
              </a-select-option>
              <a-select-option value="5">
                本科
              </a-select-option>
              <a-select-option value="6">
                硕士
              </a-select-option>
              <a-select-option value="7">
                博士
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="职业" class="clean-f-mri">
            <a-select default-value="1">
              <a-select-option value="1">
                医生
              </a-select-option>
              <a-select-option value="2">
                程序员
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="性别" class="clean-f-mri">
            <a-select default-value="1">
              <a-select-option value="1">
                男
              </a-select-option>
              <a-select-option value="2">
                女
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="年龄">
            <a-input-number placeholder="最小年龄" style="width:100px" :min="0" :max="150" />~
            <a-input-number placeholder="最大年龄" style="width:100px" :min="0" :max="150" />
          </a-form-item>
          <a-button type="primary" icon="file-search">查看</a-button>
        </a-form>
      </a-col>
    </a-row>
  </div>
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
.clean-f-mri{
  margin-bottom: 0;
}
>>> .datepick .ant-input{
  width: 60%;
}
</style>
