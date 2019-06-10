<template>
  <div class="m-geo">
    <i class="el-icon-search"/>
    <span>
      <!-- {{$store.state.geo.position.city}} -->
      {{$store.getters['geo/getCity']}}
    </span>
    <nuxt-link to="">切换城市</nuxt-link>
    [香河 廊坊 天津]
  </div>
</template>
