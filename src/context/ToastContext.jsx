import React, { createContext, useState, useContext } from "react";
import { Toast, ToastContainer, ProgressBar } from "react-bootstrap";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const showToastMessage = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <ToastContext.Provider value={{ showToastMessage }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
          style={{
            minWidth: "300px",
            textAlign: "center",
            color: "white",
            fontSize: "1.2rem",
          }}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
          <ProgressBar
            animated
            now={100}
            variant={toastVariant === "success" ? "success" : "danger"}
            style={{ height: "5px" }}
          />
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
