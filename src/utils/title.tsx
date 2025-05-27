import { useEffect } from "react";

const useSiteTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useSiteTitle;
