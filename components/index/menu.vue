<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="item in menus" :key="item.type" @mouseenter="mouseenter">
        <i :class="item.type"/>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="enter" @mouseleave="leave">
      <div v-for="item in currentDetail.children" :key="item.title">
        <h4>{{item.title}}</h4>
        <span v-for="subitem in item.children" :key="subitem">{{subitem}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind:'', // 类型
      menus: [
        {
          type: 'food',
          name: '美食',
          children: [
            {
              title: '美食',
              children: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          children: [
            {
              title: '外卖',
              children: ['美团外卖']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          children: [
            {
              title: '酒店星级',
              children: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
            }
          ]
        }
      ]
    }
  },
  computed:{
    currentDetail(){
      return this.menus.filter(item => item.type === this.kind)[0] || {}
    }
  },
  methods:{
    mouseleave(){
      this.timer = setTimeout(() => {
          this.kind = ''
      }, 150)
    },
    mouseenter(e){
      this.kind = e.target.querySelector('i').className
    },
    enter(){
      clearTimeout(this.timer)
    },
    leave(){
      this.kind = ''
    }
  }
}
</script>
