import { useEffect, useState } from "react";
import { ImageList } from "./components/ImageList/ImageList";
import s from "./App.module.css";
import { useScrollPosition } from "./hooks/useScrollPosition";
import axios from "axios";

export function App() {
  const [imageList, setImageList] = useState([]);
  const { isBottom } = useScrollPosition();
  const [pageToFetch, setPageToFetch] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImagesByPage(pageToFetch);
  }, [pageToFetch]);

  useEffect(() => {
    if (isBottom) {
      increasePage();
    }
  }, [isBottom]);

  const fetchImagesByPage = async (pageNumber) => {
    setIsLoading(true);
    const { data } = await axios(
      `https://picsum.photos/v2/list?page=${pageNumber}&limit=5`
    );
    setImageList([...imageList, ...data]);
  };

  const increasePage = () => {
    setPageToFetch(pageToFetch + 1);
  };

  return (
    <div className={s.root}>
      <h1>RandomPic</h1>
      <h2>Download random images!</h2>
      <ImageList imageList={imageList} />
      {isLoading && <div className="spinner-border" role="status"></div>}
    </div>
  );
}
