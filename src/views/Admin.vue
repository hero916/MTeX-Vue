<template>
  <div class="container-fluid">
    <div>
      <el-row>
        <!--v-model 在赋值 双向绑定-->
        <el-input v-model="adminName" placeholder="请输入管理员名称" style="width: 200px;margin-right: 30px"></el-input>
        <el-button type="success" @click="search">查询</el-button>
      </el-row>
    </div>
    <div class="row">
        <el-table :data="adminList" class="table" id="adminList">
          <el-table-column prop="adminId" label="编号" sortable  width="150%" align='center'>
          </el-table-column>

          <el-table-column prop="adminNumber" label="账号" width="180%" align='center'>
          </el-table-column>

          <el-table-column prop="adminName" label="姓名" width="150%" align='center'>
          </el-table-column>

          <el-table-column prop="adminSex" label="性别" sortable width="100px" align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.adminSex==undefined">未填写</span>
              <span v-else-if="scope.row.adminSex==1">男</span>
              <span v-else-if="scope.row.adminSex==0">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="adminPhone" label="联系电话" width="160px" align='center'>
            <template slot-scope="scope">
              <span v-if="null==scope.row.adminPhone||''==scope.row.adminPhone" style="">未填写</span>
              <span v-else v-text="scope.row.adminPhone"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align='center'>
            <template>
              <el-button type="primary">查看</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <div>
      <el-col :span="24" class="toolbar">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
                       :page-size="pageSize"  layout=" prev, pager, next, sizes, jumper" :total="total" :page-count="pages"
                       style="float:right;">
        </el-pagination>
      </el-col>
    </div>
    </div>
</template>

<script>

export default {
  name: 'Admin',
  /* data声明变量 这里声明的变量就可以双向绑定 */
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      adminName: '',
      adminList: [],
      pages: 1,
      total: 1, // 总共有多少条数据
      multipleSelection: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get('/back/admin/adminList', {
        params: {
          pageIndex: this.pageIndex, // 参数，键值对，key值：value值
          pageSize: this.pageSize,
          adminName: this.adminName
        }
      })
        .then(res => {
          if (res.data.code === 1) {
            this.adminList = res.data.adminList
            this.total = res.data.total
            this.pages = res.data.Pages
            console.log(this.adminList)
          }
        })
    },
    search () {
      this.init()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.init()
    }

  }
}
</script>

<style scoped>

</style>
