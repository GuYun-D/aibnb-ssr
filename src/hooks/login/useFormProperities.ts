import { reactive, ref } from "vue";

interface IRuleForm {
  mobile: string;
  password: string;
}

export default (t: any) => {
  const activeName = ref<string>("login");
  const formRef = ref();
  const loginText = ref<string>("Log in Airbnb");
  const loginModel: IRuleForm = reactive({
    mobile: "",
    password: "",
  });

  const rules = reactive({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t("login.placeMobile"),
        trigger: "blur",
      },
    ],

    password: [
      {
        required: true,
        min: 6,
        max: 12,
        message: t("login.placePass"),
        trigger: "blur",
      },
    ],
  });

  return {
    activeName, loginText, loginModel, formRef, rules
  }
}


