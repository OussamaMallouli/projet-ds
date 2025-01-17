import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/Projet/webapi/technologies/${id}`)
      .then((response) => setTechnology(response.data))
      .catch((error) => console.error("Error fetching technology:", error));
  }, [id]);

  if (!technology) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => navigate("/technologies")}>
        Go Back
      </Button>
      <Card className="mt-3">
        <Card.Header>
          <h2>{technology.nomTech}</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <img
                src={technology.logo}
                alt={`${technology.nomTech} logo`}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "200px" }}
              />
            </Col>
            <Col md={8}>
              <Card.Title>Details</Card.Title>
              <Card.Text>
                <strong>Version:</strong> {technology.version}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {technology.description}
              </Card.Text>
              <Card.Text>
                <strong>Platform:</strong> {technology.plateformSupporte}
              </Card.Text>
              <Card.Text>
                <strong>Website:</strong>{" "}
                <a
                  href={technology.siteWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {technology.siteWeb}
                </a>
              </Card.Text>
              <Card.Text>
                <strong>Last Update:</strong>{" "}
                {technology.dateDerniereMAJ.slice(0, 10)}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Details;
