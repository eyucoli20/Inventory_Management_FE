import { useQuery } from "react-query";
import axios from "axios";

const fetchData = async (endpoint) => {
  const config = {
    headers: {},
  };

  try {
    const response = await axios.get(endpoint, config);
    if (response.status === 404) {
        throw await response.json();
      }
    return response.data;
  } catch (error) {
    
    throw error.response.data.message;
  }
};

const useGet = (endpoint) => {
  return useQuery([endpoint], () => fetchData(endpoint));
};

export default useGet;
