document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutButton = document.querySelector('.continue-checkout');

    // Kiểm tra nếu giỏ hàng trống
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Hiển thị sản phẩm trong giỏ hàng
    cartItems.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            </div>
            <button class="remove-item" data-index="${index}">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // Tính toán tổng giá trị
    updateTotalPrice();

    // Xử lý sự kiện xóa sản phẩm
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            location.reload(); // Tải lại trang để cập nhật giỏ hàng
        }
    });

    // Xử lý nút Checkout
    checkoutButton.addEventListener('click', function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Lấy thông tin khách hàng từ localStorage
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        const orderData = {
            orderNo: Date.now(),
            customerName: userData.username || "username",
            amount: cartItems.length,
            address: userData.address || "address",
            orderDate: new Date().toLocaleString(),
            status: "Processing"
        };

        console.log(orderData);

        // Lưu dữ liệu đơn hàng vào localStorage
        const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orders.push(orderData);
        localStorage.setItem('orderHistory', JSON.stringify(orders));

        // Xóa thông tin giỏ hàng khỏi localStorage
        localStorage.removeItem('cartItems');

        // Chuyển hướng đến trang Customer
        window.location.href = "Customer.html";
    });

    function updateTotalPrice() {
        // Đảm bảo giá trị price là số
        const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);
        document.querySelector('.subtotal-price').textContent = `$${totalPrice.toFixed(2)}`;
        document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }
});