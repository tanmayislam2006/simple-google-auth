import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar rounded-box flex w-full items-center justify-between gap-2 shadow-base-300/20 shadow-sm">
      <div className="navbar-start max-md:w-1/4">
        <Link
         to='/'
        >
          FlyonUI
        </Link>
      </div>
      <div className="navbar-center max-md:hidden">
        <ul className="menu menu-horizontal p-0 font-medium">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-blue-600 underline" : ""
              }
              to="/login"
            >
              LogIn
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-blue-600 underline" : ""
              }
              to="/registar"
            >
              Registar
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end items-center gap-4">
        <div className="dropdown relative inline-flex md:hidden">
          <button
            id="dropdown-default"
            type="button"
            className="dropdown-toggle btn btn-text btn-secondary btn-square"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <span className="icon-[tabler--menu-2] dropdown-open:hidden size-5"></span>
            <span className="icon-[tabler--x] dropdown-open:block hidden size-5"></span>
          </button>
          <ul
            className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-default"
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-bold text-blue-600 underline" : ""
                }
                to="/login"
              >
                LogIn
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-bold text-blue-600 underline" : ""
                }
                to="/registar"
              >
                Registar
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn max-md:btn-square btn-primary" href="#">
          <span className="max-md:hidden">Get started</span>
          <span className="icon-[tabler--arrow-right] rtl:rotate-180"></span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
