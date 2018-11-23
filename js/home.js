$(document).ready(function(){

	$("#invalidJoin").css("display","none");
	var socket = io();
	username="";
		
	socket.emit('clientUsername', username);
		
	startQuizKey=0;



	$("#startQuizButton").click(function(){
		username=$("#username").val();
		if(username.length>0){
			console.log("Start a new quiz");
			$("#startKey").css("display","block");
			$("#generatedKey").css("display","block");

			/* make key*/
			socket.emit('clientUsername', username);
			startQuiz.SendUsernameToServer(username);

		}
		
		
	});

	$("#joinQuizButton").click(function(){
		username=$("#username").val();
		if(username.length>0){
			console.log("Join a new quiz");
			socket.emit('clientUsername', username);
			$("#joinQuizContainer").css("display","block");
		}
		
	});

	$("#joinQuizGo").click(function(){

		//Remove invaild key message
		$("#invalidJoin").css("display","none");
		console.log("Joined quiz GO");
		var key=$("#joinQuizKey").val();

		/* send request to server *
		Validate key 
		get response*/
		joinQuiz.SendKeyToServer(key,username);



	});
});

var joinQuiz={
	xhr:new XMLHttpRequest(),
	key:"",
	SendKeyToServer:function(key,username){
		console.log("sending request key =",key);
		this.key=key;
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("POST","http://localhost:3000/joinquizkey");
		this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.xhr.send("key="+key+"&username="+username);
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			if(res=="Valid"){
				console.log("Add player2 to db");
				player2.SendUsernameToServer(username,joinQuiz.key);
				
				
			}
			else{
				console.log("Invalid key");
				//Show invaild key message
				$("#invalidJoin").css("display","block");
				$("#joinQuizKey").attr("placeholder","Invalid Key.Try Again");
				// make input blank again
				$("#joinQuizKey").prop("value","");
			}
			
			
		}
	}
}

var startQuiz={
	xhr:new XMLHttpRequest(),
	SendUsernameToServer:function(username){
		console.log("sending request username =",username);
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","http://localhost:3000/addPlayer1?username="+username);
		this.xhr.send();   
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			startQuizKey=res;
			$("#generatedKey").text(res);
			$("#generatedKey").css("display","block");
			window.location="http://localhost:3000/joinquiz?username="+username+"&key="+startQuizKey;
			
		}
	}
}


var player2={
	xhr:new XMLHttpRequest(),
	username:"",
	key:"",
	SendUsernameToServer:function(username,key){
		console.log("sending request username =",username);
		this.username=username;
		this.key=key;
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","http://localhost:3000/addPlayer2?username="+username+"&key="+key);
		this.xhr.send();   
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			console.log("go to sync page");
			window.location="http://localhost:3000/joinquiz?username="+player2.username+"&key="+player2.key;
			
		}
	}
}



