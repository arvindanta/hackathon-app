import React, { useState } from "react";
import "./CategoryCard.css";

export default function CategoryCard(props) {
  const { data, selected, onChange } = props;
  const [checked, setChecked] = useState(selected);

  function clickHandler(event) {
    if (!checked) {
      setChecked(true);
      onChange({ selected: true, data: data });
    }
  }

  const styleImage = {
    backgroundColor: data?.bgColor,
  };

  let strBaseClass = "category-card";
  if (checked) {
    strBaseClass += " category-card-selected";
  }

  return (
    <div className={strBaseClass} onClick={clickHandler}>
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
