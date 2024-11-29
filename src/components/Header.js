import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/header.css";

const Header = () => {
  const [cartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn]= useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/categories");
        const data = await response.json();
        if (response.ok) {
          console.log("Categories fetched:", data.data);
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const checkLoginStatus=()=>{
      const user= localStorage.getItem("userId");
      setIsLoggedIn(user?true:false);
    };
    checkLoginStatus();
  }, []);

  const handleCategoryHover = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/categories/${categoryId}/subcategories`
      );
      const data = await response.json();
      if (response.ok) {
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: data.data,
        }));
      } else {
        console.error("Failed to fetch subcategories:", data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };



  return (
    <div className="container-fluid px-0">
      <div className="row header">
        <div className="d-flex menuTren ">
          <img
            src={require("../assets/images/logo.png")}
            alt="Logo"
            className="logoImg"
          />
          <div className="search d-flex">
            <input
              type="text"
              className="input form-control"
              placeholder="Tìm kiếm ..."
            />
            <button className="buttonSearch">
              <i className="fa fa-search"></i>
            </button>
          </div>

          <div className="link flex-grow-1">
            <nav className="navbar navbar-expand">
              <ul className="navbar-nav flex-grow-1 justify-content-between px-5">
                <li className="nav-item">
                  <a className="nav-link" href="/sign-in">
                    <i className="fa fa-phone"></i>
                    <span>0389780271</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={isLoggedIn?"/profile":"/sign-in"}>
                    <i className="fa fa-user"></i>
                    <span>Tài Khoản</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/sign-in">
                    <i className="fa fa-shopping-cart position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    </i>
                    <span>Giỏ hàng</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="menuDuoi">
          <nav className="navbar navbar-expand-sm menuHeader navbar-dark">
            <div className="container-fluid">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item text-center">
                    <a className="nav-link" href="/#">
                      Trang chủ
                    </a>
                  </li>
                  {[...categories].reverse().map((category) => (
                    <li
                      className="nav-item text-center"
                      key={category.categoryId}
                      onMouseEnter={() => {
                        setHoveredCategory(category.categoryId);
                        handleCategoryHover(category.categoryId);
                      }}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <a className="nav-link text-center" href="/#">
                        {category.categoryName}
                      </a>
                      {hoveredCategory === category.categoryId &&
                        subCategories[category.categoryId] && (
                          <ul className="dropdown-menu sub-menu text-center">
                            {subCategories[category.categoryId].map(
                              (subCategory) => (
                                <li key={subCategory.subCategoryId}>
                                  <a
                                    class="dropdown-item"
                                    href={`/sub-category/${subCategory.subCategoryId}`}
                                  >
                                    {subCategory.subCategoryName}
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
