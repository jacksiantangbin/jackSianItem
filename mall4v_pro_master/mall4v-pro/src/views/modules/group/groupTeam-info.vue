<template>
  <el-dialog title="同团订单列表"
             width="60%"
             :close-on-click-modal="false"
             :visible.sync="dialogTableVisible">
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="orderNumber"
                       label="订单编号"
                       width="180">
      </el-table-column>
      <el-table-column prop="activityProdPrice"
                       label="活动商品金额">
      </el-table-column>
      <el-table-column prop="payPrice"
                       label="支付金额">
      </el-table-column>
      <el-table-column label="团员身份">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.identityType == 1 && scope.row.userId != 0"
                  size="mini"
                  type="success">团长</el-tag>
          <el-tag v-if="scope.row.identityType == 0 && scope.row.userId != 0"
                  size="mini">团员</el-tag>
          <el-tag v-if="scope.row.userId == 0"
                  size="mini"
                  type="info">机器人</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime"
                       width="180"
                       label="下单时间">
      </el-table-column>
      <el-table-column label="操作"
                       width="180">
        <template slot-scope="scope">
          <el-button @click="viewOrder(scope.row.orderNumber)"
                     type="text"
                     size="small"
                     :disabled="scope.row.userId == 0">查看订单</el-button>
        </template>
      </el-table-column>
      create_time
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      tableData: null,
      dialogTableVisible: false
    }
  },
  methods: {
    init (groupTeamId) {
      this.dialogTableVisible = true
      this.$nextTick(() => {
        if (groupTeamId) {
          this.$http({
            url: this.$http.adornUrl('/group/team/info/' + groupTeamId),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            this.tableData = data 
          })
        }
      })
    },
    viewOrder (orderNumber) {
      this.dialogTableVisible = false
      this.$router.push({
        path: '/order-order',
        query: { orderNumber }
      })
    }
  }
}
</script>
