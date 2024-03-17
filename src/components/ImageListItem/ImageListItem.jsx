import "./ImageListItem.css";
import { saveAs } from "file-saver";

export function ImageListItem({ img }) {
  const downloadImage = async () => {
    const imageRes = await fetch(img.download_url);
    const imageBlob = await imageRes.blob();
    saveAs(imageBlob, img.author + "_" + img.id);
  };
  return (
    <div className="card">
      <a href={img.url}>
        <img src={img.download_url} className="img" alt="Card" />
      </a>
      <div className="card_banner">
        <img src={img.download_url} className="card_thumb" alt="Thumbnail" />
        <div className="card_text">
          <h3 className="card_title">{img.author}</h3>
          <div className="card_subtitle">
            Original size: {img.height} x {img.width} px
          </div>
          <button onClick={downloadImage}>Download</button>
        </div>
      </div>
    </div>
  );
}
