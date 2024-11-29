import React, { useState, useEffect, useRef } from "react";
import "../assets/css/signIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // State to hold error message
  const formRef = useRef(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("token", data.data.token); // Lưu token vào localStorage
        setError(""); // Xóa lỗi trước đó
        navigate("/product"); // Chuyển hướng người dùng đến trang sản phẩm
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Network error, please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: formRef.current.offsetTop, behavior: "smooth" });
  }, []);

  return (
    <div className=" container-fluid px-0 ">
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          {/* Left */}
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="featured-image mb-3">
              <img
                src={require("../assets/images/experience-gfx.webp")}
                alt="Experience"
                className="img-fluid"
                style={{ width: "500px" }}
              />
            </div>
          </div>

          {/* Right */}
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4 text-center">
                <h2>Chào mừng bạn trở lại</h2>
                <p>Sô cô la – một món quà ngọt ngào dành cho chính bạn.</p>
              </div>

              {/* Form đăng nhập */}
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    name="username"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required // Thêm thuộc tính required
                  />
                </div>

                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    name="password"
                    placeholder="Mật Khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required // Thêm thuộc tính required
                  />
                </div>

                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="formCheck"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label
                      htmlFor="formCheck"
                      className="form-check-label text-secondary"
                    >
                      <small>Ghi nhớ mật khẩu</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small>
                      <a href="/forgot-password">Quên mật khẩu?</a>{" "}
                      {/* Cập nhật đường dẫn */}
                    </small>
                  </div>
                </div>

                {/* Hi ển thị thông báo lỗi nếu đăng nhập thất bại */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-dark w-100 fs-6"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>

              <div className="row">
                <small>
                  Bạn chưa có tài khoản?
                  <a href="/sign-up" name="signUp">
                    {/* Cập nhật đường dẫn */}
                    Đăng ký
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
