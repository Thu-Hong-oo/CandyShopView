import React, { useState } from "react";
import "../assets/css/ProductPage.css"; // Đảm bảo tạo file CSS riêng hoặc thêm vào index.css
import "../App.css";
const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="container">
      <div className="productShow">
        <div className="left-column">
          <img
            src="https://storage.googleapis.com/a1aa/image/XVQxdVxA1Ia8OdcAiZebNLqIqIYSQVFgJ4bEw0Ro7bPKJl6JA.jpg"
            alt="Tiramisu Cake Mousse"
            className="product-image"
          />
          <img
            src="https://storage.googleapis.com/a1aa/image/sUCaFzsvMPpJGttVlQNtZFUyJjzgBx5tAn2NfmWAgPrJJl6JA.jpg"
            alt="Tiramisu Cake Mousse Thumbnail"
            className="product-thumbnail"
          />
        </div>
        <div className="right-column">
          <h2 className="product-title">TIRAMISU CAKE MOUSSE</h2>
          <p className="product-code">Mã sản phẩm: BSN08</p>
          <p className="product-price">Giá 360,000₫</p>

          <div className="quantity">
            <span>Số lượng</span>
            <button onClick={decreaseQuantity}>-</button>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
            />
            <button onClick={increaseQuantity}>+</button>
          </div>

          <div className="buttons">
            <button className="btn btn-add-to-cart">THÊM VÀO GIỎ HÀNG</button>
            <button className="btn btn-buy-now">MUA NGAY</button>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          MÔ TẢ CHUNG
        </div>
        <div
          className={`tab ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          BÌNH LUẬN
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "description" && (
          <div>
            <p>- GATO</p>
            <p>- CREAM CHEESE PHOMAI</p>
            <p>
              BÁNH ĐƯỢC LÀM TỪ 3 LỚP GATO KẾT HỢP VỚI LỚP CREAM CHEESE, PHOMAI.
              PHỦ MẶT BÁNH 1 LỚP BỘT CACAO VÀ TRANG TRÍ HOA QUẢ.
            </p>
          </div>
        )}
        {activeTab === "comments" && <p>Bình luận sẽ hiển thị tại đây...</p>}
      </div>
    </div>
  );
};

export default ProductPage;
