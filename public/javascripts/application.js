$(function(){
  $("form").validator({
    isErrorOnParent: true
  });
  $(".path-form").submit(endpointEvent);
  $(".show-samples").click(showSamplesEvent);
});

/**
 * 调用api
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
var endpointEvent = function(e){
  e && e.preventDefault();
  var domain = $('.app-header').data('domain');
  var path = $(event.currentTarget).data("path");
  var method = $(event.currentTarget).data("method");
  var summary = $(event.currentTarget).data("summary");
  var data = $(event.currentTarget).serializeJSON();
  for(var d in data){
    path = path.replace("{"+d+"}",data[d]);
  }
  var url = domain + path;
  var $modal;
  $.ajax({
    url: url,
    type: method,
    data: data,
    success:function(data, textStatus, request){
      var headers = request.getAllResponseHeaders();
      var code = request.status;
      var body = JSON.stringify(data, null, 2);
      $modal = new $.Modal({
        content: Handlebars.templates.applications.result({"url": url, "method": method, "summary": summary,"headers": headers, "code": code, "body": body})
      });
      $modal.show();
    },
    error: function(xhr, status, e){
      var body = xhr.responseText || "未知故障";
      var headers = xhr.getAllResponseHeaders();
      var code =  xhr.status;
      console.log(11);
      $modal = new $.Modal({
        content: Handlebars.templates.applications.result({"url": url, "method": method, "summary": summary,"headers": headers, "code":code, "body": body})
      });
      $modal.show();
    },
    complate: function(){
      $modal.show();
    }
  });
};

/**
 * 显示参数json
 */
var showSamplesEvent = function(e){
  e && e.preventDefault();
  var $target = $(event.currentTarget);
  var $samples = $target.parent().find(".samples");
  var $schemas = $target.parent().find(".schemas");
  if($samples[0].style.display === 'block' || $schemas[0].style.display === 'block'){
    $samples.css("display","none");
    $schemas.css("display","none");
    $samples.find("pre").html('');
    $schemas.find("pre").html('');
    return false;
  }
  var parameters = $target.data("parameters");
  var responses = $target.data("responses");
  var aid = $(".app-header").data("aid");
  var samples = {};
  for(var i in parameters){
    var p = parameters[i];
    if (typeof(p.schema) !== 'undefined' && p.schema && p.schema.$ref ) {
      p.type = findDefinitionObj(aid, getDefinitionName(p.schema.$ref));
    }
    samples[p.name] = p.type || p.schema.type;
  }
  var schemas = {};
  for(var i in responses){
    var r = responses[i];
    if (typeof(r.schema) !== 'undefined' && r.schema && r.schema.$ref) {
        schemas[getDefinitionName(r.schema.$ref)] = findDefinitionObj(aid, getDefinitionName(r.schema.$ref));
    }
  }

  $samples.css("display","block");
  $samples.find("pre").append(JSON.stringify(samples, null, 2));

  $schemas.css("display","block");
  $schemas.find("pre").append(JSON.stringify(schemas, null, 2));
};

/**
 * 获取定义名称
 * @param  {[type]} ref [description]
 * @return {[type]}     [description]
 */
function getDefinitionName(ref){
  if (ref.indexOf('#/definitions/') === 0) {
    return ref.substring('#/definitions/'.length);
  } else {
    return ref;
  }
}

/**
 * 获取定义obj
 * @param  {[type]} aid [description]
 * @param  {[type]} ref [description]
 * @return {[type]}     [description]
 */
function findDefinitionObj(aid, ref){
  var obj;
  $.ajax({
      url: "/api/applications/definition",
      type: "GET",
      async: false,
      data: {"id": aid, "ref": ref},
      success:function(data){
        if(data.status){
          var result = data.result;
          if(typeof (result[0]) !== "undefined"){
            obj = TraversalObject(aid, result[0]["definition_json"][ref]["properties"]);
          }
        }
      }
  });
  return obj;
}

function TraversalObject(aid,obj){
  var o = {};
  for (var a in obj) {
    if (typeof (obj[a]) == "object") {
      var f = obj[a];
      if(typeof (f.$ref) !== "undefined"){
        obj[a] = findDefinitionObj(aid, getDefinitionName(f.$ref));
      }else if(typeof (f.type) !== 'undefined' && f.type === 'array'){
        obj[a] = [];
        obj[a].push(findDefinitionObj(aid, getDefinitionName(f.items.$ref)));
      }else if(typeof (f.type) !== 'undefined' && f.type === 'object'){
        if(typeof (f.additionalProperties) === 'undefined' || typeof (f.additionalProperties.$ref) === 'undefined' ){
          obj[a] = f.type;
        }else{
          obj[a] = findDefinitionObj(aid, getDefinitionName(f.additionalProperties.$ref));
        }
      }else{
        obj[a] = f.type;
      }
    }
  }
  return obj;
}
