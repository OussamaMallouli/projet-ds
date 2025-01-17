import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const Edit = () => {
  const [formData, setFormData] = useState({
    nomEntreprise: "",
    email: "",
    numTel: "",
    description: "",
    dateDeCreation: "",
    logo: "",
    listTech: [],
  });
  const [technologies, setTechnologies] = useState([]);
  const [techIds, setTechIds] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/Projet/webapi/entreprises/${id}`)
      .then((response) => {
        setFormData(response.data);
        setTechIds(response.data.listTech.map((tech) => tech.id.toString()));
      })
      .catch((error) => console.error("Error fetching entreprise:", error));

    axios
      .get("http://localhost:8081/Projet/webapi/technologies")
      .then((response) => setTechnologies(response.data))
      .catch((error) => console.error("Error fetching technologies:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTechChange = (e) => {
    const { value, checked } = e.target;

    checked
      ? setTechIds((prevTechIds) => [...prevTechIds, value])
      : setTechIds(techIds.filter((id) => id !== value));
    console.log(techIds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      listTech: techIds,
    };
    axios
      .put(
        `http://localhost:8081/Projet/webapi/entreprises/${id}`,
        updatedFormData
      )
      .then(() => navigate("/entreprises"))
      .catch((error) => console.error("Error updating entreprise:", error));
  };

  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    axios
      .post("https://api.cloudinary.com/v1_1/dmyz2illl/image/upload", formData)
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          logo: response.data.secure_url,
        }));
        setIsUploading(false);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setIsUploading(false);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1 className="mt-4 text-center">Edit Entreprise</h1>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNomEntreprise" className="mb-3">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="nomEntreprise"
                  value={formData.nomEntreprise}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="formNumTel" className="mt-3">
                <Form.Label className="fw-bold">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="numTel"
                  value={formData.numTel}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mt-3">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </Form.Group>
              <Form.Group controlId="formDateDeCreation" className="mt-3">
                <Form.Label className="fw-bold">Creation Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dateDeCreation"
                  value={formData.dateDeCreation.slice(0, 10)}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLogo" className="mt-3">
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
                {formData.logo && !isUploading && (
                  <div className="text-center mt-3">
                    <img
                      src={formData.logo}
                      alt="Logo"
                      style={{ width: "200px" }}
                    />
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formTechnologies" className="mb-3">
                <Form.Label className="fw-bold">Technologies</Form.Label>
                {technologies.map((tech) => (
                  <Form.Check
                    key={tech.id}
                    type="checkbox"
                    label={tech.nomTech}
                    value={tech.id}
                    checked={techIds.some((id) => id == tech.id.toString())}
                    onChange={handleTechChange}
                    className="mb-2"
                  />
                ))}
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
                onClick={() => navigate("/entreprises")}
              >
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Edit;
