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
  var parameters = $(event.currentTarget).data("parameters");
  var aid = $(".jumbotron").data("aid");
  var params = {};
  var param, type, schema, ref;
  for(var p in parameters){
    param = parameters[p];
    if (typeof type === 'undefined') {
      schema = param.schema;
      if (schema && schema.$ref) {
        ref = schema.$ref;
        if (ref.indexOf('#/definitions/') === 0) {
          type = ref.substring('#/definitions/'.length);
        } else {
          type = ref;
        }
        $.ajax({
            url: "/applications/difinition",
            type: "GET",
            async: false,
            data: {"id": aid, "ref": type},
            success:function(data){
              type = TraversalObject(data[0].difinition_json[type]["properties"]);
            }
        })
        param.type = type;
      }
    }
   params[param.name] = param.type || param["schema"]["type"];
  }
  $(event.currentTarget).parent().find("pre").html('').append(JSON.stringify(params, null, 2));
};
