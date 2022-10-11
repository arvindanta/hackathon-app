import React from "react";

import { FwPill } from "@freshworks/crayons/react";
import "./TemplateList.css";
const templates = [
  {
    label: "Tickets",
    id: "tickets",
  },
  {
    label: "Contacts",
    id: "contacts",
  },
  {
    label: "Companies",
    id: "companies",
  },
  {
    label: "Timesheets",
    id: "timesheets",
  },
  {
    label: "Surveys",
    id: "surveys",
  },
  {
    label: "Articles",
    id: "articles",
  },
  {
    label: "Answerbot",
    id: "answerbot",
  },
];

function TemplateList() {
  return (
    <>
      <h3>Here are some templates for you to pick from</h3>
      <br />

      {templates.map((t) => {
        return <FwPill class="pill">{t.label}</FwPill>;
      })}
    </>
  );
}

export default TemplateList;
