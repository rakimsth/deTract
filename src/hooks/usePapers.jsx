import { useState, useCallback } from "react";

import instance from "../utils/api";

export const usePapers = () => {
  const [loading, setLoading] = useState(false);

  const fetchDetail = useCallback(async (id) => {
    try {
      setLoading(true);
      const result = await instance.post(`/get-paper`, { paper_id: id });
      return result;
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const upload = async (payload) => {
    try {
      setLoading(true);
      const result = await instance.post(`/upload`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result;
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return { fetchDetail, upload, loading };
};
