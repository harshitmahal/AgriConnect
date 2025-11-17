import React, { useEffect, useState } from "react";
import "./navigator.css";
import { Link, useNavigate } from "react-router-dom";

const Navigator = () => {
  const [user, setUser] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    addUserInfo();
  }, [])

  const addUserInfo = () => {
    const user = JSON.parse(sessionStorage.getItem("loginData"));
    setUser(user?.full_name);

  }

  const signOut = () => {
    sessionStorage.removeItem("loginData");
    addUserInfo();
    navigate("/");

    window.location.reload(true);
  }

  return (
    <div>
      <div className="site-mobile-menu">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body">
          <ul className="site-menu js-clone-nav mr-auto ">
            <li>
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/store">
                <span>Store</span>
              </Link>
            </li>

            <li>
              <Link to="/about">
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <span>Contact Us</span>
              </Link>
            </li>
            {user && user !== "" && user !== null &&
              <>
                <li> <i>Welcome {user?.split(" ")?.[0]}
                </i></li>

                <li onClick={signOut}>
                  <a >
                    <span>Sign Out</span>
                  </a>
                </li></>}
          </ul>
        </div>
      </div>

      <header className="site-navbar" role="banner">
        <div style={{ backgroundColor: "#12af39" }} className="px-3">
          <div className="align-items-center justify-content-between d-flex">
            <div className="">
              <h1 className="mb-0 site-logo text-white">AgriConnect</h1>
            </div>
            <div className="d-none d-xl-block  ">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/store">
                      <span>Store</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/about">
                      <span>About</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span>Contact Us</span>
                    </Link>
                  </li>
                  {user && user !== "" && user !== null &&
                    <>
                      <li> <i>Welcome {user?.split(" ")?.[0]}
                      </i></li>

                      <li onClick={signOut}>
                        <a >
                          <span>Sign Out</span>
                        </a>
                      </li></>}
                </ul>
              </nav>
            </div>

            <div
              className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              style={{ position: "relative", top: "3px" }}
            >
              <a
                href="#"
                className="site-menu-toggle js-menu-toggle text-white"
              >
                <span className="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigator;
