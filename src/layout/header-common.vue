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

      <el-sub-menu index="avatar" v-if="userStatus == '1'">
        <template #title>
          <img
            class="avatar"
            src="../assets/images/layout/avatar.webp"
            alt="个人中心"
        /></template>
        <el-menu-item index="logout">退出登录</el-menu-item>
      </el-sub-menu>
      <!-- <el-menu-item index="avatar"> </el-menu-item> -->

      <el-menu-item index="login" v-else>
        {{ t("login.loginTab") }} / {{ t("login.signTab") }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "../store";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { saveLanguageApi, fetchLanguageApi } from "../api/layout/index";
import router from "../router";
import { IResultOr } from "../api/interface";
import { userLogoutApi } from "../api/login";

const activeIndex = ref("orders");
const store = useStore();
const { t } = useI18n();
const { proxy }: any = getCurrentInstance();
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
  } else if (select === "logout") {
    userLogout();
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

const userStatus = localStorage.getItem("userStatus");

/**
 * @description 退出登录
 */
const userLogout = () => {
  userLogoutApi().then((res: IResultOr) => {
    const { message, success, result, code } = res;
    if (code == "000005") {
      proxy.$message.error(message);
      router.push("/login");
      return;
    }

    if (success) {
      router.push("/login");
      localStorage.setItem("userStatus", "0");
      proxy.$message.success(message);
    } else {
      proxy.$message.error(message);
    }
  });
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/layout/index.scss";
</style>