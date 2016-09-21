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

var submitRegister = function(){
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
        registerValidator();
    },
    submitRegister: function(){
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

var registerValidator = function(){
    $('#register-form')
        .bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {/*input状态样式图片*/
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {/*验证：规则*/
                userName: {//验证input项：验证规则
                    message: 'The username is not valid',

                    validators: {
                        notEmpty: {//非空验证：提示消息
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '用户名长度必须在6到30之间'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '用户名由数字字母下划线和.组成'
                        }
                    }
                },
                password: {
                    message:'密码无效',
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '用户名长度必须在6到30之间'
                        },
                        identical: {//相同
                            field: 'password', //需要进行比较的input name值
                            message: '两次密码不一致'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        }
                    }
                },
                password2: {
                    message: '密码无效',
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '用户名长度必须在6到30之间'
                        },
                        identical: {//相同
                            field: 'password',
                            message: '两次密码不一致'
                        },
                        regexp: {//匹配规则
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮件不能为空'
                        },
                        emailAddress: {
                            message: '请输入正确的邮件地址如：123@qq.com'
                        }
                    }
                },
                mobile: {
                    message: 'The phone is not valid',
                    validators: {
                        notEmpty: {
                            message: '手机号码不能为空'
                        },
                        stringLength: {
                            min: 11,
                            max: 11,
                            message: '请输入11位手机号码'
                        },
                        regexp: {
                            regexp: /^1[3|5|8]{1}[0-9]{9}$/,
                            message: '请输入正确的手机号码'
                        }
                    }
                },
            }
        }).on('success.form.bv',function(e){
            e.preventDefault();

    })
}
