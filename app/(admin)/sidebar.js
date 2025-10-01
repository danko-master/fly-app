"use client";

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import SidebarChanger from "../sidebarChanger";

function Sidebar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/upload" className="text-primary">
                Загрузка файла
              </Nav.Link>
              <Nav.Link href="/list" className="text-primary">
                Список файлов
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <SidebarChanger />
        </Container>
      </Navbar>
    </>
  );
}

export default Sidebar;
