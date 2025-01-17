import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import Technologies from "./pages/technologies/Home";
import CreateTechnologie from "./pages/technologies/Create";
import EditTechnologie from "./pages/technologies/Edit";
import DetailsTechnologie from "./pages/technologies/Details";
import HomeEntreprise from "./pages/entreprises/Home";
import CreateEntreprise from "./pages/entreprises/Create";
import EditEntreprise from "./pages/entreprises/Edit";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Details from "./pages/entreprises/Details";
import { login, logout } from "./redux/userSlice";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

const AppContent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {user.isLoggedIn && (
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          className="navbar sticky-top"
        >
          <Navbar.Brand
            as={Link}
            to="/entreprises"
            className="d-flex align-items-center ms-3"
          >
            <img
              src="/src/assets/logo1.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <span className="ms-2">Big Copmanies</span>
          </Navbar.Brand>
          <Nav className="me-auto ms-3">
            <Nav.Link as={Link} to="/entreprises">
              Entreprises
            </Nav.Link>
            <Nav.Link as={Link} to="/entreprises/create">
              Create Entreprise
            </Nav.Link>
            <Nav.Link as={Link} to="/technologies">
              Technologies
            </Nav.Link>
            <Nav.Link as={Link} to="/technologies/create">
              Create Technologie
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Text className="me-3">
              Signed in as: {user.user?.username}
            </Navbar.Text>
            <Nav.Link as={Link} to="/" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
      )}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/technologies/create" element={<CreateTechnologie />} />
          <Route path="/technologies/edit/:id" element={<EditTechnologie />} />
          <Route
            path="/technologies/details/:id"
            element={<DetailsTechnologie />}
          />
          <Route path="/entreprises" element={<HomeEntreprise />} />
          <Route path="/entreprises/create" element={<CreateEntreprise />} />
          <Route path="/entreprises/edit/:id" element={<EditEntreprise />} />
          <Route path="/entreprises/details/:id" element={<Details />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
