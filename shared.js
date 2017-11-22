




// Get the previous workout from local storage 

var storageKey = "Workout_" + workoutIndex;

if (typeof(Storage) !== "undefined")
{
    var workoutAsJSON = localStorage.getItem(storageKey);
    
    if (workoutAsJSON !== null)
        {
            workout = JSON.parse(workoutAsJSON)
        }
}
else
{
    console.log("localStorage is not supported by current browser.");
}


// Global Varibales


// the prevIdvalue object is used as a way of referencing objects in the onblur function as just using the original workout object runs into errors becuse of the loops. The currentIdvalue is used to keep track of any chages that are made.
var prevIdValues = {},
    currentIdValue = {},
    
    // page vists acts as a button to determine if exercise has previosuly been view, 1 = page has been view. If page has been view then the input values should be displayed in black, not light grey.
    pageVisits = [];


var mainNode = document.getElementsByTagName("main")[0];

//Determine the number of exercises to be performed 
var exerciseNum = exerciseCounter(workout);
    
// The begin workout page
if (exerciseIndex === 0)
        {
            
            var explanation = document.createElement('p');
            explanation.setAttribute("id", "explanation");
            explanation.textContent = infomessage;
            mainNode.appendChild(explanation);
            
            
            var listNode = document.createElement("ol");
            listNode.setAttribute("id", "list");    
            
            for (i=0; i < exerciseNum; i++)
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

function exerciseCounter(obj){
        
    var count = 0;
    for(var i in obj)
        if(obj.hasOwnProperty(i)){
			count++;
		}
    
    // -3 to just get the number of sets
    return count - 2;
    };

function displayExercise(index){
    
    // set these back to an empty object for each exercise so that we dont get an overide effect (not that it would matter)
    prevIdValues = {}
    currentIdValue = {};
    
    // exercise name
    var exerciseName = document.createElement('div');
    exerciseName.setAttribute("id","exerciseName");
    exerciseName.textContent = workout[index].name;
    mainNode.appendChild(exerciseName);
    
    // recommended rest time
    var restTime = document.createElement('div');
    restTime.setAttribute("id","restTime");
    restTime.textContent = "Rest Time: "  + workout[index].rest + "s";
    mainNode.appendChild(restTime);
    
    // recommended rep range
    var repRange = document.createElement('div');
    repRange.setAttribute("id","repRange");
    repRange.textContent = "Rep Range: "  + workout[index].reps;
    mainNode.appendChild(repRange);
    
    
    // make next, previous and end buttons
    if( index < exerciseNum)
        {
            var nextButton = document.createElement('button');
            nextButton.setAttribute("id", "nextButton");
            nextButton.innerHTML = "Next";
            nextButton.onclick = next;

            mainNode.appendChild(nextButton);   
        }
    
    if( index > 1 )
        {
            var prevButton = document.createElement('button');
            prevButton.setAttribute("id", "prevButton");
            prevButton.innerHTML = "Previous";
            prevButton.onclick = prev;
            
            mainNode.appendChild(prevButton);   
        }
    if (index === exerciseNum)
        {
            var endButton = document.createElement('button');
            endButton.setAttribute('id','endButton');
            endButton.innerHTML = "End Workout";
            endButton.onclick = endWorkout;
            
            mainNode.appendChild(endButton);
        }
    
    
    // make table based and assign heading rot 
    var valueTable = document.createElement('table');
    valueTable.setAttribute("id", "valueTable");
    
    var tableRow = document.createElement('tr')
    
    // table headings
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
            
           // build set number row (1st row)
           tableData = document.createElement('td');
           tableData.innerHTML = i;
           tableRow.appendChild(tableData);
            
           tableData = document.createElement('td');
            
           //find number of input boxes needed to account for drop sets or supersets
           boxes = workout[index][i].length;
           boxes = (boxes - 1)/2;
            
           // create the number of input boxes required and assign them an id for later reference
           // build weigth row (2nd column)   
           for (j=1;j<=boxes;j++)
               {
                   
                   // assign id value to previous weight in global object varibale (to help make on blur work)
                   var id = i +":2:"+j;
                   prevIdValues[id] = workout[index][i][weightCounter];

                   // set current value id same as previous value so that if user does not change weight/reps will not have to re-enter
                   currentIdValue[id] = prevIdValues[id];
                   
                   
                   // build input boxes to enter data
                   var inputbox = document.createElement("input");
                   inputbox.setAttribute("type","text");
                   inputbox.setAttribute("id",i+":2:"+j);
                   inputbox.setAttribute("size","10");
                   //inputbox.setAttribute("pattern","[0-9]*");
                   
                   
                   // set value of input boxes from previous workout 
                   //inputbox.value = workout[index][i][weightCounter];
                   inputbox.value = prevIdValues[id];
                   // set value of page colour depending on wether page has previously been visited                    
                   if (pageVisits[index] !== 1)
                       {
                            inputbox.style.color = "#CCC";  
                       }
                   else
                       {
                           inputbox.style.color = "#000"; 
                       }
                   


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
                    // to re-enstate the previous workouts value when block is left black
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
            
            
           // Build reps row (3rd column)
           for (j=1;j<=boxes;j++)
               {    
                   var id = i +":3:"+j;
                   prevIdValues[id] = workout[index][i][repCounter];
                   
                   // set current value id same as previous value so that if user does not change weight/reps will not have to re-enter
                   currentIdValue[id] = prevIdValues[id];
                   
                   inputbox = document.createElement("input");
                   inputbox.setAttribute("type","text");
                   inputbox.setAttribute("id",i+":3:"+j);
                   inputbox.setAttribute("size","10");
                   //inputbox.setAttribute("pattern","[0-9]*");
                   
                   // set value from previous workout
                   inputbox.value = prevIdValues[id]
                   // set value of page colour depending on wether page has previously been visited
                   if (pageVisits[exerciseIndex] !== 1)
                       {
                            inputbox.style.color = "#CCC";  
                       }
                   else
                       {
                           inputbox.style.color = "#000"; 
                       }

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
                    // to re-enstate the previous workouts value when block is left black
                    inputbox.onblur = function() {
                        // If the current value is empty
                        id = this.id;
                        if (this.value == "") 
                        {
                            // set it to our default value and lighten the color
                            this.value = prevIdValues[id];
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
    
    var fillAllButton = document.createElement('button');
    fillAllButton.setAttribute('id','fillAllButton');
    fillAllButton.innerHTML = "Fill All";
    fillAllButton.onclick = fillAll;
            
    mainNode.appendChild(fillAllButton);
    
    
};

function next(){
    
    exportdata(exerciseIndex);
    
    console.log(workout);
    
    mainNode.removeChild(exerciseName);
    mainNode.removeChild(restTime);
    mainNode.removeChild(repRange);
    mainNode.removeChild(valueTable);
    mainNode.removeChild(nextButton);
    mainNode.removeChild(fillAllButton);
    
    // to account for the fist exercise where there is no previous button
    if (exerciseIndex > 1)
        {
            mainNode.removeChild(prevButton);
        }
    
    pageVisits[exerciseIndex] = 1;  
    exerciseIndex += 1;
    displayExercise(exerciseIndex);
    
};

function prev(){
    
    exportdata(exerciseIndex);
    
    mainNode.removeChild(exerciseName);
    mainNode.removeChild(restTime);
    mainNode.removeChild(repRange);
    mainNode.removeChild(valueTable);
    mainNode.removeChild(prevButton);
    mainNode.removeChild(fillAllButton);
    
    // to account for the last exercise where there is no next button
    if (exerciseIndex < exerciseNum)
        {
            mainNode.removeChild(nextButton);   
        }
    else
        {
            mainNode.removeChild(endButton);
        }
    
    pageVisits[exerciseIndex] = 1;
    exerciseIndex -= 1;
    displayExercise(exerciseIndex);
    
};

function fillAll(){
    
    var value = currentIdValue["1:2:1"];
    console.log(value);
    
    var sets = setCounter(workout[exerciseIndex]);
    
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
    
    for(i=1;i<=sets;i++)
        {
            entries = workout[exerciseIndex][i].length;
            entries = (entries - 1)/2; 
            console.log(entries);
            console.log(exerciseIndex);
            
            for (j=1; j <= entries; j++)
                {
                    
                    // build the required id and set the workout object to that id value
                    id = i + ":2:" + j;
                    console.log(id);
                    document.getElementById(id).value = value;
                    document.getElementById(id).style.color = "#000";
                    currentIdValue[id] = value;
                    
                }; 
    
        }
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
    
    for(i=1;i<=sets;i++)
        {
            entries = workout[index][i].length;
            entries = (entries - 1)/2; 
            
            var weightCounter = 1;
            var repCounter = 2;
        
            for (j=1; j <= entries; j++)
                {
                    
                    // build the required id and set the workout object to that id value
                    id = i + ":2:" + j;
                    
                    workout[index][i][weightCounter] = currentIdValue[id];
                    
                    id = i + ":3:" + j;
                    workout[index][i][repCounter] = currentIdValue[id];
                    
                    weightCounter += 2;
                    repCounter += 2;
                    
                };    
            
        }
    
};


function endWorkout()
{
    
    // set date to todays workout ( we do it at the end so that the previous date is diplayed throuhgout the workout)
    var day = new Date().getDate(),
        month = new Date().getMonth() + 1,
        year = new Date().getFullYear()

    var date = day + "/" + month + "/" + year;
    
    console.log(date);
    
    workout.date = date;

    exportdata(exerciseIndex);
    
    if (confirm("Save Workout?") === true)
    {
    workoutAsJSON = JSON.stringify(workout)
        
    // save workout to individual workout key    
    localStorage.setItem(storageKey,workoutAsJSON);
    
    alert("Workout Saved");
        
    //save workout to complete key
    var allWorkoutsAsJSON = localStorage.getItem("Workout_ALL")
    
    console.log(allWorkoutsAsJSON)
        
    if (allWorkoutsAsJSON !== null)
        {
            var allWorkouts = JSON.parse(allWorkoutsAsJSON);
            
            allWorkouts.push(workout);
            
        }
    else
        {
            allWorkouts = [workout];
        }
    
    allWorkoutsAsJSON = JSON.stringify(allWorkouts)
        
    localStorage.setItem("Workout_ALL",allWorkoutsAsJSON);
     
        
    // go back to workout page    
    location.href = "workouts.html";
         
    }    
    
    
        
    
};

function cancelWorkout()
{
    if (exerciseIndex > 0)
        {
            if (confirm("Are you sure you want to leave workout? All progress will be lost!") === true)
                {
                    location.href = "workouts.html";
                }    
        }
    else
        {
            location.href = "workouts.html";
        }
    
};












