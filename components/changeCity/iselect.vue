<template>
  <div class="m-iselect">
    <span>按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in provinces" :key="item.id"
      :label="item.value" :value="item.id">
      </el-option>
    </el-select>&nbsp;&nbsp;&nbsp;
    <el-select v-model="cvalue" :disabled="pcities.length === 0" placeholder="城市">
      <el-option v-for="item in pcities" :key="item.id"
      :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <span style="margin-left:100px;">直接搜索：</span>
    <el-autocomplete
      v-model="keyword"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data(){
    return {
      pvalue:'',
      cvalue:'',
      keyword:'',
      provinces:[],//省份
      pcities:[], //当前省份下的城市
      allcities:[] // 全国所有的城市
    }
  },
  watch:{
    pvalue:async function(newVal){
      const {status,data:{results}} = await this.$axios.get(`/geo/cities/${newVal}`)

      this.pcities = results.value
    }
  },
  async mounted(){
    const {status,data:{provinces}} = await this.$axios.get('/geo/provinces')

    this.provinces = provinces
  },
  methods:{
    querySearchAsync:_.debounce(async function(query,cb){
      if (this.allcities.length > 0) {
        // 只有执行回调，才能在远程框中显示内容
        // 并且过滤的数据中元素必须要有value属性，这个是规定
        cb(this.allcities.filter(item => item.value.includes(query)))
      } else {
        // 发送网络请求
        const {status,data:{cities}} = await this.$axios.get('/geo/cities')

        if (status === 200) {
          // 给allcities赋值
          this.allcities = cities.map(item => {
            return {value:item.name}
          })

          cb(this.allcities.filter(item => item.value.includes(query)))
        } else {
          cb([])
        }
      }
    },300),
    handleSelect(){

    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss";
</style>

