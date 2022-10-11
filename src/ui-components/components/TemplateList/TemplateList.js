import React, { useState, useEffect } from "react";
import {
  FwPill,
  FwInput,
  FwSelect,
  FwSelectOption,
} from "@freshworks/crayons/react";
import TemplateListItem from "../TemplateListItem/TemplateListItem";
import "./TemplateList.css";

function TemplateList({ templates }) {
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [results, setResults] = useState(templates);
  const [search, setSearch] = useState("");
  const templateTags = [...new Set(templates?.map((t) => t.module) ?? [])];
  const [filteredTags, setFilteredTags] = useState([]);

  const doSearch = (val) => {
    setSearch(val);
  };

  const tagSelect = (e, t) => {
    let arr = filteredTags.slice();
    if (arr.includes(t)) {
      arr = arr.filter((f) => f !== t);
      e.target.classList.remove("fw_pill--active");
    } else {
      arr.push(t);
      e.target.classList.add("fw_pill--active");
    }
    setFilteredTags([...new Set(arr)]);

    const fil = templates.filter((f) => arr.includes(f.module));
    setFilteredTemplates((fil.length && fil) || templates);
  };

  useEffect(() => {
    setResults(
      filteredTemplates.filter((a) =>
        a?.name?.toLowerCase().includes(search?.toLowerCase())
      )
    );
  }, [search, filteredTemplates]);

  return (
    <div>
      <div className="list__header">
        <div>
          {templateTags.map((t) => {
            return (
              <FwPill
                key={t}
                className="fw_pill"
                onClick={(e) => tagSelect(e, t)}
              >
                {t}
              </FwPill>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "400px",
          }}
        >
          <FwInput
            style={{ width: "180px" }}
            placeholder="Search by name"
            iconLeft="search"
            clearInput
            onFwInput={(e) => doSearch(e.target.value)}
          />

          <FwSelect required value="1" style={{ width: "180px" }}>
            <FwSelectOption value="1">Popular</FwSelectOption>
            <FwSelectOption value="2">Name</FwSelectOption>
          </FwSelect>
        </div>
      </div>

      <br />
      <br />

      <div className="image_grid">
        {results.map((tli, i) => {
          return <TemplateListItem key={i} listitem={tli} />;
        })}
      </div>
    </div>
  );
}

export default TemplateList;
