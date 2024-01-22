import React, { useEffect, useState } from "react";
import AccountModel from "../models/account/AccountModel";
import TokenService from "../services/token.service";
interface NavbarProps {
  currentUser: AccountModel | undefined;
  logOut: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({ currentUser, logOut }) => {
  const userRole = TokenService.getUserRole();
  const isAuthenticated = TokenService.getLocalAccessToken();

  return (
    <nav className="navbar navbar-expand-lg  main-colour">
      <div className="container">
        <a
          className="navbar-brand accent-element-colour accent-link logo"
          href="#"
        >
          BeautyBar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="rgb(158,89,85)"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link accent-element-colour accent-link"
                href="/home#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link accent-element-colour accent-link"
                href="/procedure"
              >
                Procedure
              </a>
            </li>

            {userRole === "[ROLE_ADMIN]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/admin/employee"
                >
                  Employees
                </a>
              </li>
            )}

            {userRole === "[ROLE_ADMIN]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/admin/procedure"
                >
                  Procedures
                </a>
              </li>
            )}

            {userRole === "[ROLE_ADMIN]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/admin/appointment"
                >
                  Appointments
                </a>
              </li>
            )}

            {userRole === "[ROLE_ADMIN]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/admin/messages"
                >
                  Messages
                </a>
              </li>
            )}
            {userRole === "[ROLE_ADMIN]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/admin/accounts"
                >
                  Accounts
                </a>
              </li>
            )}

            {isAuthenticated && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/profile"
                >
                  Profile
                </a>
              </li>
            )}

            {userRole === "[ROLE_USER]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/appointments"
                >
                  Appointments
                </a>
              </li>
            )}

            {userRole === "[ROLE_USER]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/receipt"
                >
                  Payments
                </a>
              </li>
            )}

            {userRole === "[ROLE_USER]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/contact"
                >
                  Contact
                </a>
              </li>
            )}

            {userRole === "[ROLE_EMPLOYEE]" && (
              <li className="nav-item">
                <a
                  className="nav-link accent-element-colour accent-link"
                  href="/employee/appointments"
                >
                  My appointments
                </a>
              </li>
            )}
          </ul>

          <div className="ms-auto">
            {currentUser ? (
              <button
                className="btn secondary-colour main-btn"
                onClick={logOut}
              >
                <span className="main-element-colour main-link">Sign Out</span>
              </button>
            ) : (
              
                <a href="/login" id="signin-button" className="btn secondary-colour main-btn main-element-colour main-link">
                  Sign in
                </a>
              
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
