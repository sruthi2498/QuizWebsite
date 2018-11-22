var curr_quest=0;
var quiz_url="http://localhost:3000/getQuizLength";
var quest_url="http://localhost:3000/getQuestion";

var quiz_name="quiz_a";

var d1;
var d2;
var time;

var getQuestion={
	xhr:new XMLHttpRequest(),
	sendCurrQuestToServer:function(quiz_name,curr_quest,next){ 
	//if next=1, get next question, else get previous question
		console.log("sending curr question =",curr_quest);

		query_string=quest_url+"?quiz_name="+quiz_name+"&curr_quest="+curr_quest;
		//if(next)query_string=quest_url+"?quiz_name="+quiz_name+"&curr_quest="+curr_quest+"&next=1";
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET",query_string);
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;

			console.log("Get Question Response : ",res); 
			var resj=JSON.parse(res); 
			document.getElementById("ques").innerHTML=resj[0].question;
			document.getElementById("option1").innerHTML=resj[0].option1;
			document.getElementById("option2").innerHTML=resj[0].option2;
			document.getElementById("option3").innerHTML=resj[0].option3;
			document.getElementById("option4").innerHTML=resj[0].option4;
			d1=new Date();
			//timer
			if(curr_quest==quiz_len)
				document.getElementById("next").disabled=true;	
			
		}
	}
}

var quiz_len=0;
var getAllQuestion={
	xhr:new XMLHttpRequest(),
	sendQuizName:function(quiz_name){ 
		console.log("sending quiz name : ",quiz_name);
		query_string=quiz_url+"?quiz_name="+quiz_name
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET",query_string);
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Quiz length Response : ",res);
			quiz_len=parseInt(res);
			
	
			
			
			
		}
	}
}

getAllQuestion.sendQuizName(quiz_name);


getQuestion.sendCurrQuestToServer(quiz_name,curr_quest++,1);



time_url="http://localhost:3000/userQuestionSetTime";

var currTime={
	xhr:new XMLHttpRequest(),
	send:function(username,quiz_session_id,quiz_name,curr_quest_num,time){ 
		console.log("setting time for user : ",time);
		query_string=time_url+"?username="+username+"&quiz_session_id="+quiz_session_id+"&quiz_name="+quiz_name+"&curr_quest_num="+curr_quest_num+"&time="+time;
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET",query_string);
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("setting time response : ",res);
			
		}
	}
}

ans_url="http://localhost:3000/userCorrect";

var answer={
	xhr:new XMLHttpRequest(),
	send:function(quiz_name,curr_quest_num){ 
		console.log("User got it right");
		query_string=ans_url+"?quiz_name="+quiz_name+"&curr_quest_num="+curr_quest_num;
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET",query_string);
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Incremented correctly answered : ",res);
			
		}
	}
}


function next_ques(){
	//end timer
	//getQuestion.sendCurrQuestToServer(quiz_name,curr_quest,1);
	d2=new Date();
	time=Math.abs(d2-d1);
	d1=0;d2=0;
	getQuestion.sendCurrQuestToServer(quiz_name,curr_quest);
	currTime.send("new_guy",18,"quiz_a",1,12);
	answer.send("quiz_a",1);
	curr_quest=curr_quest+1;
}
