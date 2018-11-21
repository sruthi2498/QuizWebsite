// var questions=["Who is Ramu?","Why ?","No u"];
// var a=document.getElementById('quizDiv');
// var index=-1;
// var newd=document.createElement('div');
// function init(){
// 	index=0;
// 	document.getElementById("prev").disabled=true;
// 	newd.innerHTML="Q) "+questions[index];
// 	a.appendChild(newd);

// }

// function previous(){
// 	if(index==0)
// 		{
		
// 		return;}
// 	document.getElementById("next").disabled=false;
// 	index--;
// 	if(index==0)
// 		document.getElementById("prev").disabled=true;
// 	newd.innerHTML="Q) "+questions[index];
// 	//a.removeChild(a.childNodes[0]);
// 	a.appendChild(newd);


// }

// function next(){
// 	if(index==questions.length-1)
// 		{
		
// 		return;}
// 	document.getElementById("prev").disabled=false;
// 	index++;
// 		if(index==questions.length-1)
// 			document.getElementById("next").disabled=true;
// 	newd.innerHTML="Q) "+questions[index];
// 	//a.removeChild(a.childNodes[0]);
// 	a.appendChild(newd);

// }



var curr_quest=0;
var quiz_url="http://localhost:3000/getQuizLength";
var quest_url="http://localhost:3000/getQuestion";

var quiz_name="quiz_a";


// $(document).ready(function(){
	
// 	getQuestion.sendCurrQuestToServer(quiz_name,curr_quest);
// 	$("#prev").prop("disable",true);

// 	$("#prev").click(function(){
// 		console.log("Previous question");
// 		/* go to second page*/
		
// 	});
// 	$("#next").click(function(){

// 		console.log("Next question");
// 		$("#joinQuizContainer").css("display","none");
// 		/* go to second page*/
		
// 	});
// });

var getQuestion={
	xhr:new XMLHttpRequest(),
	sendCurrQuestToServer:function(quiz_name,curr_quest,next){ 
	//if next=1, get next question, else get previous question
		console.log("sending curr question =",curr_quest);

		query_string=quest_url+"?quiz_name="+quiz_name+"&curr_quest="+curr_quest+"&next=0";
		if(next)query_string=quest_url+"?quiz_name="+quiz_name+"?curr_quest="+curr_quest+"&next=1";
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET",query_string);
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			
			
			
		}
	}
}

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
			console.log("Response : ",res); 
			
			
			
		}
	}
}

getAllQuestion.sendQuizName(quiz_name);




