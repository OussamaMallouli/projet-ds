import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const Create = () => {
  const [formData, setFormData] = useState({
    nomTech: "",
    version: "",
    description: "",
    plateformSupporte: "",
    siteWeb: "",
    dateDerniereMAJ: "",
    logo: "",
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "ml_default");
      uploadData.append("publicid", file.name);

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dmyz2illl/image/upload",
          uploadData
        )
        .then((response) => {
          const updatedFormData = {
            ...formData,
            logo: response.data.secure_url,
          };
          return axios.post(
            "http://localhost:8081/Projet/webapi/technologies",
            updatedFormData
          );
        })
        .then(() => {
          setIsUploading(false);
          navigate("/technologies");
        })
        .catch((error) => {
          console.error("Error creating technologie:", error);
          setIsUploading(false);
        });
    } else {
      axios
        .post("http://localhost:8081/Projet/webapi/technologies", formData)
        .then(() => navigate("/technologies"))
        .catch((error) => console.error("Error creating technologie:", error));
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <h1 className="mt-4 text-center">Create Technologie</h1>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNomTech" className="mb-3">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="nomTech"
                  value={formData.nomTech}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group controlId="formVersion" className="mb-3">
                <Form.Label className="fw-bold">Version</Form.Label>
                <Form.Control
                  type="text"
                  name="version"
                  value={formData.version}
                  onChange={handleChange}
                  placeholder="Enter version"
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </Form.Group>
              <Form.Group controlId="formPlatform" className="mb-3">
                <Form.Label className="fw-bold">Platform</Form.Label>
                <Form.Control
                  type="text"
                  name="plateformSupporte"
                  value={formData.plateformSupporte}
                  onChange={handleChange}
                  placeholder="Enter platform"
                />
              </Form.Group>
              <Form.Group controlId="formSiteWeb" className="mb-3">
                <Form.Label className="fw-bold">Website</Form.Label>
                <Form.Control
                  type="text"
                  name="siteWeb"
                  value={formData.siteWeb}
                  onChange={handleChange}
                  placeholder="Enter website"
                />
              </Form.Group>
              <Form.Group controlId="formDateDerniereMAJ" className="mb-3">
                <Form.Label className="fw-bold">Last Update</Form.Label>
                <Form.Control
                  type="date"
                  name="dateDerniereMAJ"
                  value={formData.dateDerniereMAJ}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLogo" className="mb-3">
                <Form.Label className="fw-bold">Logo</Form.Label>
                <div
                  {...getRootProps({
                    className: "dropzone border border-3 p-3 text-center",
                  })}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getInputProps()} />
                  <p className="text-muted">
                    Drag 'n' drop an image here, or click to select one
                  </p>
                </div>
                {isUploading && (
                  <div className="text-center mt-3">
                    <Spinner animation="border" />
                  </div>
                )}
                {file && !isUploading && (
                  <div className="text-center mt-3">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Logo"
                      style={{ width: "200px" }}
                    />
                  </div>
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-3 w-100"
                disabled={isUploading}
              >
                Submit
              </Button>
              <Button
                variant="secondary"
                className="mt-3 w-100"
                onClick={() => navigate("/technologies")}
              >
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Create;
