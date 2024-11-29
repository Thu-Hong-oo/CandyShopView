import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faGooglePlusG,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${require("../assets/images/banner2.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Container
        fluid
        className="min-vh-80 d-flex flex-column justify-content-center bg-black bg-opacity-50 p-4 "
      >
        <Row className="mb-4">
          <Col md={3} className="d-flex flex-column">
            <img
              src={require("../assets/images/logo.png")}
              alt="Logo"
              className="mb-4"
              style={{ width: "100px", height: "auto" }}
            />
            <div>
              <p className="mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Số 09 Trần Thái Tông,
                P. Dịch Vọng, Q. Cầu Giấy, TP. Hà Nội
              </p>
              <p className="mb-2">
                <FontAwesomeIcon icon={faPhoneAlt} /> 0961452578
              </p>
              <p className="mb-2">
                <FontAwesomeIcon icon={faEnvelope} /> chocoshop@gmail.com
              </p>
            </div>
          </Col>

          <Col md={3} className="d-flex flex-column">
            <h5 className="font-weight-bold mb-3">CHÍNH SÁCH</h5>
            <p className="mb-2">Chính sách và quy định chung</p>
            <p className="mb-2">Chính sách giao dịch, thanh toán</p>
            <p className="mb-2">Chính sách đổi trả</p>
            <p className="mb-2">Chính sách bảo mật</p>
            <p className="mb-2">Chính sách vận chuyển</p>
          </Col>

          <Col md={3} className="d-flex flex-column">
            <h5 className="font-weight-bold mb-3">NHÓM</h5>
            <p className="mb-2">Các thành viên trong nhóm:</p>
            <p className="mb-2">Ngô Thiên Phú</p>
            <p className="mb-2">
              Nguyên Ngọc Tường Vân
            </p>
            <p className="mb-2">Nguyễn Thị thu Hồng</p>
            <p className="mb-2">
              Hồ Thị Thu Trầm
            </p>
          </Col>

          <Col md={3} className="d-flex flex-column">
            <h5 className="font-weight-bold mb-3">
              NHẬP EMAIL ĐỂ NHẬN KHUYẾN MÃI
            </h5>
            <Form>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn..."
                />
              </InputGroup>
            </Form>
            <Row className="mt-5">
              <div className="d-flex gap-2 flex-end">
                <a href="#" className="text-white">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="text-white">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="text-white">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="text-white">
                  <FontAwesomeIcon icon={faGooglePlusG} />
                </a>
                <a href="#" className="text-white">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
