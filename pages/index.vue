<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu />
      </el-col>
      <el-col :span="19">
        <life />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <artistic />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from '../components/index/menu'
import Life from '../components/index/life'
import Artistic from '../components/index/artistic'
export default {
  components: {
    Emenu,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
  @import  "@/assets/css/index/index.scss";
</style>

