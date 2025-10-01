"use client";

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import SidebarChanger from "../sidebarChanger";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      style={{
        pointerEvents: isActive ? "none" : "auto",
        cursor: isActive ? "default" : "pointer",
      }}
      aria-disabled={isActive}
      className={isActive ? "link-as-header" : "text-primary"}
    >
      {children}
    </Link>
  );
}

function Sidebar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink href="/top">Топ 10</NavLink>
              <NavLink href="/reports" className="text-primary">
                Все регионы
              </NavLink>
            </Nav>
          </Navbar.Collapse> */}
          <h2>Данные по полётам</h2>
          <SidebarChanger />
        </Container>
      </Navbar>
    </>
  );
}

export default Sidebar;
