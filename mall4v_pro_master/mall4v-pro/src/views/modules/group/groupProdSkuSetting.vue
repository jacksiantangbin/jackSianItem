<template>
  <div class="mod-groupProd">
    <el-dialog title="商品规格管理"
               :close-on-click-modal="false"
               :visible.sync="visible"
               :modal="false"
               width="50%">
      <!-- 填写多个商品规格设置 -->
      <div v-if="true">
        <el-table :data="this.dataForm.skuDtoList"
                  style="width: 100%">
          <el-table-column prop="skuName"
                           label="sku名称"
                           width="180">
            <template slot-scope="scope">
              {{scope.row.skuName ==="" || scope.row.skuName?dataForm.prodName:scope.row.skuName}}
            </template>
          </el-table-column>
          <el-table-column prop="price"
                           label="原价"
                           width="180">
          </el-table-column>
          <el-table-column prop="actPrice"
                           label="拼团价(元)">
            <template slot-scope="scope">
              <el-input size="mini"
                        :disabled="dataForm.activityStatus !== 1"
                        v-model="scope.row.actPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="dataForm.hasLeaderPrice === 1"
                           prop="leaderPrice"
                           label="团长价">
            <template slot-scope="scope">
              <el-input size="mini"
                        :disabled="dataForm.activityStatus !== 1"
                        v-model="scope.row.leaderPrice"></el-input>
            </template>

          </el-table-column>
          <el-table-column prop="stocks"
                           label="库存">
          </el-table-column>
        </el-table>

        <!-- 批量设置价格 -->
        <div style="float:left">
          <span><strong>批量设置:</strong></span>
          <!-- 拼团价价格 -->
          <el-button type="text"
                     v-if="!settingGroupPriceVisible"
                     :disabled="dataForm.activityStatus !== 1"
                     @click="groupPriceSettingHandle()">拼团价</el-button>
          <el-input size="mini"
                    v-if="settingGroupPriceVisible"
                    style="width:100px;"
                    placeholder="输入价格"
                    type="number"
                    v-model="groupPrice"></el-input>
          <el-button type="text"
                     v-if="settingGroupPriceVisible"
                     @click="checkGroupPriceHandle()">确定</el-button>
          <el-button type="text"
                     v-if="settingGroupPriceVisible"
                     @click="settingGroupPriceVisible = false">取消</el-button>

          <!-- 团长价格 -->
          <el-button type="text"
                     v-if="!settingLeaderPriceVisible && dataForm.hasLeaderPrice==1"
                     :disabled="dataForm.activityStatus !== 1"
                     @click="leaderPriceSettingHandle()">团长价</el-button>
          <el-input size="mini"
                    v-if="settingLeaderPriceVisible && dataForm.hasLeaderPrice==1"
                    style="width:100px;"
                    placeholder="输入价格"
                    type="number"
                    v-model="leaderPrice"></el-input>
          <el-button type="text"
                     v-if="settingLeaderPriceVisible && dataForm.hasLeaderPrice==1"
                     @click="checkLeaderPriceHandle()">确定</el-button>
          <el-button type="text"
                     v-if="settingLeaderPriceVisible && dataForm.hasLeaderPrice==1"
                     @click="settingLeaderPriceVisible=false">取消</el-button>

        </div>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false"
                   size="mini">取消</el-button>
        <el-button type="primary"
                   @click="dataFormSubmit()"
                   :disabled="dataForm.activityStatus !== 1"
                   size="mini">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      groupSelectProdVisible: false,
      settingGroupPriceVisible: false,
      settingLeaderPriceVisible: false,
      dataForm: {
      },
      groupPrice: 0,
      leaderPrice: null
    }
  },
  methods: {
    init (groupProdId) {
      this.visible = true
      this.$nextTick(() => {
        if (groupProdId) {
          this.$http({
            url: this.$http.adornUrl('/group/prod/getGroupProdAndSkuList/' + groupProdId),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            this.dataForm = data
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      let list = this.dataForm.skuDtoList
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          const element = list[key]
          if (parseFloat(element.leaderPrice) <= 0) {
            this.$message.error('团长价格必须大于0元')
            return
          }
          if (parseFloat(element.actPrice) <= 0) {
            this.$message.error('活动价格必须大于0元')
            return
          }
          if (parseFloat(element.actPrice) > parseFloat(element.price)) {
            this.$message.error('活动价格不能高于商品原价')
            return
          }
          if (parseFloat(element.actPrice) > parseFloat(element.price)) {
            this.$message.error('活动价格不能高于商品原价')
            return
          }
          if (parseFloat(element.leaderPrice) > parseFloat(element.price)) {
            this.$message.error('团长价格不能高于商品原价')
            return
          }
          if (this.dataForm.hasLeaderPrice === 1 && parseFloat(element.leaderPrice) > parseFloat(element.actPrice)) {
            this.$message.error('团长价格不能高于活动价格')
            return
          }
        }
      }

      this.$http({
        url: this.$http.adornUrl('/group/sku/updateSkuBatch'),
        method: 'put',
        data: this.dataForm.skuDtoList
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visible = false
            this.$emit('refreshDataList')
          }
        })
      })
    },
    // 选择商品操作
    selectProdHandle () {
      this.groupSelectProdVisible = true
      this.$nextTick(() => {
        this.$refs.groupSelectProd.init(this.dataForm.groupProds)
      })
    },
    // 选商品回调
    selectGroupProds (prods) {
      if (prods) {
        let prodIds = []
        this.dataForm.groupProds = prods
        for (let index = 0; index < prods.length; index++) {
          prodIds.push(prods[index].prodId)
        }
        this.getProdAndSkuListsByProdIds(prodIds)
        prodIds = []
      }
    },
    // 通过商品id列表，查询所有的对应的sku列表
    getProdAndSkuListsByProdIds (prodIds) {
      if (prodIds) {
        this.$http({
          url: this.$http.adornUrl('/group/activity/getProdAndSkuLists?prodIds=' + prodIds),
          method: 'get',
          params: {

          }
        }).then(({ data }) => {
          this.groupProdAndSkuLists = data
        })
      }
    },
    // 设置成团价格
    groupPriceSettingHandle () {
      this.settingGroupPriceVisible = true
    },
    // 设置价格
    leaderPriceSettingHandle () {
      this.settingLeaderPriceVisible = true
    },
    // 设置拼团价格
    checkGroupPriceHandle () {
      if (parseInt(this.groupPrice) < 0) {
        this.$message.error('拼团价格必须为大于0')
        return
      }
      if (this.dataForm && this.groupPrice) {
        if (this.dataForm.skuDtoList) {
          for (let i = 0; i < this.dataForm.skuDtoList.length; i++) {
            this.dataForm.skuDtoList[i].actPrice = parseFloat(this.groupPrice)
          }
        }
      }
      this.settingGroupPriceVisible = false
    },
    // 设置团长价格
    checkLeaderPriceHandle () {
      if (this.dataForm && this.leaderPrice) {
        if (this.dataForm.skuDtoList) {
          for (let i = 0; i < this.dataForm.skuDtoList.length; i++) {
            this.dataForm.skuDtoList[i].leaderPrice = parseFloat(this.leaderPrice)
          }
        }
      }
      this.settingLeaderPriceVisible = false
    }
  }
}
</script>
<style lang="scss">
.mod-groupProd {
  .card-prod-bottom {
    position: relative;
    text-align: left;
    .card-prod-name {
      margin: auto;
      padding: 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 118px;
      display: inline-block;
    }
    .card-prod-name-button {
      position: absolute;
      top: 24px;
      right: 10px;
    }
  }
}
</style>