"use strict";

$(function(){
  $(document).on('click', '.edit-setting', editSettingEvent);
  $(document).on('submit', '.edit-setting-form', saveSettingEvent);
  $(document).on('click', '.edit-group', editGroupEvent);
  $(document).on('click', '.del-group', delGroupEvent);
  $(document).on('click', '.edit-detail', editDetailEvent);
  $(document).on('click', '.del-detail', delDetailEvent);
  $(document).on('change', '#setting-name', settingNameOnchangeEvent);
});

/* 编辑设置 */
var editSettingEvent = function(event){
  event && event.preventDefault();
  $.ajax({
    url: '/api/projects',
    type: 'GET',
    success: function(data){
      if(data.status){
        $("#setting-name").html('');
        var html = '<option>请选择</option>';
        for(var i in data.result){
          html = html + '<option value="'+ data.result[i]._id +'" data-env="'+ JSON.stringify(data.result[i].env_json) +'">'+ data.result[i].name +'</option>'
        }
        $("#setting-name").append(html);
      }
    }
  });
  $('#editSettingModal').modal('show');
};

var settingNameOnchangeEvent = function(event){
  event && event.preventDefault();
  alert(JSON.stringify($(event.currentTarget)));
};

var saveSettingEvent = function(event){
  event && event.preventDefault();
  $('#editSettingModal').modal('show');
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
