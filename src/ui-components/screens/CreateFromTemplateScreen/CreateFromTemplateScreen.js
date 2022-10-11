import React from "react";
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader";
import CreateTemplate from "../../components/CreateTemplate/CreateTemplate";
import templates from "../../json/templates.json";
import "./CreateFromTemplateScreen.css";

function CreateFromTemplateScreen(props) {
  const { selectedScreen, onChange } = props;

  function categoryChangeHandler(objItem) {
    onChange("CATEGORY_CHANGE", objItem);
  }
  function useTemplateHandler(objItem) {
    onChange("USE_TEMPLATE", objItem);
  }

  return (
    <div className="template-screen">
      <CategoryHeader
        selectedScreen={selectedScreen}
        onChange={categoryChangeHandler}
      />
      <div className="template-screen-scrollable-content">
        <CreateTemplate
          templates={templates}
          onUseTemplate={useTemplateHandler}
        />
      </div>
    </div>
  );
}

export default CreateFromTemplateScreen;
