<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="item in $store.getters['city/getHotCity']" :key="item.id">
        {{item.name === '市辖区' ? item.province.replace('市','') : item.name.replace('市','')}}
      </dd>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/css/changeCity/hot.scss";
</style>

