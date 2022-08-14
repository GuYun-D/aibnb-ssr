<template>
  <div>
    <div v-for="item in list" :key="item.id">{{ item.goods_name }}</div>
  </div>
</template>

<script setup>
// 异步获取数据的方法
const res = await useAsyncData('count', () => $fetch('https://apiv2.pinduoduo.com/api/gindex/tf/query_tf_goods_info?tf_id=TFRQ0v00000Y_13396&page=1&size=50'))
const list = res.data.value.result
console.log(list);
</script>

<style lang="scss" scoped>
</style>