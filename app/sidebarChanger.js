"use client";

import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";

function SidebarChanger() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Button variant="primary" onClick={handleShow} className="me-2">
            Выйти
          </Button>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Переход</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/upload" className="text-primary">
              Администратор
            </Nav.Link>
            <Nav.Link href="/reports" className="text-primary">
              Пользователь
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SidebarChanger;
