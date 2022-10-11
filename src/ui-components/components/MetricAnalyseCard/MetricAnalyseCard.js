import React, { useEffect, useState } from "react";
import "./MetricAnalyseCard.css";

export default function MetricAnalyseCard(props) {
  const { data, selected, onChange } = props;
  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  function clickHandler(event) {
    const boolSelected = !checked;
    setChecked(boolSelected);
    onChange({ selected: boolSelected, data: data });
  }

  let strBaseClass = "metric-analyse-card";
  if (checked) {
    strBaseClass += " metric-analyse-card-selected";
  }

  return (
    <div className={strBaseClass} onClick={clickHandler}>
      {data?.name}
    </div>
  );
}
