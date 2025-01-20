import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useToast } from "../../context/ToastContext";
import { useSelector } from "react-redux";

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
  const [file, setFile] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/Projet/webapi/technologies")
      .then((response) => setTechnologies(response.data))
      .catch((error) => {
        console.error("Error fetching technologies:", error);
        showToastMessage("Error fetching technologies", "danger");
      });
  }, [showToastMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTechChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const listTech = checked
        ? [...prevData.listTech, value]
        : prevData.listTech.filter((techId) => techId !== value);
      return { ...prevData, listTech };
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
            "http://localhost:8081/Projet/webapi/entreprises",
            updatedFormData
          );
        })
        .then(() => {
          setIsUploading(false);
          showToastMessage("Entreprise created successfully", "success");
          navigate("/entreprises");
        })
        .catch((error) => {
          console.error("Error creating entreprise:", error);
          showToastMessage("Error creating entreprise", "danger");
          setIsUploading(false);
        });
    } else {
      axios
        .post("http://localhost:8081/Projet/webapi/entreprises", formData)
        .then(() => {
          showToastMessage("Entreprise created successfully", "success");
          navigate("/entreprises");
        })
        .catch((error) => {
          console.error("Error creating entreprise:", error);
          showToastMessage("Error creating entreprise", "danger");
        });
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <h1 className="mt-4 text-center">Create Entreprise</h1>
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
              <Form.Group controlId="formNumTel" className="mb-3">
                <Form.Label className="fw-bold">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="numTel"
                  value={formData.numTel}
                  onChange={handleChange}
                  placeholder="Enter phone number"
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
              <Form.Group controlId="formDateDeCreation" className="mb-3">
                <Form.Label className="fw-bold">Creation Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dateDeCreation"
                  value={formData.dateDeCreation}
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
              <Form.Group controlId="formTechnologies" className="mb-3">
                <Form.Label className="fw-bold">Technologies</Form.Label>
                {technologies.map((tech) => (
                  <Form.Check
                    key={tech.id}
                    type="checkbox"
                    label={tech.nomTech}
                    value={tech.id}
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
    </>
  );
};

export default Create;
