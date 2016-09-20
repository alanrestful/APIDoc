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

function TraversalObject(obj){
  var o = {};
  for (var a in obj) {
    if (typeof (obj[a]) == "object") {
      o[a] = obj[a]["type"];
    }
  }
  return o;
}

// 显示参数json
var showSamplesEvent = function(e){
  e && e.preventDefault();
  var $target = $(event.currentTarget);
  var parameters = $target.data("parameters");
  var responses = $target.data("responses");
  var aid = $(".jumbotron").data("aid");
  var samples = {};
  var param, type, schema, ref;
  for(var p in parameters){
    param = parameters[p];
    if (typeof type === 'undefined') {
      schema = param.schema;
      if (schema && schema.$ref) {
        ref = schema.$ref;
        param.type = findDif(aid, getRef(ref));
      }
    }
   samples[param.name] = param.type || param["schema"]["type"];
  }
  var resp, schema2, ref2;
  var schemas={};
  for(var p in responses){
    resp = responses[p];
    if (typeof resp.schema !== 'undefined') {
      schema2 = resp.schema;
      if (schema2 && schema2.$ref) {
        ref2 = schema2.$ref;
        schemas[getRef(ref2)] = findDif(aid, getRef(ref2));
      }
    }
  }
  var $samples = $target.parent().find(".samples");
  var $schemas = $target.parent().find(".schemas");
  $samples.css("display","block");
  $schemas.css("display","block");
  $samples.find("pre").html('').append(JSON.stringify(samples, null, 2));
  $schemas.find("pre").html('').append(JSON.stringify(schemas, null, 2));
};

// 获取定义名称
function getRef(ref){
  var t;
  if (ref.indexOf('#/definitions/') === 0) {
    t = ref.substring('#/definitions/'.length);
  } else {
    t = ref;
  }
  return t;
}

// 获取定义obj
function findDif(aid, ref){
  var obj;
  $.ajax({
      url: "/applications/difinition",
      type: "GET",
      async: false,
      data: {"id": aid, "ref": ref},
      success:function(data){
        obj = TraversalObject(data[0].difinition_json[ref]["properties"]);
      }
  })
  return obj;
}
