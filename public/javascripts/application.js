$(function(){
  $("form").validator({
    isErrorOnParent: true
  });
  $(".path-form").submit(endpointEvent);
  $(".show-samples").click(showSamplesEvent);
});

// 测试接口
var endpointEvent = function(e){
  e && e.preventDefault();
  var host = $(".host").data("host");
  var path = $(event.currentTarget).data("path");
  var method = $(event.currentTarget).data("method");
  var data = $(event.currentTarget).serializeJSON();
  for(var d in data){
    path = path.replace("{"+d+"}",data[d]);
  }
  $.ajax({
      url: "http://" + host + path,
      type: method,
      data: data,
      success:function(data){
        alert(data)
      }
  })
};

// 显示参数json
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
  var samples = {}, p;
  for(var i in parameters){
    p = parameters[i];
    if (typeof(p.schema) !== 'undefined') {
      if (p.schema && p.schema.$ref) {
        p.type = findDefinitionObj(aid, getDefinitionName(p.schema.$ref));
      }
    }
    samples[p.name] = p.type || p.schema.type;
  }
  var schemas = {}, r;
  for(var i in responses){
    r = responses[i];
    if (typeof r.schema !== 'undefined') {
      if (r.schema && r.schema.$ref) {
        schemas[getDefinitionName(r.schema.$ref)] = findDefinitionObj(aid, getDefinitionName(r.schema.$ref));
      }
    }
  }

  $samples.css("display","block");
  $samples.find("pre").append(JSON.stringify(samples, null, 2));

  $schemas.css("display","block");
  $schemas.find("pre").append(JSON.stringify(schemas, null, 2));
};

// 获取定义名称
function getDefinitionName(ref){
  if (ref.indexOf('#/definitions/') === 0) {
    return ref.substring('#/definitions/'.length);
  } else {
    return ref;
  }
}

// 获取定义obj
function findDefinitionObj(aid, ref){
  var obj;
  $.ajax({
      url: "/api/applications/definition",
      type: "GET",
      async: false,
      data: {"id": aid, "ref": ref},
      success:function(data){
        if(typeof (data[0]) !== "undefined"){
          obj = TraversalObject(aid, data[0]["definition_json"][ref]["properties"]);
        }
      }
  })
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
