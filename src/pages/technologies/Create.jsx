import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";

const Create = () => {
  const [formData, setFormData] = useState({
    nomTech: "",
    version: "",
    description: "",
    plateformSupporte: "",
    siteWeb: "",
    dateDerniereMAJ: "",
    logo: "", // new attribute
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // replace with your Cloudinary upload preset

    axios
      .post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      ) // replace with your Cloudinary cloud name
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          logo: response.data.secure_url,
        }));
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/Projet/webapi/technologies", formData)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error creating technologie:", error));
  };

  return (
    <div>
      <h1>Create Technologie</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomTech">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="nomTech"
            value={formData.nomTech}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group controlId="formVersion" className="mt-3">
          <Form.Label>Version</Form.Label>
          <Form.Control
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="Enter version"
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
        <Form.Group controlId="formPlatform" className="mt-3">
          <Form.Label>Platform</Form.Label>
          <Form.Control
            type="text"
            name="plateformSupporte"
            value={formData.plateformSupporte}
            onChange={handleChange}
            placeholder="Enter platform"
          />
        </Form.Group>
        <Form.Group controlId="formSiteWeb" className="mt-3">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            name="siteWeb"
            value={formData.siteWeb}
            onChange={handleChange}
            placeholder="Enter website"
          />
        </Form.Group>
        <Form.Group controlId="formDateDerniereMAJ" className="mt-3">
          <Form.Label>Last Update</Form.Label>
          <Form.Control
            type="date"
            name="dateDerniereMAJ"
            value={formData.dateDerniereMAJ}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLogo" className="mt-3">
          <Form.Label>Logo</Form.Label>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select one</p>
              </div>
            )}
          </Dropzone>
          {formData.logo && (
            <div className="mt-3">
              <img src={formData.logo} alt="Logo" width="100" />
            </div>
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
