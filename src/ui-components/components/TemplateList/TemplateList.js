import React, { useState, useEffect } from "react";
import {
  FwPill,
  FwInput,
  FwSelect,
  FwSelectOption,
} from "@freshworks/crayons/react";
import TemplateListItem from "../TemplateListItem/TemplateListItem";
import "./TemplateList.css";

function TemplateList({ templates, onUseTemplate }) {
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [results, setResults] = useState(templates);
  const [search, setSearch] = useState("");
  const templateTags = [...new Set(templates?.map((t) => t.module) ?? [])];
  const [filteredTags, setFilteredTags] = useState([]);

  const doSearch = (val) => {
    setSearch(val);
  };

  const tagSelect = (e, t) => {
    setSearch("");
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
    <div className="list__headercontainer">
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
        <div className="header__right">
          <FwInput
            style={{ width: "180px" }}
            placeholder="Search by name"
            iconLeft="search"
            clearInput
            onFwInputClear={(e) => setSearch("")}
            value={search}
            onFwInput={(e) => doSearch(e.target.value)}
          />

          <FwSelect required value="1" style={{ width: "180px" }}>
            <FwSelectOption value="1">Popular</FwSelectOption>
            <FwSelectOption value="2">Name</FwSelectOption>
          </FwSelect>
        </div>
      </div>

      <div className="image_grid">
        {results.map((tli, i) => {
          return (
            <TemplateListItem
              key={i}
              listitem={tli}
              onUseTemplate={onUseTemplate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TemplateList;
