import React from "react";
import "./CategoryThumbnail.css";

export default function CategoryThumbnail(props) {
  const { data } = props;
  const styleThumbnail = {
    backgroundColor: data?.bgColor,
  };

  return (
    <div className="category-thumbnail">
      <span
        className="category-thumbnail-image-container"
        style={styleThumbnail}
      >
        <img alt="" src={data?.image} className="category-thumbnail-image" />
      </span>
      <span className="category-thumbnail-footer">
        <span className="category-thumbnail-name">{data?.name}</span>
        <span className="category-thumbnail-desc">{data?.description}</span>
      </span>
    </div>
  );
}
