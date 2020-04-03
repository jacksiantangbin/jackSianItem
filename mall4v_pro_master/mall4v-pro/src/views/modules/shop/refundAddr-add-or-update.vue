<template>
  <el-dialog :title="!dataForm.refundAddrId ? '新增收货地址' : '修改收货地址'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="收货人"
                    prop="receiverName">
        <el-input v-model="dataForm.receiverName"
                  placeholder="收货人姓名"></el-input>
      </el-form-item>

      <el-form-item label="手机号码"
                    prop="receiverMobile">
        <el-input v-model="dataForm.receiverMobile"
                  placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="公司座机"
                    prop="receiverTelephone">
        <el-input v-model="dataForm.receiverTelephone"
                  placeholder="公司座机"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-col :span="8">
          <el-form-item prop="province">
            <el-select v-model="dataForm.provinceId"
                       placeholder="请选择"
                       @change="selectProvince">
              <el-option v-for="province in provinceList"
                         :key="province.areaId"
                         :label="province.areaName"
                         :value="province.areaId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="city">
            <el-select v-model="dataForm.cityId"
                       placeholder="请选择"
                       @change="selectCity">
              <el-option v-for="city in cityList"
                         :key="city.areaId"
                         :label="city.areaName"
                         :value="city.areaId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="area">
            <el-select v-model="dataForm.areaId"
                       placeholder="请选择">
              <el-option v-for="area in areaList"
                         :key="area.areaId"
                         :label="area.areaName"
                         :value="area.areaId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="详细地址"
                    prop="addr">
        <el-input v-model="dataForm.addr"
                  placeholder="详细地址"></el-input>
      </el-form-item>

      <el-form-item label="邮政编码"
                    prop="postCode">
        <el-input v-model="dataForm.postCode"
                  placeholder="邮政编码"></el-input>
      </el-form-item>

      <el-form-item label="是否默认"
                    prop="postCode">
        <el-radio-group v-model="dataForm.defaultAddr">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      provinceList: [],
      cityList: [],
      areaList: [],
      dataForm: {
        refundAddrId: null,
        addrId: 0,
        addr: '',
        receiverName: '',
        receiverMobile: '',
        receiverTelephone: '',
        postCode: '',
        area: '',
        city: '',
        province: '',
        areaId: null,
        cityId: null,
        provinceId: null,
        defaultAddr: 1
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      dataRule: {
        receiverName: [
          { required: true, message: '收货人姓名不能为空', trigger: 'blur' }
        ],
        addr: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
        city: [{ required: true, message: '城市不能为空', trigger: 'blur' }],
        province: [
          { required: true, message: '省份不能为空', trigger: 'blur' }
        ],
        area: [{ required: true, message: '区/县不能为空', trigger: 'blur' }],
        receiverMobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.refundAddrId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        this.cityList = []
        this.areaList = []
        this.dataForm.provinceId = null
        this.dataForm.cityId = null
        this.dataForm.areaId = null
      })
      this.listAreaByParentId().then(({ data }) => {
        this.provinceList = data
      })
      if (this.dataForm.refundAddrId) {
        this.$http({
          url: this.$http.adornUrl(
            `/shop/refundAddr/info/${this.dataForm.refundAddrId}`
          ),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.dataForm.addr = data.addr
          this.dataForm.receiverMobile = data.receiverMobile
          this.dataForm.receiverTelephone = data.receiverTelephone
          this.dataForm.areaId = data.areaId
          this.dataForm.cityId = data.cityId
          this.dataForm.provinceId = data.provinceId
          this.dataForm.receiverName = data.receiverName
          this.dataForm.postCode = data.postCode
          this.dataForm.defaultAddr = data.defaultAddr
          this.listAreaByParentId(data.provinceId).then(({ data }) => {
            this.cityList = data
          })
          this.listAreaByParentId(data.cityId).then(({ data }) => {
            this.areaList = data
          })
        })
      }
    },
    listAreaByParentId (pid) {
      if (!pid) pid = 0
      return this.$http({
        url: this.$http.adornUrl(`/admin/area/listByPid`),
        method: 'get',
        params: this.$http.adornParams({ pid })
      })
    },
    // 选择省
    selectProvince (val) {
      this.dataForm.cityId = null
      this.dataForm.city = ''
      // 获取城市的select
      this.listAreaByParentId(val).then(({ data }) => {
        this.cityList = data
      })
    },
    // 选择市
    selectCity (val) {
      this.dataForm.areaId = null
      this.dataForm.area = ''
      // 获取区的select
      this.listAreaByParentId(val).then(({ data }) => {
        this.areaList = data
      })
    },
    // 表单提交
    dataFormSubmit () {
      for (let i = 0; i < this.provinceList.length; i++) {
        if (this.provinceList[i].areaId === this.dataForm.provinceId) {
          // 将省名字保存起来
          this.dataForm.province = this.provinceList[i].areaName
        }
      }
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].areaId === this.dataForm.cityId) {
          // 将市名字保存起来
          this.dataForm.city = this.cityList[i].areaName
        }
      }
      for (let i = 0; i < this.areaList.length; i++) {
        if (this.areaList[i].areaId === this.dataForm.areaId) {
          // 将市名字保存起来
          this.dataForm.area = this.areaList[i].areaName
        }
      }
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/shop/refundAddr`),
            method: this.dataForm.refundAddrId ? 'put' : 'post',
            data: this.$http.adornData({
              refundAddrId: this.dataForm.refundAddrId || undefined,
              addr: this.dataForm.addr,
              receiverName: this.dataForm.receiverName,
              receiverMobile: this.dataForm.receiverMobile,
              receiverTelephone: this.dataForm.receiverTelephone,
              area: this.dataForm.area,
              city: this.dataForm.city,
              province: this.dataForm.province,
              areaId: this.dataForm.areaId,
              cityId: this.dataForm.cityId,
              provinceId: this.dataForm.provinceId,
              postCode: this.dataForm.postCode,
              defaultAddr: this.dataForm.defaultAddr
            })
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList', this.page)
              }
            })
          })
        }
      })
    }
  }
}
</script>
