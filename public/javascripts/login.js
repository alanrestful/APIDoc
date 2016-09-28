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
            window.location.reload();
        }
    })
};

var submitRegister = function(){
    var data = $('form.register-form').serializeJSON();
    //验证
    $.ajax({
        url: '/users/register',
        type: 'POST',
        data: JSON.stringify(data),
        success: function(data){
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

    },
    submitRegister: function(){
        var data = $('form.register-form').serializeJSON();
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
(function() {
    this.pagination = $(".pagination");
    if (!this.pagination) {
        return;
    }
    this.total = this.pagination.data('total');
    var pageNo = parseInt(getQueryString('page')) || 1;
    var pageSize = getQueryString('size') || 10;
    var pageUnit = "<li  class='%class%'><a href='javascript:;'>%text%</a></li>";
    this.pagination.append(pageUnit.replace('%text%','<').replace('%class%','pre'))
        .append(pageUnit.replace('%text%',pageNo).replace('%class%','active'))
        .append(pageUnit.replace('%text%',pageNo + 1))
        .append(pageUnit.replace('%text%',pageNo + 2))
        .append(pageUnit.replace('%text%',pageNo + 3))
        .append(pageUnit.replace('%text%',pageNo + 4))
        .append(pageUnit.replace('%text%','>').replace('%class%','next'));

    if (pageNo == 1) {
        this.pagination.find('li').first().addClass('disabled');
    }
    this.pagination.find('li').click(function(e) {
        var page = $(this).text();
        if ($(this).hasClass('pre')) {
            page = pageNo - 1;
        }
        if ($(this).hasClass('next')) {
            page = pageNo + 1;
        }
        var origin = location.href;
        var target = origin.split('page=' + pageNo).join('page=' + page);
        location.href = target;
    })
})();

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
