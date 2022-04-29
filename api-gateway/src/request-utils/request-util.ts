import axios, { Method } from 'axios';

export const request = async (
  method: Method,
  url: string,
  data = {},
  authorization,
) => {
  let headers = {};

  if (authorization) {
    headers = {
      authorization,
    };
  }
  try {
    const response = await axios.request({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const post = async (url: string, data = {}, authorization) => {
  return await request('post', url, data, authorization);
};

export const get = async (url: string, authorization) => {
  return await request('get', url, {}, authorization);
};

export const put = async (url: string, data = {}, authorization) => {
  return await request('put', url, data, authorization);
};
