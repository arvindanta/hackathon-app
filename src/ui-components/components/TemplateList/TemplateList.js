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
  const [isAll, setisAll] = useState(false);

  const doSearch = (val) => {
    setSearch(val);
  };

  const tagSelect = (e, t) => {
    setSearch("");
    setisAll(false);
    let arr = filteredTags.slice();
    console.log("arr ", arr);

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
    let arr = filteredTags.slice();
    if (isAll) {
      arr = templateTags;
      const pills = document.querySelectorAll(".list__header fw-pill");
      pills.forEach((e) => {
        e.classList.add("fw_pill--active");
      });
      const pills1 = document.querySelectorAll(
        ".list__header fw-pill[data-label='All']"
      );
      pills1.forEach((e) => {
        e.classList.add("fw_pill--active");
      });
    } else {
      const pills1 = document.querySelectorAll(
        ".list__header fw-pill[data-label='All']"
      );
      pills1.forEach((e) => {
        e.classList.remove("fw_pill--active");
      });
      arr = arr.filter((f) => f !== "All");
    }

    setFilteredTags([...new Set(arr)]);

    const fil = templates.filter((f) => arr.includes(f.module));
    setFilteredTemplates((fil.length && fil) || templates);
  }, [isAll]);

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
          <FwPill
            data-label={"All"}
            className="fw_pill"
            onClick={(e) => {
              setSearch("");
              setisAll((f) => !f);
            }}
          >
            All
          </FwPill>
          {templateTags.map((t) => {
            return (
              <FwPill
                key={t}
                data-label={t}
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
