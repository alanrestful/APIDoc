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
  $(document).on('click', '.detail-left ul li', fragmentEvent);
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

/**
 * 点击模版组事件
 */
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
          $('.detail-left ul').append('<li data-name=\"'+ result[i].name +'\" data-id=\"'+ result[i]._id +'\"><div class="model-obj"><input type="radio" name="radio-obj" /></div><div class="model-obj"><div class="name">'+ result[i].name +'</div><div class="time"><i class="iconfont icon-shijian"></i> '+ time +' <i class="iconfont icon-ren"></i> Leo</div></div><div class="model-obj"><a tabindex="0" class="btn btn-sm btn-default" role="button" data-toggle="popover" data-trigger="focus" title="用例列表" data-placement="bottom" data-html="true" data-content="<p>s</p><p>ss</p>">用例</a></div></li>')
        }
      }else
          $('.detail-left ul').html('<li><div style="line-height: 50px;padding: 0;margin: 0 auto;color: #A8A8A8;padding-left: 70px;"><i class="iconfont icon-nanguo"></i> 暂无数据</div></li>');
      }
      $(".detail-right").html('<div style="line-height: 50px;padding: 0;margin: 0 auto;color: #A8A8A8;padding-left: 50px;"><i class="iconfont icon-nanguo"></i>  您还没有选择用例，或者所选用例暂无数据~</div>');
      $("[data-toggle='popover']").popover();
    }
  });

}

/**
 * 点击用例模版显示详情
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var fragmentEvent = function(event){
  var id = $(event.currentTarget).data('id');
  var name = $(event.currentTarget).data('name');
  $(".detail-left ul li").find('input[type=radio]').attr('checked', false);
  $(event.currentTarget).find('input[type=radio]').attr('checked', 'checked');
  $.ajax({
    url: '/api/cases/model?mid='+id,
    type: 'GET',
    success: function(data){
      if(data.status){
        $('.detail-right').html('<div class="model">'+ name +'</div>');
        var obj = JSON.parse(data.result.fragment)
        for(var i in obj){
          var html = '<header><div class="title">'+ obj[i].path +'<span>json</span></div><div class="result">预期结果：以下报错均出现</div></header><ul>';
          for(var a in obj[i].tArray){
            var frag = obj[i].tArray[a];
            html += '<li><div class="path"><span><i class="iconfont icon-dingwei"></i> '+ frag.xPath +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.className +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.id +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.name +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.tagName +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.value +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.type +'</span>';
            html +='</div><div class="info">请输入至少6位且含字母的密码</div></li>';
          }
          html += '</ul>';
          $('.detail-right').append(html);
        }
      }
    }
  });

}

/**
 * 初始化加载模版组
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
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

/**
 * 编辑设置
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
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

/**
 * 设置中的二级联动
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
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

/**
 * 保存设置到本地
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
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

/**
 * 编辑分组
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var editGroupEvent = function(event){
  alert("edit group");
};

/**
 * 删除分组
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var delGroupEvent = function(event){
  var gid = $("#template ul .active").data('id');
  if(typeof(gid) === 'undefined'){
    swal("请选择组！");
    return;
  }
  swal({title: "确认删除组吗？",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    closeOnConfirm: false,
    closeOnCancel: true },
    function(isConfirm){
      if (isConfirm) {
      $.ajax({
        url: '/api/cases/groups?gid='+ gid,
        type: 'DELETE',
        success: function(data) {
          if(data.status){
            window.location.reload();
          }else{
            swal(data.messages);
          }
        }
      });
      swal("Deleted!", "Your imaginary file has been deleted.", "success");
    }
  });

};

/**
 * 编辑详情
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var editDetailEvent = function(event){
  alert("edit detail");
};

/**
 * 删除详细
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var delDetailEvent = function(event){

  alert("del detail");
};
