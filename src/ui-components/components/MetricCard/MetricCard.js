import React, { useEffect, useState } from "react";
import "./MetricCard.css";

export default function MetricCard(props) {
  const { data, selected, onChange } = props;
  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  function clickHandler(event) {
    if (!checked) {
      setChecked(true);
      onChange({ selected: true, data: data });
    }
  }

  let strBaseClass = "metric-card";
  if (checked) {
    strBaseClass += " metric-card-selected";
  }

  return (
    <div className={strBaseClass} onClick={clickHandler}>
      <span className="metric-card-image-container">
        <img alt="" src={data?.image} className="metric-card-image" />
      </span>
      <span className="metric-card-name">{data?.name}</span>
    </div>
  );
}
