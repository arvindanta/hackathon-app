import "./App.css";
import CategoryCard from "./ui-components/components/CategoryCard/CategoryCard";
import CategoryThumbnail from "./ui-components/components/CategoryThumbnail/CategoryThumbnail";
import TemplateList from "./ui-components/components/TemplateList/TemplateList";
function App() {
  return (
    <div className="App">
      <TemplateList />
      <div className="categories-thumb">
        <CategoryThumbnail
          data={{
            bgColor: "#7B55FF",
            image: "assets/template_thumbnail.png",
            name: "Create from template",
            description: "For quickly creating desired metrics",
          }}
        />
        <CategoryThumbnail
          data={{
            bgColor: "#2AB7CB",
            image: "assets/scratch_thumbnail.png",
            name: "Build from scratch",
            description: "For defining your own metrics",
          }}
        />
      </div>
      <div className="categories-card">
        <CategoryCard
          data={{
            selected: true,
            bgColor: "#7B55FF",
            image: "assets/template_thumbnail.png",
            name: "Create from template",
            description: "For quickly creating desired metrics",
          }}
        />
        <CategoryCard
          data={{
            bgColor: "#2AB7CB",
            image: "assets/scratch_thumbnail.png",
            name: "Build from scratch",
            description: "For defining your own metrics",
          }}
        />
      </div>
    </div>
  );
}

export default App;
