import React from "react";
import TemplateList from "../TemplateList/TemplateList";

const templates = [
  {
    id: 181436,
    name: "Tickets - Overview",
    module: "Tickets",
    thumbnailImage: "",
  },
  {
    id: 224882,
    name: "Helpdesk Performance",
    module: "Tickets",
    thumbnailImage: "",
  },
  {
    id: 3828291,
    name: "Average Handling Time",
    module: "Surveys",
    thumbnailImage: "",
  },
  {
    id: 178076,
    name: "Satisfaction Survey Results",
    module: "Surveys",
    thumbnailImage: "",
  },
  {
    id: 177956,
    name: "Timesheet Summary",
    module: "Timesheets",
    thumbnailImage: "",
  },
  {
    id: 19256,
    name: "Agent Time Tracked",
    module: "Timesheets",
    thumbnailImage: "",
  },
  {
    id: 177828,
    name: "Performance Distribution",
    module: "Articles",
    thumbnailImage: "",
  },
  {
    id: 178079,
    name: "Grouped Response",
    module: "Articles",
    thumbnailImage: "",
  },
  {
    id: 125819,
    name: "Freddy Answer Bot",
    module: "Answerbot",
    thumbnailImage: "",
  },
  {
    id: 125826,
    name: "Freddy Email Bot",
    module: "Answerbot",
    thumbnailImage: "",
  },
];

function CreateTemplate() {
  return (
    <div style={{ margin: "24px 32px" }}>
      <div
        style={{
          size: "16px",
          fontWeight: 600,
        }}
      >
        Here are some templates for you to pick from
      </div>
      <p>
        <span
          style={{
            color: "rgba(44, 92, 197, 1)",
            cursor: "pointer",
            size: "12px",
          }}
        >
          Choose from existing report
        </span>{" "}
        if you want to clone
      </p>
      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        <TemplateList templates={templates} />
      </div>
    </div>
  );
}

export default CreateTemplate;
