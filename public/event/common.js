/**
 * Created by macbook on 16/9/12.
 */
$(function(){
    $(".logout").click(logoutEvent);
});

var logoutEvent = function(e){
    e && e.preventDefault();
    $.ajax({
        url:'/users/logout',
        type:'POST',
        success:function(data){
            $.cookie('user',null,{path:'/',expires:-1});
            window.location.reload();
        }
    })
};