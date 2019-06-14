<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item">{{item}}</a>
      </dd>
    </dl>
    <dl v-for="item in blocks" :key="item.title" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="(subitem,index) in item.city" :key="index">{{subitem}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data(){
    return {
      list:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
      blocks:[]
    }
  },
  async mounted() {
    const blocks = []
    const {status,data:{cities}} = await this.$axios.get('/geo/cities')
    if (status === 200) {
      let p
      let c
      let d = {}
      cities.forEach(item => {
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
        c = p.charCodeAt(0)
        if (c > 96 && c < 123) {
          if (!d[p]) {
            d[p] = []
          }
          d[p].push(item.name)
        }
      })

      for (const [k,v] of Object.entries(d)){
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }

      // 排序
      blocks.sort((a,b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      this.blocks = blocks
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/changecity/category.scss';
</style>

