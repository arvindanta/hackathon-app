import React, { useState, useEffect } from "react";
import {
  FwButton,
  FwModal,
  FwModalTitle,
  FwModalContent,
  FwModalFooter,
} from "@freshworks/crayons/react";

import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";
import MetricCard from "../../components/MetricCard/MetricCard";
import MetricAnalyseCard from "../../components/MetricAnalyseCard/MetricAnalyseCard";
import jsonMetrics from "../../json/analyse_metrics.json";
import "./MetricsScreen.css";

export default function MetricsScreen(props) {
  const { selectedScreen, onChange } = props;

  const [modalData, setModalData] = useState({ open: false });
  const [selectedMetrics, setSelectedMetrics] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Structure of selectedMetrics to be set as
  // {
  //   "category1":{direct:["ticket_1", "ticket_2"], related:["relTicket_1"]},
  //   "category2":{direct:["contact_2"], related:[]},
  // }

  useEffect(() => {
    const objInitialState = {};
    const arrCategories = jsonMetrics.metricCategories;
    const intLength = arrCategories.length;
    for (let i1 = 0; i1 < intLength; i1++) {
      objInitialState[arrCategories[i1].value] = { direct: [], related: [] };
    }
    setSelectedMetrics(objInitialState);
  }, []);

  function createReportHandler() {
    onChange("GENERATE", {
      selectedMetrics: selectedMetrics,
    });
  }

  function skipReportHandler() {
    onChange("SKIP");
  }

  function categoryChangeHandler(objItem) {
    onChange("CATEGORY_CHANGE", objItem);
  }

  function closeModalHandler(event) {
    setModalData({ open: false });
  }

  function submitModalHandler(event) {
    const strCategory = modalData.category;
    setSelectedMetrics((prevState) => {
      prevState[strCategory] = { direct: [], related: [] };
      return {
        ...prevState,
      };
    });

    const arrDeletedSelections = selectedCategories.filter(
      (e) => e !== strCategory
    );
    setSelectedCategories([...arrDeletedSelections]);
    setModalData({ open: false });
  }

  function isMetricsPresentForCategory(strCategory) {
    const boolCategoryMetricsAdded =
      selectedMetrics &&
      Object.prototype.hasOwnProperty.call(selectedMetrics, strCategory);

    if (
      boolCategoryMetricsAdded &&
      (selectedMetrics[strCategory].direct?.length > 0 ||
        selectedMetrics[strCategory].related?.length > 0)
    ) {
      return true;
    }
    return false;
  }

  function metricTypeChangeHandler(objItem) {
    const boolSelected = objItem.selected;
    const strSelCategory = objItem.data.value;

    if (boolSelected) {
      if (!selectedCategories.includes(strSelCategory)) {
        setSelectedCategories([...selectedCategories, strSelCategory]);
      }
    } else {
      if (!selectedCategories || selectedCategories.length <= 1) {
        setSelectedCategories([...selectedCategories]);
        return;
      }

      if (selectedCategories.includes(strSelCategory)) {
        if (isMetricsPresentForCategory(strSelCategory)) {
          const objCategItem = jsonMetrics.metricCategories.find(
            (element) => element.value === strSelCategory
          );
          const numCount =
            selectedMetrics[strSelCategory].direct?.length +
            selectedMetrics[strSelCategory].related?.length;

          setModalData({
            open: true,
            category: strSelCategory,
            title: `Do you want to unselect ${objCategItem.name}?`,
            description: `You have selected ${numCount} questions from ${objCategItem.name}. All these will be unselected.`,
          });
          return;
        }

        const arrDeletedSelections = selectedCategories.filter(
          (e) => e !== strSelCategory
        );
        setSelectedCategories([...arrDeletedSelections]);
      }
    }
  }

  function addMetricValue(strTypeKey, strCategory, strSelectedMetricValue) {
    const arrMetric = selectedMetrics[strCategory]?.[strTypeKey] || [];

    if (!arrMetric.includes(strSelectedMetricValue)) {
      setSelectedMetrics((prevState) => {
        prevState[strCategory][strTypeKey].push(strSelectedMetricValue);
        return {
          ...prevState,
        };
      });
    }
  }

  function removeMetric(strTypeKey, strCategory, strSelectedMetricValue) {
    const arrSource = selectedMetrics[strCategory]?.[strTypeKey];
    if (arrSource.includes(strSelectedMetricValue)) {
      setSelectedMetrics((prevState) => {
        prevState[strCategory][strTypeKey].push(strSelectedMetricValue);
        const arrDeletedSelections = prevState[strCategory][strTypeKey].filter(
          (e) => e !== strSelectedMetricValue
        );
        prevState[strCategory][strTypeKey] = [...arrDeletedSelections];

        return {
          ...prevState,
        };
      });
    }
  }

  function metricAnalysisChangeHandler(objItem) {
    const strSelectedMetricValue = objItem.data.value;
    const boolSelected = objItem.selected;
    const strCategory = objItem.category;

    if (boolSelected) {
      addMetricValue(objItem.metricType, strCategory, strSelectedMetricValue);
    } else {
      removeMetric(objItem.metricType, strCategory, strSelectedMetricValue);
    }
    console.log(selectedMetrics);
  }

  let dpDirectMetrics = [];
  let dpRelatedMetrics = [];
  const intLength = selectedCategories?.length;
  const objSourceMetrics = jsonMetrics.analyseCategories;

  for (let c1 = 0; c1 < intLength; c1++) {
    const strCategoryItem = selectedCategories[c1];
    const objCategoryMetrics = objSourceMetrics[strCategoryItem];
    const arrDirectMetrics = objCategoryMetrics.metrics.map((item) => {
      return { ...item, category: strCategoryItem };
    });
    const arrRelatedMetrics = objCategoryMetrics.related.map((item) => {
      return { ...item, category: strCategoryItem };
    });

    dpDirectMetrics = dpDirectMetrics.concat(arrDirectMetrics);
    dpRelatedMetrics = dpRelatedMetrics.concat(arrRelatedMetrics);
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
                  key={objItem.value}
                  data={objItem}
                  index={index}
                  onChange={metricTypeChangeHandler}
                  selected={selectedCategories?.includes(objItem.value)}
                />
              );
            })}
          </div>
        </div>

        {selectedCategories && selectedCategories.length > 0 && (
          <div className="metric-screen-metric-type">
            <span className="metric-screen-metric-type-header">
              What do you want to create the report for?
            </span>
            <span className="metric-screen-metric-type-desc">
              Choose to see the relevant metrics for each category
            </span>
            <div className="metric-screen-analyse-type-list">
              {dpDirectMetrics?.map((objItem, index) => {
                return (
                  <MetricAnalyseCard
                    key={objItem.value}
                    data={objItem}
                    index={index}
                    metricType="direct"
                    category={objItem.category}
                    selected={selectedMetrics?.[
                      objItem.category
                    ]?.direct?.includes(objItem.value)}
                    onChange={metricAnalysisChangeHandler}
                  />
                );
              })}
            </div>
          </div>
        )}

        {selectedCategories && selectedCategories.length > 0 && (
          <div className="metric-screen-metric-type metric-screen-related-type">
            <span className="metric-screen-metric-type-header">
              Related metrics
            </span>
            <div className="metric-screen-analyse-type-list">
              {dpRelatedMetrics?.map((objItem, index) => {
                return (
                  <MetricAnalyseCard
                    key={objItem.value}
                    data={objItem}
                    index={index}
                    metricType="related"
                    category={objItem.category}
                    selected={selectedMetrics?.[
                      objItem.category
                    ]?.related?.includes(objItem.value)}
                    onChange={metricAnalysisChangeHandler}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="metric-screen-footer">
        <FwButton onFwClick={createReportHandler}>Create Report</FwButton>
        <FwButton color="secondary" onFwClick={skipReportHandler}>
          Skip
        </FwButton>
      </div>
      <FwModal isOpen={modalData.open} onFwClose={closeModalHandler}>
        <FwModalTitle titleText={modalData?.title}></FwModalTitle>
        <FwModalContent>
          <div>{modalData?.description}</div>
        </FwModalContent>
        <FwModalFooter custom={true}>
          <span className="metric-screen-modal-footer">
            <FwButton color="secondary" onFwClick={closeModalHandler}>
              Cancel
            </FwButton>
            <FwButton onFwClick={submitModalHandler}>Confirm</FwButton>
          </span>
        </FwModalFooter>
      </FwModal>
    </div>
  );
}
