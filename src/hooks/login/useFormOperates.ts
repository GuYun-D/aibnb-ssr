import { getCurrentInstance } from 'vue'
import { IResultOr } from "../../api/interface";
import { userSignApi, userLoginApi } from "../../api/login/index";

interface IRuleForm {
  mobile: string;
  password: string;
}

export default (router: any, params: IRuleForm) => {
  const { proxy }: any = getCurrentInstance()
  /**
 * @description 注册
 */
  const userSign = (params: IRuleForm) => {
    userSignApi(params).then((res: IResultOr) => {
      console.log(res);
      const { success, message } = res;
      if (success) {
        proxy.$message.success(message);
      } else {
        proxy.$message.error(message);
      }
    });
  };

  /**
   * @description 注册接口
   * @param params 
   */
  const userLogin = (params: IRuleForm) => {
    userLoginApi(params).then((res: IResultOr) => {
      const { message, success, result } = res;

      if (success) {
        localStorage.setItem("userStatus", result.status);
        router.push("/home");
        proxy.$message.success(message);
      } else {
        proxy.$message.error(message);
      }
    });
  };

  return [userLogin, userSign]
}