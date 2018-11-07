$(document).ready(function(){
	$("#ready").click(function(){
		$("#User").css("background-color","green");
	});
});

function getOpponentReady(){
	var ev=new EventSource("php/sink.php");
    ev.addEventListener("OpponentReady",displayOpponentReady,false);
    // false=> event bubbling is not enabled
    ev.onerror=function(){
        alert("error"); 

        //alert is blocking, so we have to explicitly call     
        // getData again (we can console log instead)
	    getOpponentReady();
    }
}

function displayOpponentReady(e){
    var div=document.createElement("div");
    div.innerHTML=e.data;
    document.body.appendChild(div);
}
