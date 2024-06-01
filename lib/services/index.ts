import axios from "axios";
import { S3_URL } from "@constants/api-routes";

export const APIFetcher = async (url: any) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const APIPromiseFetcher = async (data: any) => {
  const promiseData = [];
  for (let i = 0; i < data.length; i++) {
    promiseData.push(axios.get(data[i]));
  }
  return await Promise.all(promiseData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const APIUpdater = async (url: any, data: any) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const APIRemover = async (url: any) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const APIPostFetcher = async (url: any) => {
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const APIPostFetcherWithData = async (url: any, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const UploadS3File = async (data: any) => {
  try {
    const response = await axios.post(S3_URL, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};