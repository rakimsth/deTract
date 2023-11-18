import { useState } from "react";

import instance from "../utils/api";

export const usePapers = () => {
  const [loading, setLoading] = useState(false);

  const fetchDetail = async (id) => {
    try {
      setLoading(true);
      const result = await instance.post(`/get-paper`, { paper_id: id });
      return result;
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };
  return { fetchDetail, loading };
};
