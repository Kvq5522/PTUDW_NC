import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const AXIOS = {
  GET: async (uri: string, params: object, token?: string) => {
    try {
      const res = await API.get(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: params,
      });

      return res.data;
    } catch (err: any) {
      return err.response.data;
    }
  },

  POST: async (uri: string, params: object, token?: string) => {
    try {
      const res = await API.post(uri, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  PUT: async (uri: string, params: object, token?: string) => {
    try {
      const res = await API.put(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: params,
      });

      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  PATCH: async (uri: string, params: object, token?: string) => {
    try {
      const res = await API.patch(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: params,
      });

      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  DELETE: async (uri: string, params: object, token?: string) => {
    try {
      const res = await API.delete(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: params,
      });

      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
};
