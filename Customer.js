document.addEventListener("DOMContentLoaded", function () {
    // Lấy thông tin người dùng từ localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    // Hiển thị thông tin khách hàng vào các thẻ <p>
    document.querySelector('#name-info').insertAdjacentHTML('afterend', `<span>${userData.username || "No information yet"}</span>`);
    document.querySelector('#date-info').insertAdjacentHTML('afterend', `<span>${userData.dateOfBirth || "No information yet"}</span>`);
    document.querySelector('#gender-info').insertAdjacentHTML('afterend', `<span>${userData.gender || "No information yet"}</span>`);
    document.querySelector('#phone-info').insertAdjacentHTML('afterend', `<span>${userData.phoneNumber || "No information yet"}</span>`);
    document.querySelector('#email-info').insertAdjacentHTML('afterend', `<span>${userData.email || "No information yet"}</span>`);
    document.querySelector('#address-info').insertAdjacentHTML('afterend', `<span>${userData.address || "No information yet"}</span>`);
    
    const orderHistoryTableBody = document.querySelector('#orderHistoryTable tbody');
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // Kiểm tra nếu có đơn hàng
    if (orders.length === 0) {
        orderHistoryTableBody.innerHTML = "<tr><td colspan='6'>No orders found.</td></tr>";
        return;
    }

    // Hiển thị từng đơn hàng trong bảng
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderNo}</td>
            <td>${order.customerName}</td>
            <td>${order.amount}</td>
            <td>${order.address}</td>
            <td>${order.orderDate}</td>
            <td>${order.status}</td>
        `;
        orderHistoryTableBody.appendChild(row);
    });
});