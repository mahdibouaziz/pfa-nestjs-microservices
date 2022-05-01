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
    console.log(error);
    throw error;
  }
};

export const postRequest = async (
  url: string,
  data = {},
  authorization = {},
) => {
  return await request('post', url, data, authorization);
};

export const getRequest = async (url: string, authorization = {}) => {
  return await request('get', url, {}, authorization);
};

export const deleteRequest = async (
  url: string,
  data = {},
  authorization = {},
) => {
  return await request('delete', url, data, authorization);
};

export const putRequest = async (
  url: string,
  data = {},
  authorization = {},
) => {
  return await request('put', url, data, authorization);
};
