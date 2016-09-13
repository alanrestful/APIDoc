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
                $(".login-btn").addClass('hide');
                $(".logout-btn").removeClass('hide');
                $.cookie('user',data.user,{path:'/',expires:1});
                window.location.reload();
            } else {
                alert("login failed");
            }
        }
    })
};

var logoutEvent = function(e){
    e && e.preventDefault();
    $.ajax({
        url:'/users/logout',
        type:'POST',
        success:function(data){
            $.cookie('user',null,{expires:-1});
            window.location.reload();
        }
    })
};

var genCode = function(){
    // $.get('/users/code',function(data){
    //    console.log("123");
    // })
    $("#codeImg").removeAttr('src');
    $("#codeImg").attr('src','/users/code');
};

var clickCodeImgEvent = function(){
    genCode();
};

var submitRegister = function(){
    // event && event.preventDefault();
    debugger;
    this.registerForm = $('form.register-form');
    var data = this.registerForm.serialize();
    //验证
    $.ajax({
        url:'/users/register',
        type:'POST',
        data:data,
        success:function(data){
            if(data && data.success){
                alert('注册成功');
                $('#registerModal').modal('hide');
                $('#loginModal').modal('show');
            } else{
                alert(data.reason);
            }
        }
    })
}

$(function(){
    APP.init();
    // $('#registerModal').modal('show')
});

var APP = {
    init : function(){
        this.registerBtn = $('#registerBtn');
        this.codeImg = $('#codeImg');
        this.registerModal = $('#registerModal');
        this.bindEvent();
    },
    bindEvent: function(){
        this.codeImg.on('click',this.genCode);
        this.registerBtn.on('click',this.openRegisterEvent);
        this.registerModal.on('shown.bs.modal',this.registerFormShown);
    },
    submitRegister: function(){
        // event && event.preventDefault();
        this.registerForm = $('form.register-form');
        var data = this.registerForm.serialize();
        //验证
        $.ajax({
            url:'/users/register',
            type:'POST',
            data:data,
            success:function(data){
                console.log(data);
            }
        })
    },
    openRegisterEvent: function(){
        $('#loginModal').modal('hide');
        $('#registerModal').modal('show');
    },
    registerFormShown: function(){
        APP.genCode();
        $('#codeImg').on('click',this.genCode);
        var _this = this;
        $('button[name=register]').unbind('click').click(function(){
            submitRegister();
        })
    },
    genCode: function(){
        $("#codeImg").removeAttr('src');
        $("#codeImg").attr('src','/users/code?tm=' + new Date().getTime());
    }
};
