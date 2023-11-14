import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const AXIOS = {
  ENCODE_FORM_DATA: (data: any) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    return formData;
  },
  
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

  POST: async (uri: string, params: object, token?: string | undefined) => {
    try {
      const res = await API.post(uri, AXIOS.ENCODE_FORM_DATA(params), {
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

  PUT: async (uri: string, params: object, token?: string | undefined) => {
    try {
      const res = await API.put(uri, AXIOS.ENCODE_FORM_DATA(params), {
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

  PATCH: async (uri: string, params: object, token?: string | undefined) => {
    try {
      const res = await API.patch(uri, AXIOS.ENCODE_FORM_DATA(params), {
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

  DELETE: async (uri: string, params: object, token?: string | undefined) => {
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
