import axios from "axios";
import { toast } from "react-toastify";
import HttpMethod from "../../constants/HttpMethod";

const Axios = (function () {
  let instance: any;

  function createInstance() {
    return axios.create({ baseURL: "http://localhost:8084/api" });
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

export async function requestAcc(
  url: any,
  data = [],
  method = HttpMethod.GET,
  options = {}
) {
  try {
    return await connect(url, data, method, options);
  } catch {}
}

export async function connect(
  url: string,
  data: any,
  method: string,
  options: any
) {
  switch (method) {
    case HttpMethod.GET: {
      return await Axios.getInstance().get(url, options);
    }
    case HttpMethod.POST: {
      return await Axios.getInstance().post(url, data, options);
    }
    case HttpMethod.PUT: {
      return await Axios.getInstance().put(url, data, options);
    }
    case HttpMethod.DELETE: {
      return await Axios.getInstance().delete(url, options);
    }
    default: {
      return null;
    }
  }
}
