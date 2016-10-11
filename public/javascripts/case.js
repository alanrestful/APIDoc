"use strict";

$(function(){
  load();
  $(document).on('click', '.edit-setting', editSettingEvent);
  $(document).on('submit', '.edit-env-form', saveSettingEvent);
  $(document).on('click', '.edit-group', editGroupEvent);
  $(document).on('click', '.del-group', delGroupEvent);
  $(document).on('click', '.edit-detail', editDetailEvent);
  $(document).on('click', '.del-detail', delDetailEvent);
  $(document).on('click', '.tab-pane ul li', groupEvent);
  $(document).on('change', '#setting-name', settingChangeEvent);
});


Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

// 点击模版组事件
var groupEvent = function(event){
  event && event.preventDefault();
  $('.tab-pane ul li').removeClass('active');
  $(event.currentTarget).addClass('active');
  var gid = $(event.currentTarget).data('id');
  $.ajax({
    url: '/api/cases/models?gid='+ gid,
    type: 'GET',
    success: function(data) {
      if(data.status && data.result.length){
        var result = data.result;
        $('.detail-left ul').html('');
        for(var i in result){
          var time =new Date(Date.parse(result[i].updated_at)).format('yyyy-MM-dd hh:mm:ss');
          $('.detail-left ul').append('<li data-fragment=\''+ result[i].fragment +'\'><input type="radio" name="radio-obj" /><div class="group-obj"><div class="name">'+ result[i].name +'</div><div class="time"><i class="iconfont icon-shijian"></i> '+ time +' <i class="iconfont icon-ren"></i> Leo</div></div></li>')
        }
      }else if(data.status){
          $('.detail-left ul').html('<li><div style="line-height: 50px;padding: 0;margin: 0 auto;color: #A8A8A8;padding-left: 70px;"><i class="iconfont icon-nanguo"></i> 暂无数据</div></li>');
      }else{
        console.log(data.messages);
      }
    }
  });
}

// 初始化加载模版组
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
    $.ajax({
      url: '/api/cases/groups?pid='+ id,
      type: 'GET',
      success: function(data) {
        if(data.status && data.result.length){
          var result = data.result;
          $('#template ul').html('');
          for(var i in result){
            var time =new Date(Date.parse(result[i].updated_at)).format('yyyy-MM-dd hh:mm:ss');
            $('#template ul').append('<li data-id="'+ result[i]._id +'"><div class="group-obj"><div class="name">'+ result[i].name +'</div><div class="time"><i class="iconfont icon-shijian"></i> 最后修改：'+ time +'</div></div></li>')
          }
          $('#case ul').html('');
          for(var i in result){
            var time =new Date(Date.parse(result[i].updated_at)).format('yyyy-MM-dd hh:mm:ss');
            $('#case ul').append('<li data-id="'+ result[i]._id +'"><div class="group-obj"><div class="name">'+ result[i].name +'</div><div class="time"><i class="iconfont icon-shijian"></i> 最后修改：'+ time +'</div></div></li>')
          }
        }else{
          console.log(data.messages);
        }
      }
    });
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
        $("#setting-name").html('<option>请选择</option>');
        $("#setting-env").html('<option>请选择</option>');
        var html = '';
        for(var i in data.result){
          html = html + '<option value="'+ data.result[i]._id + "," + data.result[i].name +'" data-env=\''+ JSON.stringify(data.result[i].env_json) +'\'>'+ data.result[i].name +'</option>'
        }
        $("#setting-name").append(html);
      }
    }
  });
  $('#editSettingModal').modal('show');
};

// 设置中的二级联动
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

// 保存设置到本地
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
  alert("edit group");
};

/* 删除分组 */
var delGroupEvent = function(event){
  var gid = $("#template ul .active").data('id');
  if(typeof(gid) === 'undefined'){
    alert('请选择组！');
  }
  if(confirm('确定删除组吗')){
    $.ajax({
      url: '/api/cases/groups?gid='+ gid,
      type: 'DELETE',
      success: function(data) {
        if(data.status){
          window.location.reload();
        }else{
          console.log(data.messages);
        }
      }
    });
  }
};

/* 编辑详情 */
var editDetailEvent = function(event){
  alert("edit detail");
};

/* 删除详细 */
var delDetailEvent = function(event){

  alert("del detail");
};
