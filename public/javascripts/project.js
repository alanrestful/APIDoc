$(function(){
  $(".create-project-form").validator({
    isErrorOnParent: true
  });
  $(document).on('click', '.del-project', delProjectEvent);
  $(document).on('click', '.env-app', getEnvAppsEvent);
  $(document).on('submit', '.create-project-form', createProjectEvent);
});

var createProjectEvent = function(event){
  event && event.preventDefault();
  var data = $(event.currentTarget).serializeJSON();

  var dev, test, pre, prod;
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
  $.ajax({
      url: '/projects',
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

var getEnvAppsEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  var env = $(event.currentTarget).data("env");
  var domain = $(event.currentTarget).data("domain");
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

var delProjectEvent = function(event){
  event && event.preventDefault();
  var id = $(event.currentTarget).data("id");
  if(confirm('确定要删除该项目吗？')){
    var data ={id: id}
    $.ajax({
        url:'/projects',
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
