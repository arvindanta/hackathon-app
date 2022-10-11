import React from "react";
import "./CategoryCard.css";

export default function CategoryCard(props) {
  const { data } = props;
  const styleImage = {
    backgroundColor: data?.bgColor,
  };

  let strBaseClass = "category-card";
  if (data?.selected) {
    strBaseClass += " category-card-selected";
  }

  return (
    <div className={strBaseClass}>
      <span className="category-card-image-container" style={styleImage}>
        <img alt="" src={data?.image} className="category-card-image" />
      </span>
      <span className="category-card-footer">
        <span className="category-card-name">{data?.name}</span>
        <span className="category-card-desc">{data?.description}</span>
      </span>
    </div>
  );
}
