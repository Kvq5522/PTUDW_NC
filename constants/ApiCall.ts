import axios from "axios";

let token = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem("token") || "";
}

console.log(typeof window);

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const AXIOS = {
  GET: async (uri: string, params: object, token: string) => {
    try {
      const res = await API.get(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: params,
      });

      return res;
    } catch (err) {
      return err;
    }
  },

  POST: async (uri: string, params: object, token: string) => {
    try {
      const res = await API.post(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: params,
      });

      return res;
    } catch (error) {
      return error;
    }
  },

  PUT: async (uri: string, params: object, token: string) => {
    try {
      const res = await API.put(uri, params);

      return res;
    } catch (error) {
      return error;
    }
  },

  PATCH: async (uri: string, params: object, token: string) => {
    try {
      const res = await API.patch(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: params,
      });

      return res;
    } catch (error) {
      return error;
    }
  },

  DELETE: async (uri: string, params: object, token: string) => {
    try {
      const res = await API.delete(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: params,
      });

      return res;
    } catch (error) {
      return error;
    }
  },
};
