import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [enterprise, setEnterprise] = useState(null);

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/Projet/webapi/entreprises/${id}`)
      .then((response) => setEnterprise(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!enterprise) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => navigate("/entreprises")}>
        Go Back
      </Button>
      <Card className="mt-3">
        <Card.Header>
          <h2>{enterprise.nomEntreprise}</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <img
                src={enterprise.logo}
                alt="Logo"
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "200px" }}
              />
            </Col>
            <Col md={8}>
              <Card.Title>Details</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {enterprise.email}
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> {enterprise.numTel}
              </Card.Text>
              <Card.Text>
                <strong>Creation Date:</strong>{" "}
                {enterprise.dateDeCreation.slice(0, -1)}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {enterprise.description}
              </Card.Text>
              <div>
                <strong>Technologies:</strong>
                <Row className="mt-2">
                  {enterprise.listTech.map((tech) => (
                    <Col
                      key={tech.id}
                      xs={6}
                      md={4}
                      className="mb-3 text-center"
                    >
                      <img
                        src={tech.logo}
                        alt={tech.nomTech}
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: "50px" }}
                      />
                      <div>{tech.nomTech}</div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Details;
