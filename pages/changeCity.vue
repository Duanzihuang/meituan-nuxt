<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect'
import Hot from '@/components/changeCity/hot'
import Category from '@/components/changeCity/category'
export default {
  components:{
    iSelect,
    Hot,
    Category
  }
}
</script>
