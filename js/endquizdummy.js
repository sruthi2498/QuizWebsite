$(document).ready(function(){
	var socket = io();
	var url_string=window.location.href;
	var url=new URL(url_string);
	username=url.searchParams.get("username");
	var key=url.searchParams.get("key");


	socket.on('opponentEnd', function(data){
		if(data.key==key){
			console.log("opponent ended");
			window.location="http://localhost:3000/endquiz?username="+username+"&key="+key;
		}
		
	});
});

