/* eslint-disable no-undef */
$(function () {
    // $.validator.setDefaults({
    //     submitHandler: function () {
    //         alert("Đăng nhập thành công!");
    //     }
    // });
    $('#quickForm').validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            },
        },
        messages: {
            usename: {
                required: "Nhập tên đăng nhập"
            },
            password: {
                required: "Nhập mật khẩu",
                minlength: "Mật khẩu ít nhất 6 ký tự"
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});