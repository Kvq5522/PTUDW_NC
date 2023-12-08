import "@/Styles/grade.css";
import DragNDropBox from "@/components/DnDList/DragNDropBox";

const Transcript = () => {
  return (
    <div className="grade-container">
      <div className="grade-wrapper">
        <div className="grade-top">
          <DragNDropBox />
        </div>
        <div className="grade-table">
          Table Show Grade
        </div>
      </div>
    </div>
  );
}

export default Transcript;