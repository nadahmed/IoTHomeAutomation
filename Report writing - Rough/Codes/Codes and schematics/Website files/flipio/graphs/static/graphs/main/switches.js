var jsonData=JSON.parse(
'{"S1":0, "B1":false,' +
'"S2":"0", "B2":false,'+
'"S3":"0", "B3":false}'
);

    $( function() {
    $( "#slider-vertical1" ).slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 100,
    value: 0,
    slide: function( event, ui ) {
        $( "#amount1" ).text( ui.value );
        jsonData.S1= ui.value;
socket.send(JSON.stringify(jsonData));
//console.log(jsonData);

      }
    });
    $( "#amount1" ).text( $( "#slider-vertical1" ).slider( "value" ) );

    $( "#slider-vertical1" ).position({
  my: "center",
  at: "center",
  of: "#central1"
});

    });

$( function() {
    $( "#slider-vertical2" ).slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 100,
    value: 0,
    slide: function( event, ui ) {
        $( "#amount2" ).text( ui.value );
        jsonData.S2= ui.value;
        socket.send(JSON.stringify(jsonData));
      }
    });
    $( "#amount2" ).text( $( "#slider-vertical2" ).slider( "value" ) );

    $( "#slider-vertical2" ).position({
  my: "center",
  at: "center",
  of: "#central2"
});

    });

$( function() {
    $( "#slider-vertical3" ).slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 100,
    value: 0,
    slide: function( event, ui ) {
        $( "#amount3" ).text( ui.value );
        jsonData.S3= ui.value;
        socket.send(JSON.stringify(jsonData));
      }
    });
    $( "#amount3" ).text( $( "#slider-vertical3" ).slider( "value" ) );

    $( "#slider-vertical3" ).position({
  my: "center",
  at: "center",
  of: "#central3"
});

    });


socket = new WebSocket("ws://" + window.location.host + "/switches/");

socket.onopen = function() {


//    socket.send("hello world");
}
// Call onopen directly if socket is already open
if (socket.readyState == WebSocket.OPEN) socket.onopen();


socket.onmessage = function(e) {
console.log(e.data);
jsonData=JSON.parse(e.data);

    $( "#slider-vertical1" ).slider("value", jsonData.S1);
    $( "#amount1" ).text(jsonData.S1)
    $('input[name="my-checkbox"]').bootstrapSwitch('state', jsonData.B1);

    $( "#slider-vertical2" ).slider("value", jsonData.S2);
    $( "#amount2" ).text(jsonData.S2)
    $('input[name="my-checkbox2"]').bootstrapSwitch('state', jsonData.B2);

    $( "#slider-vertical3" ).slider("value", jsonData.S3);
    $( "#amount3" ).text(jsonData.S3)
    $('input[name="my-checkbox3"]').bootstrapSwitch('state', jsonData.B3);

//$("#slider-vertical2").val(parseInt(e.data)).slider("refresh");
    //alert(e.data);
}


$(function(){$('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state1) {
  jsonData.B1=state1;
  socket.send(JSON.stringify(jsonData));

});
});

$(function(){$('input[name="my-checkbox2"]').on('switchChange.bootstrapSwitch', function(event, state2) {
  jsonData.B2=state2;
  socket.send(JSON.stringify(jsonData));

});
});

$(function(){$('input[name="my-checkbox3"]').on('switchChange.bootstrapSwitch', function(event, state3) {
  jsonData.B3=state3;
  socket.send(JSON.stringify(jsonData));

});
});
$(function(){

    $('input[name="my-checkbox"]').bootstrapSwitch('size', 'small');
    $('input[name="my-checkbox"]').bootstrapSwitch('onColor', 'success');

    $('input[name="my-checkbox2"]').bootstrapSwitch('size', 'small');
    $('input[name="my-checkbox2"]').bootstrapSwitch('onColor', 'primary');

    $('input[name="my-checkbox3"]').bootstrapSwitch('size', 'small');
    $('input[name="my-checkbox3"]').bootstrapSwitch('onColor', 'warning');

});
