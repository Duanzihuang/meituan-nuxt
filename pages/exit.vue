<template>
  <div></div>
</template>

<script>
export default {
  middleware:async ctx => {
    const {status,data:{code}} = await ctx.$axios.get('/users/exit')

    if (status === 200 && code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
