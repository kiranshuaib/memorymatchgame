    //global variables go under here:
    var clickedArray = [];
    var interval;
    var started = false;
    var time = 0;
    var ready = true;
    var numCompleted = 0;

    //run functions under here:
    setUp();
    startTimer();


    //function definitions go under here:
    function randomAnswers() {
      let answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
      answers.sort((a, b) => {
        return 0.5 - Math.random()
      });
      return answers;
    };

  function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
  }

  function hide(cell){
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
  }

  function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
  }

  function startTimer(){
    if(started === false){
      interval = setInterval(function(){
        time++;
        document.querySelector("#timer").innerHTML = `Time Elapsed: ${time}`
      },1000)
      started = true
    }
  }



    function setUp() {
      var grid = [...document.getElementsByTagName("td")];
      var answers = randomAnswers();
      console.log(grid);

      grid.forEach((cell,i) => {
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        cell.addEventListener("mouseenter", function() {
          if (this.completed == false && this.clicked == false)
            this.style.background = "orange";
        });

        cell.addEventListener("mouseleave", function() {
          if (this.completed == false && this.clicked == false)
            this.style.background = "blue";
        });

        cell.addEventListener('click',function(){
              if(ready == false)
                  return;
              startTimer();
              if(this.clicked == false && this.completed == false){
                  clickedArray.push(this);
                  reveal(this);
              }

              if(clickedArray.length == 2){

                  if(clickedArray[0].value == clickedArray[1].value){
                      //if a matching pair is found
                      complete(clickedArray[0]);
                      complete(clickedArray[1]);

                      clickedArray = [];

                      if(numCompleted == 8){
                          alert("You won in " + time + " seconds!");
                          clearInterval(interval);
                      }


                  }
                  else{
                      //if a matching pair is not found
                      ready = false;
                      document.getElementById("gridTable").style.border = "5px solid red";

                      setTimeout(function(){
                          //after a 500ms delay
                          hide(clickedArray[0]);
                          hide(clickedArray[1]);

                          clickedArray = [];

                          ready = true;
                          document.getElementById("gridTable").style.border = "5px solid black";


                      },500);

                  }

              }

          });

          
          document.addEventListener('keydown',function(e){
            console.log(e);
            if(e.key > 0 && e.key < 10){
              grid[e.key-1].click();
            }
          })


      })
    document.getElementById('restart').addEventListener('click', function(){
    location.reload();
});
  }
