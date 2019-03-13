$('#button').click(function(){
  $.ajax({url: "https://thatsthespir.it/api", success: function(result){
      console.log(result)
      $("#quote").html("\"" + result.quote + "\"");
      $("#quoter").html("-" + result.author);
      $('#photo').attr('src', result.photo);
    }, error: function() {
    alert( "request error..." );
  }});
});
