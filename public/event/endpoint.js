$(function(){
    $("form").validator({
      isErrorOnParent: true
    });
    $("form").submit(endpointEvent);
});

var endpointEvent = function(e){
    e && e.preventDefault();
    var path = $(event.currentTarget).data("path");
    var method = $(event.currentTarget).data("method");
    var data = $(event.currentTarget).serializeJSON();
    debugger;
    $.ajax({
        url: "http://jidd.com"+path,
        type: method,
        data: data,
        success:function(data){
          alert(data)
        }
    })
};
