$(function(){
  $(".add-user-form").validator({
    isErrorOnParent: true
  });
  $(document).on('submit', '.add-user-form', addUserEvent);
  $(document).on('submit', '.edit-user-form', addUserEvent);
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
  };
  if(data._id) obj['_id'] = data._id;
  $.ajax({
    url: '/api/users',
    type: data._id ? 'PUT': 'POST',
    data: obj,
    success:function(data){
      if(data.status){
        location.reload();
      }else{
        alert(data.messages);
      }
    }
  });
};

/* 编辑用户 */
var editUserEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  $.ajax({
    url: '/api/users/id/'+ id,
    type: 'get',
    success:function(data){
      if(data.status){
        var result = data.result;
        $('#editUserModal input[name=_id]').val(result._id);
        $('#editUserModal input[name=name]').val(result.name);
        $('#editUserModal input[name=mobile]').val(result.mobile);
        $("#editUserModal").modal("show");
      }else{
        alert(data.messages);
      }
    }
  });
};

/* 删除用户 */
var delUserEvent = function(event){
  event && event.preventDefault();
  if(!confirm('确定要删除该用户吗？')) return;
  var id = $(event.currentTarget).data("id");
  $.ajax({
    url:'/api/users/id/' + id,
    type:'DELETE',
    success:function(data){
      if(data.status){
        location.reload();
      }else{
        alert(data.messages);
      }
    }
  });
};
