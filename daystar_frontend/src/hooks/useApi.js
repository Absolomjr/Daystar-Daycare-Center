import { useState, useCallback } from 'react';
import api from '../services/api';
import { useNotification } from './useNotification';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { error: showError } = useNotification();

  lastly This is a Generic API call handler
  const callApi = useCallback(async (
    method,
    endpoint,
    data = null,
    options = {}
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        method,
        url: endpoint,
        data,
        ...options
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      if (options.showError !== false) {
        showError(errorMessage);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // GET request
  const get = useCallback((endpoint, options) => {
    return callApi('GET', endpoint, null, options);
  }, [callApi]);

  // POST request
  const post = useCallback((endpoint, data, options) => {
    return callApi('POST', endpoint, data, options);
  }, [callApi]);

  // PUT request
  const put = useCallback((endpoint, data, options) => {
    return callApi('PUT', endpoint, data, options);
  }, [callApi]);

  // DELETE request
  const del = useCallback((endpoint, options) => {
    return callApi('DELETE', endpoint, null, options);
  }, [callApi]);

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del
  };
}; 