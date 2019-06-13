<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="focus" @input="input" @blur="blur" placeholder="搜索商家或地点"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="item in $store.getters['geo/getHotPlace']" :key="item.id">{{item.name}}</dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="item in searchList" :key="item.name">{{item.name}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="">故宫博物院</a>
          <a href="">故宫博物院</a>
          <a href="">故宫博物院</a>
          <a href="">故宫博物院</a>
          <a href="">故宫博物院</a>
          <a href="">故宫博物院</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/takeout" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/movie" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/hotel" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/apartment" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/business" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"/><p class="txt">随时退</p></li>
          <li><i class="single"/><p class="txt">不满意免单</p></li>
          <li><i class="overdue"/><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data(){
    return {
      isFocus:false,
      search:'',
      searchList:[]
    }
  },
  computed:{
    isHotPlace(){
      return this.isFocus && !this.search
    },
    isSearchList(){
      return this.isFocus && this.search
    }
  },
  methods:{
    focus(){
      this.isFocus = true
    },
    blur(){
      this.isFocus = false
    },
    input:_.debounce(async () => {
      const {status,data:{results}} = await this.$axios.get('/search/top',{
        params:{
          name:this.search,
          city:this.$store.getters['geo/getCity']
        }
      })

      this.searchList = results
    })
  }
}
</script>
