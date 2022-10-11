import React, { useEffect, useRef, useState, useCallback } from "react";
import { FwButton } from "@freshworks/crayons/react";
import TemplateModal from "../TemplateModal/TemplateModal";
import "./TemplateListItem.css";
import image from "./img/Template.png";

function TemplateListItem({ listitem, onUseTemplate }) {
  const [showPopup, setShowPopup] = useState(false);

  const itemRef = useRef(null);

  const show = useCallback((e) => {
    setShowPopup((p) => !p);
  }, []);

  const hide = useCallback((e) => {
    setShowPopup(false);
  }, []);

  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (
        event.target.className === "wrapper" ||
        event.target.className === "box-wrapper" ||
        event.target.className === "close-btn"
      ) {
        setShowPopup(false);
        document.body.classList.remove("effect");
      }
    });

    window.addEventListener("mouseenter", show);

    window.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseleave", hide);
    };
  }, [hide, show]);

  return (
    <div className="wrapper">
      <div className="listitem" ref={itemRef}>
        <div className="listitem__body">
          <div className="header">{listitem.name}</div>

          <div className="listitem__imagecontainer" onClick={(e) => show(e)}>
            <img
              className="listitem__image"
              src={listitem.thumbnailImage || image}
              alt="template"
            ></img>
          </div>
        </div>
        <div className="listitem__footer">
          <div>{listitem.module}</div>
          <FwButton
            color="secondary"
            size="small"
            onFwClick={() => onUseTemplate(listitem)}
          >
            Use this template
          </FwButton>
        </div>
      </div>
      {showPopup && (
        <TemplateModal
          listitem={listitem}
          image={image}
          onUseTemplate={onUseTemplate}
        />
      )}
    </div>
  );
}

export default TemplateListItem;
