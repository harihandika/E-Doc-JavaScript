import { useState, useEffect } from "react";
import { App } from "antd";
import { axiosInstance } from "@/apis";
import { config } from "@/configs";

const useAxios = (showMessage = false) => {
  const { message } = App.useApp();
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObject) => {
    const { method, url, queryParams = {}, payload = {} } = configObject;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const res = await axiosInstance(queryParams)[method.toLowerCase()](
        url,
        payload
      );

      setResponse(res?.data[0]);
      setIsSuccess(true);
      setIsError(false);
      setError({});

      if (showMessage) message.success(res?.data[0]?.message);
      if (config.nodeEnv === "development")
        console.log(`[Response ${method.toUpperCase()}] =>`, res?.data[0]);
    } catch (err) {
      setResponse({});
      setIsSuccess(false);
      setIsError(true);
      setError(err?.response?.data[0]);

      if (showMessage) message.error(err?.response?.data[0]?.message);
      if (config.nodeEnv === "development")
        console.error(
          `[Error ${method.toUpperCase()}] =>`,
          err?.response?.data[0]
        );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return {
    axiosFetch,
    loading,
    response,
    isSuccess,
    error,
    isError,
    controller,
  };
};

export default useAxios;
