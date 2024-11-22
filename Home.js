// Hàm chuyển đổi hình ảnh thành Base64
function convertImageToBase64(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Để lấy hình ảnh từ miền khác
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);

        };
        img.onerror = (error) => {
            console.error("Unable to load image:", error);
            reject(error);
        };
    });
}

// Hàm xử lý thêm sản phẩm vào giỏ hàng
async function buyProduct(productName, price, image) {
    try {
        // Lấy thông tin giỏ hàng từ localStorage, nếu chưa có thì khởi tạo mảng rỗng
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Nếu image là URL, chuyển đổi thành Base64
        let imageBase64 = image; // Giả định hình ảnh đã là Base64
        if (!image.startsWith('data:image')) {
            imageBase64 = await convertImageToBase64(image);
        }

        // Tạo đối tượng sản phẩm
        const product = {
            name: productName,
            price: price,
            image: imageBase64
        };
        
        // Thêm sản phẩm vào mảng giỏ hàng
        cartItems.push(product);
        
        // Lưu lại mảng giỏ hàng vào localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Thông báo cho người dùng
        alert(`${productName} has been added to cart!`);
        
         // Chuyển hướng đến trang mycart.html
         window.location.href = "Mycart.html"; // Chuyển hướng đến trang giỏ hàng
    } catch (error) {
        console.error("An error occurred while adding product to cart.:", error);
        alert("Unable to add product to cart. Please try again..");
    }
}