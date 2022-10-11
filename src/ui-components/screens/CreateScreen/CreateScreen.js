import React from "react";
import CategoryThumbnail from "../../components/CategoryThumbnail/CategoryThumbnail";
import jsonMetrics from "../../json/analyse_metrics.json";
import "./CreateScreen.css";

export default function CreateScreen(props) {
  const { onChange } = props;

  function changeHandler(objItem) {
    onChange(objItem);
  }

  return (
    <div className="create-screen">
      <span className="create-screen-header">Create reports</span>
      <div className="create-screen-content">
        {jsonMetrics.createOptions.map((objItem, index) => {
          return (
            <CategoryThumbnail
              key={objItem.value}
              data={objItem}
              index={index}
              onChange={changeHandler}
            />
          );
        })}
      </div>
    </div>
  );
}
