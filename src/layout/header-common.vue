<template>
  <div class="header-common">
    <img class="logo" src="../assets/images/layout/logo.webp" alt="logo" />
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">房屋订单中心</el-menu-item>
      <el-menu-item index="records">历史足迹</el-menu-item>

      <el-sub-menu index="language">
        <template #title>国际化切换</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">英文</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="avatar"
        ><img
          class="avatar"
          src="../assets/images/layout/avatar.webp"
          alt="个人中心"
        />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

const activeIndex = ref("orders");

const emites = defineEmits<{
  (e: "change-lang", lang: any): void;
}>();

const handleSelect = (select: string) => {
  if (select === "zh") {
    emites("change-lang", zhCn);
  } else {
    emites("change-lang", en);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/layout/index.scss";
</style>