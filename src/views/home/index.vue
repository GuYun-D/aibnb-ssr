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

    <el-button type="primary" @click="addDB">设置</el-button>
    <el-button type="danger" @click="deleteDB">删除</el-button>
    <el-button type="danger" @click="getList">查询</el-button>
    <el-button type="danger" @click="getItem('room', 2)">查询某一条</el-button>

    <el-date-picker v-model="value1"></el-date-picker>
  </div>
</template>

<script setup lang="ts">
import { h, getCurrentInstance, ref } from "vue";
import { useI18n } from "vue-i18n";
const value1 = ref();
import IndexedDB from "../../utils/indexedDB";
import { fetchRoom } from "../../api/index";

const { t } = useI18n();
const airbnbDB = new IndexedDB("aribnb");
airbnbDB.openStore("room", "id", ["name", "age", "gender"]);

const addDB = () => {
  airbnbDB.updateItem("room", {
    id: 1,
    name: "刘能",
    age: 19,
    gender: "男",
  });
};

const deleteDB = (storeName: string, key: string | number) => {
  airbnbDB.deleteItem("room", 1);
};

const getList = (storeName: string) => {
  fetchRoom().then((res) => {
    console.log(res);
  });
};

const getItem = (storeName: string, key: string | number) => {
  airbnbDB.getItem(storeName, key);
};

const { proxy }: any = getCurrentInstance();
proxy.$message({
  message: h("p", null, "你好啊兄嘚"),
});
</script>

<style scoped lang="scss">
@import "../../assets/scss/home/index.scss";
</style>
