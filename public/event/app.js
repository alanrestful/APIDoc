$(function(){
    $("form").validator({
      isErrorOnParent: true
    });
    $(".path-form").submit(endpointEvent);
});

var endpointEvent = function(e){
    e && e.preventDefault();
    var host = $(".host").data("host");
    var path = $(event.currentTarget).data("path");
    var method = $(event.currentTarget).data("method");
    var data = $(event.currentTarget).serializeJSON();
    console.log(data);
    $.ajax({
        url: "http://" + host + path,
        type: method,
        data: data,
        success:function(data){
          alert(data)
        }
    })
};
