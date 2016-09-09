/**
 * Created by macbook on 16/9/8.
 */
var loginEvent = function(e) {
    e.preventDefault();
    var data = $(".login-form").serialize();
    $.ajax({
        url:'/users/login',
        type:'POST',
        data:data,
        success:function (data) {
            if (data) {
                $(".login-modal").modal('hide');
            } else {
                alert("login failed");
            }
        },
    })
};