var curr_quest=0;
var quiz_url="http://localhost:3000/getQuizLength";
var quest_url="http://localhost:3000/getQuestion";

quiz_name="quiz_a";

var d1;
var d2;
var time;

var socket=io();

var url_string=window.location.href;
var url=new URL(url_string);
var username=url.searchParams.get("username");
var key=url.searchParams.get("key");
//var mode=url.searchParams.get("mode");
var mode="easy";
index=0;
easy_start=0;
hard_start=0;

var opp_curr_quest=1;
opponentEnd=0;

correct_answer="-1";
user_answer="-1";

$(document).ready(function() {

	$('.list-group-item').on('click', function() {
	    var _this = $(this);
	    chosen_value=_this.text();
	    user_answer=_this[0].id;
	    $('.active').removeClass('active');
	    _this.toggleClass('active');
	    document.getElementById("next").disabled=false;

	});

	
});

function checkCorrect(num){
	if(correct_answer!="-1" && num!="-1" && num==correct_answer)return 1;
	return 0;
}
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

			d1=new Date();
			document.getElementById("next").disabled=true;	
			if(curr_quest>=quiz_len){
				document.getElementById("next").disabled=true;	
				console.log("QUIZ DONE");

				data={
					"username":username,"key":key
				}
				socket.emit("userEnd",data);

				if(opponentEnd==1){
					window.location="http://localhost:3000/endquiz?username="+username+"&key="+key;
				}
				else{
					window.location="http://localhost:3000/endDummy?username="+username+"&key="+key;
				} 
			}
			var res=this.responseText;
			//console.log(res);
			var resj=JSON.parse(res);
		    console.log("resj[index] : ",resj[index]); 
			

			document.getElementById("ques").innerHTML=resj[index].question;
			document.getElementById("option1").innerHTML=resj[index].option1;
			document.getElementById("option2").innerHTML=resj[index].option2;
			document.getElementById("option3").innerHTML=resj[index].option3;
			document.getElementById("option4").innerHTML=resj[index].option4;
			
			;
			$("#chart").empty();
			PlotPie(resj[index].num_correct,resj[index].num_attempted-resj[index].num_correct);

			correct_answer=resj[index].correct_option.toString();
			//timer
			
			if(mode=="easy")index=easy_start+index+1;
			else index=hard_start+index+1;
			
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
			quiz_len=parseInt(res,10);
			quiz_len=quiz_len/2;
			hard_start=quiz_len;
			ul_user=document.getElementById("userPagination");
			for( i=0;i<quiz_len;i++){
				a=document.createElement("a");
				a.href="#";
				a.textContent=i+1;
				li=document.createElement("li");
				if(i==0)li.setAttribute("class","active");
				li.appendChild(a);
				ul_user.appendChild(li);
			}
			
			ul_opp=document.getElementById("oppPagination");
			for( i=0;i<quiz_len;i++){
				a=document.createElement("a");
				a.href="#";
				a.textContent=i+1;
				li=document.createElement("li");
				if(i==0)li.setAttribute("class","active");
				li.appendChild(a);
				ul_opp.appendChild(li);
			}
			
			
			
		}
	}
}

getAllQuestion.sendQuizName(quiz_name);


getQuestion.sendCurrQuestToServer(quiz_name,curr_quest,1);



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
	if(document.getElementById("userPagination").children.length>0){
		li=document.getElementById("userPagination").children[curr_quest];
		li.setAttribute("class","inactive");
		if(curr_quest+1<quiz_len){
			li=document.getElementById("userPagination").children[curr_quest+1];
			li.setAttribute("class","active");
		}
		
	}


	d2=new Date();
	time=Math.abs(d2-d1);
	d1=0;d2=0;


	currTime.send(username,key,quiz_name,curr_quest,time);
	if(checkCorrect(user_answer))answer.send(quiz_name,1);

	getQuestion.sendCurrQuestToServer(quiz_name,curr_quest);


	data={
		"username":username,
		"curr_quest":curr_quest,
		"key":key,
		"time":time
	};
	//console.log("sending data to socket",data);
	socket.emit("userNext",data);
	curr_quest=curr_quest+1;


}

socket.on('opponentEnd', function(data){
	//console.log("some player ended ",data);
	if(data.key==key){
		console.log("opponent ended");
		opponentEnd=1;
	}
	
});

socket.on('opponentNext', function(data){
//	console.log("opponent next : ",data);
    if(data.key==key && data.username!=username){
    	opp_curr_quest=data.curr_quest;
        console.log("opponent next : ",data);
        li=document.getElementById("oppPagination").children[opp_curr_quest];
		li.setAttribute("class","inactive");
		if(opp_curr_quest+1<quiz_len){
			li=document.getElementById("oppPagination").children[opp_curr_quest+1];
			li.setAttribute("class","active");
		}
		

    }
});



function PlotPie(corr,incorr){
	var options = {
	    chart: {
	        width: 380,
	        type: 'pie',
	    },
	    labels: ['Correct', 'Incorrect'],
	    series: [corr, incorr],
	    responsive: [{
	        breakpoint: 480,
	        options: {
	            chart: {
	                width: 200
	            }
	        }
	    }]
	}

	var chart = new ApexCharts(
	    document.querySelector("#chart"),
	    options
	);
	//console.log("chart : ",chart);

	chart.render();
}