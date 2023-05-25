import { useState } from "react";

function useFetch(url, config) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const callApi = async () => {
    setIsLoading(true);
    const response = await fetch(url, config);
    const responseJson = await response.json();
    setData(responseJson);
    setIsLoading(false);
  };
  return [isLoading, data, callApi];
}

export default useFetch;
