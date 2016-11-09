$(function(){

  $(document).on('click', '.new-project', newProjectModalEvent);
  $(document).on('submit', '.create-project-form, .edit-project-form', createProjectEvent);
  $(document).on('click', '.edit-project', editProjectEvent);

  $(document).on('click', '.env-app', getEnvAppsEvent);
  $(document).on('click', '.add-app', addAppEvent);

  $(document).on('click', '.del-project', delProjectEvent);

  $(document).on('submit', '.create-app-form', createAppEvent);
});

/**
 * 新建项目弹窗
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var newProjectModalEvent= function(event){
  new $.Modal({
    content: Handlebars.templates.projects.createProject()
  }).show();
  $(".create-project-form").validator({
    isErrorOnParent: true
  });
};

/**
 * 创建或编辑项目
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var createProjectEvent = function(event){
  event && event.preventDefault();
  var data = $(event.currentTarget).serializeJSON();

  var env_json = [];
  env_json.push({name: "dev", domain: data.dev_domain});
  env_json.push({name: "test", domain: data.test_domain});
  env_json.push({name: "pre", domain: data.pre_domain});
  env_json.push({name: "prod", domain: data.prod_domain});

  var obj = {
    name: data.name,
    owner: data.owner,
    env_json: JSON.stringify(env_json)
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
        swal(data.messages);
      }
    }
  });
};

/**
 * 编辑项目弹窗
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var editProjectEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  $.ajax({
    url: '/api/projects/'+ id,
    type: 'GET',
    success:function(data){
      if(data.status){
        var result = data.result;

        var env = {};
        for(var i in result.env_json){
          env[result.env_json[i].name] = result.env_json[i].domain;
        }
        new $.Modal({
          content: Handlebars.templates.projects.editProject({"id": result._id, "name": result.name, "env": env})
        }).show();

      }else{
        swal(data.messages);
      }
    }
  });
};

/**
 * 获取项目指定环境app列表
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var selectAppModal;
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
        selectAppModal = new $.Modal({
          content: Handlebars.templates.projects.selectApp({"data": result, "id": id, "env": env})
        });
        selectAppModal.show();
      }else{
        swal(data.messages);
      }
    }
  });
};

/**
 * 创建应用弹框
 * @param {[type]} event [description]
 */
var addAppEvent = function(event){
  selectAppModal.hide();
  var id = $(event.currentTarget).data("id");
  var env = $(event.currentTarget).data("env");
  new $.Modal({
    content: Handlebars.templates.projects.createApp({"id": id, "env": env})
  }).show();
};

/**
 * 保存创建应用
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
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
          swal(data.messages);
        }
      }
  })
};

/**
 * 删除项目
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var delProjectEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  if(!confirm('确定要删除该项目吗？')) return;
  $.ajax({
    url:'/api/projects/' + id,
    type:'DELETE',
    success:function(data){
      if(data.status){
        location.reload();
      }else{
        swal(data.messages);
      }
    }
  });
};
