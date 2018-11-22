$(document).ready(function(){
	var url_s=window.location.href;

	var url=new URL(url_s);
	var username=url.searchParams.get("username");
	var key=url.searchParams.get("key");

	console.log(username,key);

	// To display the questions 
	// Send GET request to  /getAllQuizzes
	// JSON Parse the results



});