

var mainNode = document.getElementsByTagName("main")[0];

if (exerciseIndex === 0)
        {
            
            var explanation = document.createElement('p');
            explanation.setAttribute("id", "explanation");
            explanation.textContent = infomessage;
            mainNode.appendChild(explanation);
            
            
            var listNode = document.createElement("ol");
            listNode.setAttribute("id", "list");    
            
            for (i=0; i < workout.exercisesNum; i++)
                {
                    var exercise = workout[i];
                    var index = i + 1;
                    
                    var elementNode = document.createElement('li')
                    var textNode = document.createTextNode(workout[index].name);
                    elementNode.appendChild(textNode);
                    listNode.appendChild(elementNode);
                
                }
             
            mainNode.appendChild(listNode); 
            
            
            var beginButton = document.createElement('button');
            beginButton.setAttribute("id", "beginbutton");
            beginButton.innerHTML = "Begin Workout";
            beginButton.onclick = begin;
            
            mainNode.appendChild(beginButton);
            
        }

function begin(){
    
    exerciseIndex += 1;
    
    mainNode.removeChild(explanation);
    mainNode.removeChild(listNode);
    mainNode.removeChild(beginButton);
    
    displayExercise(exerciseIndex);
};

function displayExercise(index){
  
    // will need to remove all previous elements this may be a little difficult given the variable number of tables, but create a gloabal variable that tracks this and you should be all good
    
    // exercise name
    var exerciseName = document.createElement('p');
    exerciseName.setAttribute("id","exerciseName");
    exerciseName.textContent = workout[index].name;
    mainNode.appendChild(exerciseName);
    
    // recommended rest time
    var restTime = document.createElement('p');
    restTime.setAttribute("id","restTime");
    restTime.textContent = "Rest Time: "  + workout[index].rest + "s";
    mainNode.appendChild(restTime);
    
    // recommended rep range
    var repRange = document.createElement('p');
    repRange.setAttribute("id","repRange");
    repRange.textContent = "Rep Range: "  + workout[index].reps;
    mainNode.appendChild(repRange);
    
    // make table based on given exercise
    var valueTable = document.createElement('table');
    valueTable.setAttribute("id", "valueTable");
    
    // make rows and coloumns by first finding number of sets
    sets = setCounter(workout[exerciseIndex]);
    console.log(sets);
    
    // function can be used to find the number of elements in an object
    function setCounter(obj){
        
    var count = 0;
    for(var i in obj)
        if(obj.hasOwnProperty(i)){
			count++;
		}
    
    // -3 to just get the number of sets
    return count - 3;
    };
    
    
    
    
    
    
    
    
};


