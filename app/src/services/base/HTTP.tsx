import axios from "axios";
import { toast } from "react-toastify";
import HttpMethod from "../../constants/HttpMethod";

const Axios = (function () {
  let instance: any;

  function createInstance() {
    return axios.create({ baseURL: "http://localhost:8082/api" });
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      if (getToken() !== "Bearer null") {
        instance.defaults.headers.common["Authorization"] = getToken();
      }
      instance.all = axios.all;

      return instance;
    },
  };
})();

export function makeParametersList(parameters: any) {
  let parametersList = "?";

  Object.keys(parameters).map(
    (key, index) =>
      (parametersList += parameters[key] ? `${key}=${parameters[key]}&` : "")
  );

  return parametersList === "?"
    ? ""
    : parametersList.slice(0, parametersList.length - 1);
}

export function getToken() {
  return "Bearer " + localStorage.getItem("token");
}

export function getUserFromLocalStorage() {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
