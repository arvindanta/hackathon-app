import React from "react";
import TemplateList from "../TemplateList/TemplateList";
import "./CreateTemplate.css";

function CreateTemplate({ templates, onUseTemplate }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <div
        style={{
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        Here are some templates for you to pick from
      </div>
      <div style={{ marginTop: "6px" }}>
        <span className="report__link" style={{}}>
          Choose from existing report
        </span>{" "}
        if you want to clone
      </div>
      <div>
        <TemplateList templates={templates} onUseTemplate={onUseTemplate} />
      </div>
    </div>
  );
}

export default CreateTemplate;
