<template>
  <div>
    {{ t("message.home") }}
    <el-button>我们的爱</el-button>

    <div style="width: 50px" class="text">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat sit
      nihil, labore incidunt aut earum perferendis eligendi. Excepturi accusamus
      omnis laborum sapiente tenetur. Maiores, eum quam. Ea fugit blanditiis
      architecto?
    </div>

    <el-date-picker v-model="value1"></el-date-picker>
  </div>
</template>

<script setup lang="ts">
import { h, getCurrentInstance, ref } from "vue";
import { useI18n } from "vue-i18n";
const value1 = ref();
import IndexedDB from "../../utils/indexedDB";

const { t } = useI18n();
const airbnDB = new IndexedDB("aribnb");
airbnDB.openStore("room", "id", ["name", "age", "gender", "hobbies"]);

const { proxy }: any = getCurrentInstance();
proxy.$message({
  message: h("p", null, "你好啊兄嘚"),
});
</script>

<style scoped lang="scss">
@import "../../assets/scss/home/index.scss";
</style>
