import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectBtn, setSelectBtn] = useState(false);

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectBtn(true);
    setSelectedElements([]);
  };

  const sendEvent = (type, label) => {
    if (selectionMode) {
      console.log(`Event sent to GTM - Type: ${type}, Label: ${label}`);
    }
  };

  const handleInteraction = (event, type, label, color) => {
    if (selectionMode) {
      event.preventDefault();

      const isSelected = selectedElements.find(
        (element) => element.type === type && element.label === label
      );

      if (isSelected) {
        // If already selected, unselect it
        setSelectedElements((prevSelected) =>
          prevSelected.filter(
            (element) => !(element.type === type && element.label === label)
          )
        );
      } else {
        // If not selected, add it to the list
        setSelectedElements((prevSelected) => [
          ...prevSelected,
          { type, label },
        ]);
      }

      sendEvent(type, label);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-md-4">
          {selectionMode && (
            <div className="col-md-6">
              <div className="selected-elements">
                <h6>Selected Elements</h6>
                <ul>
                  {selectedElements.map((element, index) => (
                    <li key={index}>
                      {element.type} - {element.label}
                    </li>
                  ))}
                </ul>
                <p>Total Interactions: {selectedElements.length}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div className="d-flex justify-content-center">
            <button
              className={`btn btn-primary me-2 ${
                selectionMode ? "interactive-element " : "border border-danger"
              }`}
              onClick={(e) => handleInteraction(e, "button", "Subscribe")}
            >
              Subscribe
            </button>
            <button
              className={`btn btn-primary me-2 ${
                selectionMode ? "interactive-element" : ""
              }`}
              onClick={(e) => handleInteraction(e, "button", "Download")}
            >
              Download
            </button>
            <button
              className={`btn btn-primary me-2 ${
                selectionMode ? "interactive-element" : ""
              }`}
              onClick={(e) => handleInteraction(e, "button", "Contact Us")}
            >
              Contact Us
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              className={`btn btn-primary me-2 ${
                selectionMode ? "interactive-element" : ""
              }`}
              onClick={(e) => handleInteraction(e, "link", "Read More")}
            >
              Read More
            </button>
            <button
              className={`btn btn-primary me-2 ${
                selectionMode ? "interactive-element" : ""
              }`}
              onClick={(e) => handleInteraction(e, "link", "Visit Our Store")}
            >
              Visit Our Store
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <select
              className={`form-select me-2 ${
                selectionMode ? "interactive-element" : ""
              }`}
              onChange={(e) => handleInteraction(e, "dropdown", e.target.value)}
            >
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <iframe
              className={`interactive-element`}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allowFullScreen
              title="Dummy Video"
              onClick={(e) => handleInteraction(e, "video", "Dummy Video")}
            ></iframe>
          </div>
        </div>
      </div>
      <div className="row my-3 ">
        <div className="col-md-4"></div>
        <div className="col-md-8 d-flex justify-content-center ">
          <button
            className={`btn btn-primary me-2 ${
              selectionMode ? "interactive-element border border-danger" : ""
            }`}
            onClick={toggleSelectionMode}
          >
            Selection Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
