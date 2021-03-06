"use strict";
$(function(){
  load();
  $(document).on('click', '.edit-setting', editSettingEvent);
  $(document).on('submit', '.edit-env-form', saveSettingEvent);
  $(document).on('click', '.del-group', delGroupEvent);

  $(document).on('click', '.tab-pane ul li', groupEvent);
  $(document).on('click', '.detail-left ul li .radio-click', fragmentEvent);
  $(document).on('change', '#setting-name', settingChangeEvent);
  $(document).on('click', '.case-detail-btn', caseDetailAction);
  $(document).on('click', '.popover-content p', popoverAction);

  $(document).on('click', '.import-case', importCaseEvent);
});

/* 创建应用弹框 */
var importCaseEvent = function(event){
  var id = $(".detail-left ul li .radio-click").find('input[type=radio][checked=checked]').closest("li").data("id");
  if(!id){
    alert("请选择用例");
    return;
  }
  $("#importCaseDataId").val(id);
  $('#importCaseModal').modal('show');
};

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
  var gname = $(event.currentTarget).data('name');
  $.ajax({
    url: '/api/cases/models?gid='+ gid,
    type: 'GET',
    success: function(data) {
      if(data.status && data.result.length){
        var result = data.result;
        $('.detail-left ul').html('');
        for(var i in result){
          var time =new Date(Date.parse(result[i].updated_at)).format('yyyy-MM-dd hh:mm:ss');
          $('.detail-left ul').append('<li data-name="'+ result[i].name +'" data-id="'+ result[i]._id +'"><div class="radio-click"><div class="model-obj"><input type="radio" name="radio-obj" /></div><div class="model-obj"><div class="name">'+ result[i].name +'</div><div class="time"><i class="iconfont icon-shijian"></i> '+ time +' <i class="iconfont icon-ren"></i> Leo</div></div></div><div class="model-obj"><a tabindex="0" class="case-detail-btn" role="button" data-toggle="popover" data-trigger="focus" title="用例列表" data-placement="bottom" data-html="true" data-id="'+ result[i]._id +'"><i class="iconfont icon-gengduo"></i></a></div></li>')
        }
      }else{
          $('.detail-left ul').html('<li><div style="line-height: 50px;padding: 0;margin: 0 auto;color: #A8A8A8;padding-left: 70px;"><i class="iconfont icon-nanguo"></i> 暂无数据</div></li>');
      }
      $('.detail-group-name').html(gname + '（'+ data.result.length +'）');
      $(".detail-right").html('<div style="line-height: 50px;padding: 0;margin: 0 auto;color: #A8A8A8;padding-left: 50px;"><i class="iconfont icon-nanguo"></i>  您还没有选择用例，或者所选用例暂无数据~</div>');
      $("[data-toggle='popover']").popover();
    }
  });
}

/**
 * 点击用例按钮显示用例列表
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var caseDetailAction = function(event){
  var mid = $(event.currentTarget).data('id');
  $.ajax({
    url: '/api/cases/datas?mid='+ mid,
    type: 'GET',
    async: false,
    success: function(data) {
      if(data.status){
        var html = '';
        for(var d in data.result){
          html += '<p data-id="'+ data.result[d]._id +'">'+ data.result[d].name +'</p>';
        }
      }
      $(event.currentTarget).next().find('.popover-content').html(html);
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
  var id = $(event.currentTarget).parent().data('id');
  var name = $(event.currentTarget).parent().data('name');
  $(".detail-left ul li .radio-click").find('input[type=radio]').attr('checked', false);
  $(event.currentTarget).find('.model-obj input[type=radio]').attr('checked', 'checked');
  $.ajax({
    url: '/api/cases/model?mid='+id,
    type: 'GET',
    success: function(data){
      if(data.status){
        $('.detail-right').html('<div class="model">'+ name +'</div>');
        var obj = JSON.parse(data.result.fragment)
        for(var i in obj){
          var html = '<header><div class="title">'+ obj[i].path +'<span>json</span></div><div class="result">预期结果：...</div></header><ul>';
          for(var a in obj[i].tArray){
            var frag = obj[i].tArray[a];
            html += '<li><div class="path"><span><i class="iconfont icon-dingwei"></i> '+ frag.xPath +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.className +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.id +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.name +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.tagName +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.value +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.type +'</span>';
            html +='</div><div class="info">预期：...</div></li>';
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
            $('#template ul').append('<li data-name="'+ result[i].name +'" data-id="'+ result[i]._id +'"><div class="group-obj"><div class="name">'+ result[i].name +'</div><div class="time"><i class="iconfont icon-shijian"></i> 最后修改：'+ time +'</div></div></li>')
          }
          $('#case ul').html('');
          for(var i in result){
            var time =new Date(Date.parse(result[i].updated_at)).format('yyyy-MM-dd hh:mm:ss');
            $('#case ul').append('<li data-name="'+ result[i].name +'" data-id="'+ result[i]._id +'"><div class="group-obj"><div class="name">'+ result[i].name +'</div><div class="time"><i class="iconfont icon-shijian"></i> 最后修改：'+ time +'</div></div></li>')
          }
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
 * 点击用例显示 用例模版+用例数据
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var popoverAction = function(event){
  var did = $(event.currentTarget).data('id');
  $(".detail-left ul li .radio-click").find('.model-obj input[type=radio]').attr('checked', false);
  $(event.currentTarget).closest('.model-obj').prev().find('.model-obj input[type=radio]').attr('checked', 'checked');
  var name = $(event.currentTarget).closest('.model-obj').parent().data('name');
  $.ajax({
    url: '/api/cases/data?did='+did,
    type: 'GET',
    success: function(data){
      if(data.status){
        $('.detail-right').html('<div class="model">'+ name +'</div>');
        var obj = JSON.parse(data.result.model.fragment)
        var hashArr = JSON.parse(data.result.data.data);
        for(var i in obj){
          var html = '<header><div class="title">'+ obj[i].path +'<span>json</span></div><div class="result">预期结果：'+ hashArr[obj[i].hash].expect +'</div></header><ul>';
          for(var a in obj[i].tArray){
            var frag = obj[i].tArray[a];
            html += '<li><div class="path"><span><i class="iconfont icon-dingwei"></i> '+ frag.xPath +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.className +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.id +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.name +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.tagName +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.value +'</span>';
            html +='<span style="color: #90B36A;"><i class="iconfont icon-pinpai"></i> '+ frag.type +'</span>';
            html +='</div><div class="info">'+ hashArr[frag.hash].expect +'</div></li>';
          }
          html += '</ul>';
          $('.detail-right').append(html);
        }
      }
    }
  });
}

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
