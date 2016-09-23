$(function(){
  $(".add-user-form").validator({
    isErrorOnParent: true
  });
  // $(document).on('submit', '.add-user-form', addUserEvent);
  // $(document).on('click', '.del-user', delUserEvent);
  // $(document).on('click', '.edit-user', editUserEvent);
});

var addUserEvent = function(event){
  event && event.preventDefault();
  var data = $(event.currentTarget).serializeJSON();
  var obj = {
    name: data.name,
    mobile: data.mobile,
    position: data.position
  }
  $.ajax({
      url: '/users',
      type: 'POST',
      data: obj,
      success:function(data){
        if(data.status){
          location.reload();
        }else{
          alert(data.messages);
        }
      }
  })
};

var editUserEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");

  var data ={
    id: id,
    env: env
  }
  $.ajax({
      url:'/projects/apps',
      type:'GET',
      data: data,
      success:function(data){
        // $('.modal-app-title').html('');
        // var html = '';
        // for(var i in data){
        //   html = html + '<li><a href="#">'+ data[i] +'</a></li>'
        // }
        // $('.modal-app-title').html(html);
        $('#selectApplicationModal').modal('show')
      }
  })

};

/* 删除用户 */
var delUserEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  if(confirm('确定要删除该项目吗？')){
    var data ={id: id}
    $.ajax({
        url:'/users',
        type:'DELETE',
        data: data,
        success:function(data){
          location.reload();
        }
    })
  }else{
    alert('取消了删除操作！');
  }
};
