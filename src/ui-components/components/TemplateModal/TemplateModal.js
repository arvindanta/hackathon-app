import React, { useEffect } from "react";
import { FwButton } from "@freshworks/crayons/react";
import "./TemplateModal.css";

export default function TemplateModal({ listitem, image, onUseTemplate }) {
  useEffect(() => {
    document.body.classList.add("effect");
    return () => {
      document.body.classList.remove("effect");
    };
  }, []);
  return (
    <div>
      <div className="light-box">
        <div className="box-wrapper">
          <div className="box">
            <div className="header__container">
              <div className="header--large">{listitem.name}</div>
              <FwButton
                color="primary"
                size="small"
                onFwClick={() => onUseTemplate(listitem)}
              >
                Use this template
              </FwButton>
            </div>
            <img
              src={listitem.thumbnailImage || image}
              alt="template"
              className="light-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
