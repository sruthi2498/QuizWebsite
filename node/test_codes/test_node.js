var http=require("http");

http.createServer(function(req,res){
	res.writeHead(200,("Content-Type","text/plain"));
	res.end("Hello World");
}).listen(1234);

console.log("server running at localhost:1234");

