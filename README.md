# QuizWebsite

## Installation

1) Node
2) nodemon : 
        
        $ npm install -g nodemon)
        
3) Express for node : 

        $ npm install express --save
        
4) Socket.io for node : 

        $ npm install socket.io --save

5) ApexChart for graphs : (https://apexcharts.com/docs/installation/ )

        $ npm install apexcharts --save

## Running

Creating a database :

    $ node node/db/node_cratedb.js   # change node_cratedb.js with your username and password
    $ node node/db/node_quiztable.js


From project root :

    $ nodemon node/node_server.js
    

## HTML files :

    home.html --> localhost:3000/home
    quizpage2.html --> localhost:3000/quizPage
    choose_quiz.html --> localhost:3000/chooseQuiz
    end_quiz.html --> localhost:3000/endQuiz
