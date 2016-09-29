$(function(){
  $(".create-project-form").validator({
    isErrorOnParent: true
  });
  $(document).on('click', '.del-project', delProjectEvent);
  $(document).on('click', '.edit-project', editProjectEvent);
  $(document).on('click', '.env-app', getEnvAppsEvent);
  $(document).on('click', '.add-app', addAppEvent);
  $(document).on('submit', '.create-project-form', createProjectEvent);
  $(document).on('submit', '.edit-project-form', createProjectEvent);
  $(document).on('submit', '.create-app-form', createAppEvent);
});

/* 创建项目 */
var createProjectEvent = function(event){
  event && event.preventDefault();
  var data = $(event.currentTarget).serializeJSON();

  var env_json = []
  if(typeof(data.dev)!=='undefined'){
    env_json.push({name: "dev", domain: data.dev_domain});
  }
  if(typeof(data.test)!=='undefined'){
    env_json.push({name: "test", domain: data.test_domain});
  }
  if(typeof(data.pre)!=='undefined'){
    env_json.push({name: "pre", domain: data.pre_domain});
  }
  if(typeof(data.prod)!=='undefined'){
    env_json.push({name: "prod", domain: data.prod_domain});
  }
  var obj = {
    name: data.name,
    owner: data.owner,
    env_json: env_json
  }
  if(data._id) obj['_id'] = data._id;
  $.ajax({
    url: '/api/projects',
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

/* 创建应用弹框 */
var addAppEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  var env = $(event.currentTarget).data("env");
  $("#addAppPid").val(id);
  $("#addAppEnv").val(JSON.stringify(env));
  $('#addAppModal').modal('show');
};

/* 编辑项目 */
var editProjectEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  $.ajax({
    url: '/api/projects/id/'+ id,
    type: 'GET',
    success:function(data){
      if(data.status){
        var result = data.result;
        $('#editProjectModal input[name=_id]').val(result._id);
        $('#editProjectModal input[name=name]').val(result.name);
        for(var i in result.env_json){
          $('#editProjectModal input[name='+ result.env_json[i].name +']').attr("checked", true).attr("onclick", 'return false;');
          $('#editProjectModal input[name='+ result.env_json[i].name +'_domain]').val(result.env_json[i].domain);
        }
        $('#editProjectModal').modal('show');
      }else{
        alert(data.messages);
      }
    }
  });
};

/* 保存创建应用 */
var createAppEvent = function(event){
  event && event.preventDefault();
  var data = $(event.currentTarget).serializeJSON();
  $.ajax({
      url: '/api/applications',
      type: 'POST',
      data: data,
      success:function(data){
        if(data.status){
          location.reload();
        }else{
          alert(data.messages);
        }
      }
  })
};

/* 获取项目指定环境app列表 */
var getEnvAppsEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  var env = $(event.currentTarget).data("env");
  var data ={id: id,env: env};
  $.ajax({
    url:'/api/applications',
    type:'GET',
    data: data,
    success:function(data){
      if(data.status){
        var result = data.result;
        $('.modal-app-title').html('');
        var html = '';
        for(var i in result){
          html = html + '<li><a href="/applications/id/'+ result[i]._id +'">'+ result[i].name +'</a></li>'
        }
        $('.modal-app-title').html(html);
        $('#selectApplicationModal').modal('show');
      }else{
        alert(data.messages);
      }
    }
  });
};

var delProjectEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  if(!confirm('确定要删除该项目吗？')) return;
  $.ajax({
    url:'/api/projects/id/' + id,
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
