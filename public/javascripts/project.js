$(function(){
  $("form").validator({
    isErrorOnParent: true
  });
  $(document).on('click', '.del-project', delProjectEvent);
});

var delProjectEvent = function(e){
  e && e.preventDefault();
  var id = $(event.currentTarget).data("id");
  alert(id);
    // $.ajax({
    //     url:'/users/logout',
    //     type:'POST',
    //     success:function(data){
    //         $.cookie('user',null,{path:'/',expires:-1});
    //         window.location.reload();
    //     }
    // })
};
