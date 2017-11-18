

// Global Varibales

console.log(workout);

var prevIdValues = {},
    currentIdValue = {};

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


/////// Functions ////////

function begin(){
    
    exerciseIndex += 1;
    
    mainNode.removeChild(explanation);
    mainNode.removeChild(listNode);
    mainNode.removeChild(beginButton);
    
    displayExercise(exerciseIndex);
};

function displayExercise(index){
    
    // set these back to an empty object for each exercise so that we dont get an overide effect (not that it would matter)
    prevIdValues = {}
    currentIdValue = {};
    
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
    
    
    // make next and previous buttons
    var nextButton = document.createElement('button');
        nextButton.setAttribute("id", "nextButton");
        nextButton.innerHTML = "Next";
        nextButton.onclick = next;
            
        mainNode.appendChild(nextButton);
    
    if( index > 1 )
        {
            var prevButton = document.createElement('button');
            prevButton.setAttribute("id", "prevButton");
            prevButton.innerHTML = "Previous";
            prevButton.onclick = prev;
            
            mainNode.appendChild(prevButton);   
        }
    
    // make table based and assign heading rot 
    var valueTable = document.createElement('table');
    valueTable.setAttribute("id", "valueTable");
    
    var tableRow = document.createElement('tr')
    
    var tableData = document.createElement('th');
    tableData.innerHTML = "Set";
    tableRow.appendChild(tableData);
    
    tableData = document.createElement('th');
    tableData.innerHTML = "Weight";
    tableRow.appendChild(tableData);
    
    tableData = document.createElement('th');
    tableData.innerHTML = "Reps";
    tableRow.appendChild(tableData);
    
    valueTable.appendChild(tableRow);
    
    
    // make rows and coloumns by first finding number of sets
    sets = setCounter(workout[index]);
    
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
    
    
    // build the table for the required number of sets and account for supersets and drop sets
    for(i=1; i<=sets; i++)
        {
            
           // variable used to cycle throught the weights of a set if there is more than one
           var weightCounter = 1;
           var repCounter = 2; 
            
           tableRow = document.createElement('tr') 
            
           tableData = document.createElement('td');
           tableData.innerHTML = i;
           tableRow.appendChild(tableData);
            
           tableData = document.createElement('td');
            
           //find number of input boxes needed to account for drop sets or supersets
           boxes = workout[index][i].length;
           boxes = (boxes - 1)/2;
            
           // create the number of input boxes required and assign them an id for later reference
           for (j=1;j<=boxes;j++)
               {
                     
                   // assign id value to previous weight in global varibale (to help make on blur work)
                   var id = i +":2:"+j;
                   prevIdValues[id] = workout[index][i][weightCounter];
                   
                   var inputbox = document.createElement("input");
                   inputbox.setAttribute("type","text");
                   inputbox.setAttribute("id",i+":2:"+j);
                   inputbox.setAttribute("size","10");
                   //inputbox.setAttribute("pattern","[0-9]*");
                   
                   // set value from previous workout 
                   inputbox.value = workout[index][i][weightCounter];
                   inputbox.style.color = "#CCC";


                    // Apply onfocus logic
                    inputbox.onfocus = function() {
                        
                        // If the current value is our default value
                        if (this.value !== "")  {
                        // clear it and set the text color to black
                        this.value = "";
                        this.style.color = "#000";
                        }
                    }
                    
                    inputbox.onblur = function() {
                        // If the current value is empty
                        id = this.id;
                        if (this.value == "") 
                        {
                            // set it to our default value and lighten the color
                            this.value = prevIdValues[id] ;
                            this.style.color = "#CCC";
                        }
                        // if value has been entered then put this value into global object 'currentIdValues'
                        else
                        {
                            currentIdValue[id] = this.value;
                            console.log(currentIdValue);
                        }
                    }

                   tableData.appendChild(inputbox);
                   
                   var br = document.createElement("br")
                   tableData.appendChild(br);
                   
                   weightCounter += 2;          
                   
               }
           
           tableRow.appendChild(tableData);
        
            
           tableData = document.createElement('td');
           
           for (j=1;j<=boxes;j++)
               {    
                   var id = i +":3:"+j;
                   prevIdValues[id] = workout[index][i][repCounter];
                   
                   inputbox = document.createElement("input");
                   inputbox.setAttribute("type","text");
                   inputbox.setAttribute("id",i+":3:"+j);
                   inputbox.setAttribute("size","10");
                   //inputbox.setAttribute("pattern","[0-9]*");
                   
                   // set value from previous workout
                   inputbox.value = workout[index][i][repCounter];
                   inputbox.style.color = "#CCC";


                    // Apply onfocus logic
                    inputbox.onfocus = function() {
                        
                        // If the current value is our default value
                        if (this.value !== "")  {
                        // clear it and set the text color to black
                        this.value = "";
                        this.style.color = "#000";
                        }
                    }
                    
                    // Apply onblur logic where the global id object is referenced 
                    // to re-enstate the previous workouts value 
                    inputbox.onblur = function() {
                        // If the current value is empty
                        id = this.id;
                        if (this.value == "") 
                        {
                            // set it to our default value and lighten the color
                            this.value = prevIdValues[id] ;
                            this.style.color = "#CCC";
                        }
                        // if value has been entered then put this value into global object 'currentIdValues'
                        else
                        {
                            currentIdValue[id] = this.value;
                            console.log(currentIdValue);
                        }
                    }
                                  
                   tableData.appendChild(inputbox);
                   
                   br = document.createElement("br")
                   tableData.appendChild(br);
                   
                   repCounter += 2;
                   
               }
            
           tableRow.appendChild(tableData);

           valueTable.appendChild(tableRow);
                     
        }  
    
    mainNode.appendChild(valueTable);
    
    
};

function next(){
    
    exportdata(exerciseIndex);
    console.log(workout);
    
    mainNode.removeChild(exerciseName);
    mainNode.removeChild(restTime);
    mainNode.removeChild(repRange);
    mainNode.removeChild(valueTable);
    mainNode.removeChild(nextButton);
    if (exerciseIndex > 1)
        {
            mainNode.removeChild(prevButton);
        }
        
    exerciseIndex += 1;
    displayExercise(exerciseIndex);    
};

function prev(){
    
    mainNode.removeChild(exerciseName);
    mainNode.removeChild(restTime);
    mainNode.removeChild(repRange);
    mainNode.removeChild(valueTable);
    mainNode.removeChild(nextButton);
    mainNode.removeChild(prevButton);
    
    exerciseIndex -= 1;
    displayExercise(exerciseIndex);    
};

function exportdata(index)
{
    
    //determine the number of sets in exercise ////// remember that this -3 elements off and may change depedning on structure
    sets = setCounter(workout[index]);
    
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
    
    for(i=1;i=sets;i++)
        {
            entries = workout[index][i].length;
            entries = (entries - 1)/2; 
        
            for (j=1; j<= entries; j++)
                {
                    var weightCounter = 1;
                    var repCounter = 2;
                    
                    id = i + ":2:" + j;
                    workout[index][i][weightCounter] = currentIdValue[id];
                    
                    id = i + ":3:" + j;
                    workout[index][i][repCounter] = currentIdValue[id];
                    
                    weightCounter += 2;
                    repCounter += 2;
                    
                };    
            
        }
    
};















