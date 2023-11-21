import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedElements, setSelectedElements] = useState([]);
  const [color, setColor] = useState(false);
  const [btnName, setBtnName] = useState("");

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedElements([]);
    setColor(true);
  };

  const sendEvent = (type, label) => {
    if (selectionMode) {
      console.log(`Event sent to GTM - Type: ${type}, Label: ${label}`);
    }
  };

  const handleInteraction = (event, type, label) => {
    setBtnName(label);
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
    <div className="container-fluid mt-5">
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
                selectionMode && color && btnName === "Subscribe"
                  ? "interactive-element btn-dark"
                  : "btn-primary"
              }`}
              onClick={(e) => handleInteraction(e, "button", "Subscribe")}
            >
              Subscribe
            </button>
            <button
              className={`btn btn-primary me-2 ${
                selectionMode && color && btnName === "Download"
                  ? "interactive-element btn-dark"
                  : "btn-primary"
              }`}
              onClick={(e) => handleInteraction(e, "button", "Download")}
            >
              Download
            </button>
            <button
              className={`btn btn-primary me-2 ${
                selectionMode && color && btnName === "Contact Us"
                  ? "interactive-element btn-dark"
                  : "btn-primary"
              }`}
              onClick={(e) => handleInteraction(e, "button", "Contact Us")}
            >
              Contact Us
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              className={`btn btn-primary me-2 ${
                selectionMode && color && btnName === "Read More"
                  ? "interactive-element btn-dark"
                  : "btn-primary"
              }`}
              onClick={(e) => handleInteraction(e, "link", "Read More")}
            >
              Read More
            </button>
            <button
              className={`btn  btn-primary me-2 ${
                selectionMode && color && btnName === "Visit Our Store"
                  ? "interactive-element btn-dark"
                  : "btn-primary"
              }`}
              onClick={(e) => handleInteraction(e, "link", "Visit Our Store")}
            >
              Visit Our Store
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <select
              className={`form-select me-2 `}
              onChange={(e) => handleInteraction(e, "dropdown", e.target.value)}
            >
              <option
                className={`${
                  selectionMode && color && btnName === "Option 1"
                    ? "interactive-element bg-dark text-light"
                    : "btn-primary"
                }`}
                value="Option 1"
              >
                Option 1
              </option>
              <option
                className={`${
                  selectionMode && color && btnName === "Option 2"
                    ? "interactive-element bg-dark text-light"
                    : "btn-primary"
                }`}
                value="Option 2"
              >
                Option 2
              </option>
              <option
                className={`${
                  color && btnName === "Option 3"
                    ? " bg-dark text-light"
                    : "btn-primary"
                }`}
                value="Option 3"
              >
                Option 3
              </option>
            </select>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <iframe
              className={`interactive-element`}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/D0UnqGm_miA"
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
              selectionMode
                ? "interactive-element border border-danger bg-success"
                : ""
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
