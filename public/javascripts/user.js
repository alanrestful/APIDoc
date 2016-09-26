$(function(){
  $(".add-user-form").validator({
    isErrorOnParent: true
  });
  $(document).on('submit', '.add-user-form', addUserEvent);
  $(document).on('click', '.del-user', delUserEvent);
  $(document).on('click', '.edit-user', editUserEvent);
});

/* 添加用户 */
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

/* 编辑用户 */
var editUserEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  alert('edit user');
};

/* 删除用户 */
var delUserEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  if(confirm('确定要删除该用户吗？')){
    var data ={id: id}
    $.ajax({
        url:'/users',
        type:'DELETE',
        data: data,
        success:function(data){
          location.reload();
        }
    })
  }
};
