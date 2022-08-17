<template>
  <div class="header-common">
    <img class="logo" src="../assets/images/layout/logo.webp" alt="logo" />
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">{{ t("header.orders") }}</el-menu-item>
      <el-menu-item index="records">{{ t("header.records") }}</el-menu-item>

      <el-sub-menu index="language">
        <template #title>{{ t("header.language") }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="avatar"
        ><img
          class="avatar"
          src="../assets/images/layout/avatar.webp"
          alt="个人中心"
        />
      </el-menu-item>

      <el-menu-item index="login">
        {{ t("login.loginTab") }} / {{ t("login.signTab") }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { saveLanguageApi, fetchLanguageApi } from "../api/layout/index";
import router from "../router";
const activeIndex = ref("orders");

const { t } = useI18n();

const emites = defineEmits<{
  (e: "change-lang", lang: any): void;
}>();

const handleSelect = (select: string) => {
  if (select === "zh") {
    emites("change-lang", zhCn);
    saveLanguage("zh");
  } else if (select === "en") {
    emites("change-lang", en);
    saveLanguage("en");
  } else if (select === "login") {
    router.push("/login");
  }
};

/**
 * @description 保存语言包
 */
const saveLanguage = (lang: any) => {
  saveLanguageApi(lang).then((res) => {
    let { success } = res;
    if (success) {
      console.log("保存成功");
    }
  });
};

const fetchLanguage = () => {
  fetchLanguageApi().then((res) => {
    let { success, result } = res;
    let { name } = result;
    if (success) {
      if (name === "zh") {
        emites("change-lang", zhCn);
      } else {
        emites("change-lang", en);
      }

      console.log("当前语言包获取成功");
    }
  });
};

// fetchLanguage();
</script>

<style lang="scss" scoped>
@import "../assets/scss/layout/index.scss";
</style>