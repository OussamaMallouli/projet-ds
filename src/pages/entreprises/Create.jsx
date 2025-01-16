import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const Create = () => {
  const [formData, setFormData] = useState({
    nomEntreprise: "",
    email: "",
    numTel: "",
    description: "",
    dateDeCreation: "",
    logo: "",
    listTech: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/Projet/webapi/entreprises", formData)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error creating entreprise:", error));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      )
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          logo: response.data.secure_url,
        }));
      })
      .catch((error) => console.error("Error uploading image:", error));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1>Create Entreprise</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomEntreprise">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="nomEntreprise"
            value={formData.nomEntreprise}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formNumTel" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="numTel"
            value={formData.numTel}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group controlId="formDateDeCreation" className="mt-3">
          <Form.Label>Creation Date</Form.Label>
          <Form.Control
            type="date"
            name="dateDeCreation"
            value={formData.dateDeCreation}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLogo" className="mt-3">
          <Form.Label>Logo</Form.Label>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select one</p>
          </div>
          {formData.logo && (
            <img
              src={formData.logo}
              alt="Logo"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Create;
