import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  toggleSelectProduct,
} from "../redux/slices/cartSlice";

const Checkout = () => {
  const ship = 25000;
  const { cartItems } = useSelector((state) => state.cart); // Lấy giỏ hàng từ Redux
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(null); // Trạng thái cho thông báo xác nhận

  // Tính tổng giá tiền các sản phẩm được chọn
  const calculateSelectedTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.selected) {
        return total + (item.currentPrice?.newPrice || 0) * item.quantity;
      }
      return total;
    }, 0);
  };

  const selectedTotal = calculateSelectedTotal();

  return (
    <div className="container my-4 min-vh-100">
      <div className="card p-4 shadow-sm">
        {/* Header */}
        <div className="row mb-4">
          <div className="col">
            <a href="/product" className="text-secondary">
              Continue Shopping
            </a>
          </div>
          <div className="text-center">
            <h2>Giỏ hàng của tôi</h2>
          </div>
        </div>
        <hr />

        {/* Product List */}
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div
                className="row border-bottom py-3 align-items-center position-relative"
                key={item.productId}
              >
                {/* Checkbox để chọn sản phẩm */}
                <div className="col-1">
                  <input
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={() =>
                      dispatch(toggleSelectProduct(item.productId))
                    }
                  />
                </div>

                <div className="col-md-5 d-flex align-items-center">
                  <img
                    src={item.mainImageUrl}
                    alt={item.productName}
                    className="img-thumbnail mr-3"
                    style={{ width: "100px" }}
                  />
                  <div>
                    <h5>{item.productName}</h5>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1">Giá</p>
                    <p className="font-weight-bold">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        (item.currentPrice?.newPrice || 0) * item.quantity
                      )}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            delta: -1,
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity || 0}
                      className="form-control text-center mx-2"
                      style={{ width: "50px" }}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            delta: 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => setConfirmDelete(item.productId)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="col-md-4 mt-4">
            <div className="card p-3">
              <h4>Thanh toán</h4>
              <div className="d-flex justify-content-between mt-2">
                <strong>Tiền ship</strong>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(ship)}
                </strong>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <strong>Tổng</strong>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(selectedTotal)}
                </strong>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <strong>Tổng thanh toán</strong>
                <strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(selectedTotal + ship)}
                </strong>
              </div>
              <button
                className="mt-5 p-2 text-white"
                style={{
                  backgroundColor: "#ECB159",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Delete Popup */}
      {confirmDelete && (
        <div
          className="position-fixed d-flex justify-content-center align-items-center"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            style={{
              minWidth: "300px",
            }}
          >
            <p className="mb-3">Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            <div className="d-flex justify-content-end ml-2">
              <button
                className="btn btn-secondary btn-sm "
                onClick={() => setConfirmDelete(null)}
              >
                Hủy
              </button>
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => {
                  dispatch(removeFromCart(confirmDelete));
                  setConfirmDelete(null);
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
