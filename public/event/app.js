$(function(){
    $("form").validator({
      isErrorOnParent: true
    });
    $(".path-form").submit(endpointEvent);
});

var endpointEvent = function(e){
    e && e.preventDefault();
    var path = $(event.currentTarget).data("path");
    var method = $(event.currentTarget).data("method");
    var data = $(event.currentTarget).serializeJSON();
    $.ajax({
        url: "http://jidd.com"+path,
        type: method,
        data: data,
        success:function(data){
          alert(data)
        }
    })
};
