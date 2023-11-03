import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../constant";
const postData = async (endpoint, data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`${baseURL}${endpoint}`, data, config);
    if (response.status === 409) {
        throw await response.json();
      }
    return response;
  } catch (error) {
    throw error;
  }
};

const usePost = (endpoint) => {
  const queryClient = useQueryClient();
  const makeRequest = async (data) => {
    return await postData(endpoint, data);
  };

  return useMutation(makeRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([endpoint]);
    },
  });
};

export default usePost;
