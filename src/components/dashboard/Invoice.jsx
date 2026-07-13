import React, { useMemo } from "react";

const Invoice = ({ order }) => {

  const invoiceData = useMemo(() => {

    let subtotal = 0;

    for (const item of order.items) {
      subtotal += item.price * item.quantity;
    }

    let tax = subtotal * 0.15;
    let shipping = 100;

    let total = subtotal + tax + shipping;

    return {
      subtotal,
      tax,
      shipping,
      total
    };

  }, [order]);

  return (
    <div>

      <h2>Invoice #{order.id}</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <hr />

      <h4>Subtotal: ${invoiceData.subtotal}</h4>
      <h4>Tax: ${invoiceData.tax}</h4>
      <h4>Shipping: ${invoiceData.shipping}</h4>
      <h3>Total: ${invoiceData.total}</h3>

    </div>
  );
};

export default Invoice;