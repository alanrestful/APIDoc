"use strict";

$(function(){
  load();
  $(document).on('click', '.edit-setting', editSettingEvent);
  $(document).on('submit', '.edit-env-form', saveSettingEvent);
  $(document).on('click', '.edit-group', editGroupEvent);
  $(document).on('click', '.del-group', delGroupEvent);
  $(document).on('click', '.edit-detail', editDetailEvent);
  $(document).on('click', '.del-detail', delDetailEvent);
  $(document).on('change', '#setting-name', settingChangeEvent);
});

var load = function(event){
  var id = localStorage.getItem('case-pid');
  var name = localStorage.getItem('case-name');
  var env = localStorage.getItem('case-env');
  var domain = localStorage.getItem('case-domain');
  if(id && name && env && domain){
    $('.setting-wait').addClass('hide');
    $('.setting-name').removeClass('hide');
    $('.setting-env').removeClass('hide');
    $('.setting-name').html(name);
    $('.setting-env').html(env);
  }
}

/* 编辑设置 */
var editSettingEvent = function(event){
  event && event.preventDefault();
  $.ajax({
    url: '/api/projects',
    type: 'GET',
    success: function(data){
      if(data.status){
        $("#setting-name").html('');
        $("#setting-env").html('<option>请选择</option>');
        var html = '<option>请选择</option>';
        for(var i in data.result){
          html = html + '<option value="'+ data.result[i]._id + "," + data.result[i].name +'" data-env=\''+ JSON.stringify(data.result[i].env_json) +'\'>'+ data.result[i].name +'</option>'
        }
        $("#setting-name").append(html);
      }
    }
  });
  $('#editSettingModal').modal('show');
};

var settingChangeEvent = function(event){
  event && event.preventDefault();
  var env = $("#setting-name").find("option:selected").data('env');
  var html = '';
  for(var i in env){
    var name;
    switch(env[i].name){
      case 'dev':
        name = '开发环境';
        break;
      case 'test':
        name = '测试环境';
        break;
      case 'pre':
        name = '预发环境';
        break;
      case 'prod':
        name = '生产环境';
        break;
      default:
        break;
    }
    html = html + '<option value="'+ name + "," + env[i].domain +'">'+ name +'</option>'
  }
  $("#setting-env").html(html);
};

var saveSettingEvent = function(event){
  event && event.preventDefault();
  var data = $(event.currentTarget).serializeJSON();
  var arr1 = data.id.split(",");
  var arr2 = data.env.split(",");
  localStorage.setItem("case-pid", arr1[0]);
  localStorage.setItem("case-name", arr1[1]);
  localStorage.setItem("case-env", arr2[0]);
  localStorage.setItem("case-domain", arr2[1]);
  $('#editSettingModal').modal('hide');
  window.location.reload();
};

/* 编辑分组 */
var editGroupEvent = function(event){
  event && event.preventDefault();
  alert("edit group");
};

/* 删除分组 */
var delGroupEvent = function(event){
  event && event.preventDefault();
  alert("del group");
};

/* 编辑详情 */
var editDetailEvent = function(event){
  event && event.preventDefault();
  alert("edit detail");
};

/* 删除详细 */
var delDetailEvent = function(event){
  event && event.preventDefault();
  alert("del detail");
};
