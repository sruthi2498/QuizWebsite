$(document).ready(function(){
	var socket = io();
	var url_string=window.location.href;
	var url=new URL(url_string);
	username=url.searchParams.get("username");
	var key=url.searchParams.get("key");

	end.sendKey(key);

});

var end={
	xhr:new XMLHttpRequest(),
	sendKey:function(key){
		console.log("sending key :",key);
		key=parseInt(key,10);
		//console.log("sending request username =",username);
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","http://localhost:3000/getWinner?quiz_session_id="+key);
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			var winner="";
			if(res=="Draw")$("#Winner").text("Draw");
			else if(res==username)$("#Winner").text("You");
			else $("#Winner").text("Opponent");
			
		}
	}
}