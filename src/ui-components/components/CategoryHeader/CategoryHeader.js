import React from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import jsonMetrics from "../../json/analyse_metrics.json";
import "./CategoryHeader.css";

export default function CategoryHeader(props) {
  const { selectedScreen, onChange } = props;

  function categoryChangeHandler(objItem) {
    onChange(objItem);
  }

  return (
    <div className="categry-header">
      <span className="category-header-label">Create reports</span>
      <div className="category-header-list">
        {jsonMetrics.createOptions.map((objItem, index) => {
          return (
            <CategoryCard
              selected={objItem.value === selectedScreen}
              key={objItem.value}
              data={objItem}
              index={index}
              onChange={categoryChangeHandler}
            />
          );
        })}
      </div>
    </div>
  );
}
