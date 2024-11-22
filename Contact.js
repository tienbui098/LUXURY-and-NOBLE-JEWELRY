document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.contact-form form'); // Chọn form
    const inputName = form.querySelector('input[type="text"]');
    const inputEmail = form.querySelector('input[type="email"]');
    const inputPhone = form.querySelector('input[type="tel"]');
    const textareaMessage = form.querySelector('textarea');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        // Kiểm tra xem các trường có bị thiếu không
        if (!inputName.value || !inputEmail.value || !textareaMessage.value) {
            alert("Please fill in all required fields!");
            return;
        }

        // Tạo đối tượng phản hồi
        const feedback = {
            name: inputName.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            message: textareaMessage.value,
        };

        // Lưu thông tin phản hồi vào localStorage
        let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedback);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

        // Thông báo thành công và làm mới form
        console.log("Before alert");
        alert("Thanks for your feedback.!");
        form.reset(); // Làm mới form
    });
});