import React, { useState } from "react";
import { FwButton } from "@freshworks/crayons/react";

import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";
import MetricCard from "../../components/MetricCard/MetricCard";
import MetricAnalyseCard from "../../components/MetricAnalyseCard/MetricAnalyseCard";
import jsonMetrics from "../../json/analyse_metrics.json";
import "./MetricsScreen.css";

export default function MetricsScreen(props) {
  const { selectedScreen, onChange } = props;

  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedRelatedMetrics, setSelectedRelatedMetrics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    jsonMetrics.metricCategories[0].value
  );

  function createReportHandler() {
    onChange("GENERATE", {
      selectedCategory: selectedCategory,
      selectedMetrics: selectedMetrics,
      selectedRelatedMetrics: selectedRelatedMetrics,
    });
  }

  function skipReportHandler() {
    onChange("SKIP");
  }

  function categoryChangeHandler(objItem) {
    onChange("CATEGORY_CHANGE", objItem);
  }

  function metricTypeChangeHandler(objItem) {
    setSelectedCategory(objItem.data.value);
    setSelectedMetrics([]);
    setSelectedRelatedMetrics([]);
  }

  function metricAnalysisChangeHandler(objItem) {
    const strSelectedMetricValue = objItem.data.value;
    const boolSelected = objItem.selected;

    if (!selectedMetrics || selectedMetrics.length === 0) {
      if (boolSelected) {
        setSelectedMetrics([strSelectedMetricValue]);
      }
    } else {
      if (boolSelected) {
        if (!selectedMetrics.includes(strSelectedMetricValue)) {
          setSelectedMetrics([...selectedMetrics, strSelectedMetricValue]);
        }
      } else {
        const arrDeletedSelections = selectedMetrics.filter(
          (e) => e !== strSelectedMetricValue
        );
        setSelectedMetrics(arrDeletedSelections);
      }
    }
  }

  function relatedMetricAnalysisChangeHandler(objItem) {
    const strSelectedMetricValue = objItem.data.value;
    const boolSelected = objItem.selected;

    if (!selectedRelatedMetrics || selectedRelatedMetrics.length === 0) {
      if (boolSelected) {
        setSelectedRelatedMetrics([strSelectedMetricValue]);
      }
    } else {
      if (boolSelected) {
        if (!selectedRelatedMetrics.includes(strSelectedMetricValue)) {
          setSelectedRelatedMetrics([
            ...selectedRelatedMetrics,
            strSelectedMetricValue,
          ]);
        }
      } else {
        const arrDeletedSelections = selectedRelatedMetrics.filter(
          (e) => e !== strSelectedMetricValue
        );
        setSelectedRelatedMetrics(arrDeletedSelections);
      }
    }
  }

  return (
    <div className="metric-screen">
      <CategoryHeader
        selectedScreen={selectedScreen}
        onChange={categoryChangeHandler}
      />
      <div className="metric-screen-scrollable-content">
        <div className="metric-screen-metric-type">
          <span className="metric-screen-metric-type-header">
            What do you want to create the report for?
          </span>
          <span className="metric-screen-metric-type-desc">
            Choose to see the relevant metrics for each category
          </span>
          <div className="metric-screen-metric-type-list">
            {jsonMetrics.metricCategories.map((objItem, index) => {
              return (
                <MetricCard
                  selected={objItem.value === selectedCategory}
                  key={objItem.value}
                  data={objItem}
                  index={index}
                  onChange={metricTypeChangeHandler}
                />
              );
            })}
          </div>
        </div>
        <div className="metric-screen-metric-type">
          <span className="metric-screen-metric-type-header">
            What do you want to create the report for?
          </span>
          <span className="metric-screen-metric-type-desc">
            Choose to see the relevant metrics for each category
          </span>
          <div className="metric-screen-analyse-type-list">
            {jsonMetrics.analyseCategories[selectedCategory]?.metrics.map(
              (objItem, index) => {
                return (
                  <MetricAnalyseCard
                    key={objItem.value}
                    data={objItem}
                    index={index}
                    selected={selectedMetrics?.includes(objItem.value)}
                    onChange={metricAnalysisChangeHandler}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="metric-screen-metric-type metric-screen-related-type">
          <span className="metric-screen-metric-type-header">
            Related metrics
          </span>
          <div className="metric-screen-analyse-type-list">
            {jsonMetrics.analyseCategories[selectedCategory]?.related.map(
              (objItem, index) => {
                return (
                  <MetricAnalyseCard
                    key={objItem.value}
                    data={objItem}
                    index={index}
                    selected={selectedRelatedMetrics?.includes(objItem.value)}
                    onChange={relatedMetricAnalysisChangeHandler}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className="metric-screen-footer">
        <FwButton onFwClick={createReportHandler}>Create Report</FwButton>
        <FwButton color="secondary" onFwClick={skipReportHandler}>
          Skip
        </FwButton>
      </div>
    </div>
  );
}
