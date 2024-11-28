import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../assets/css/product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12; // Số lượng sản phẩm tối đa trên mỗi trang
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products?page=${page}&limit=${limit}`
      );
      const data = response.data.data;
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo đang tải
  }

  return (
    <div className="container-fluid px-0">
      <Header />
      <div className="product">
        <h3>Sản Phẩm</h3>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product.productId}>
                <img
                  src={product.mainImageUrl}
                  alt={product.productName}
                  className="product-image"
                />
                <h3 className="product-name">{product.productName}</h3>
                  <p className="product-price">
                    {product.currentPrice.newPrice.toLocaleString()} VND
                </p>
                <div className="overlay">
                  <h3 className="product-name">Xem chi tiết</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>Không có sản phẩm nào.</p>
            </div>
          )}
        </div>

        {/* Hiển thị thanh chọn trang nếu có nhiều hơn 1 trang */}
        {totalPages > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  className={`page-item ${
                    currentPage === index ? "active" : ""
                  }`}
                  key={index}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Product;
