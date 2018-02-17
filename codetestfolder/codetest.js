var namerankobjArray = new Array();

function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var name=document.getElementById("name_row"+no);
 var rank=document.getElementById("rank_row"+no);
	
 var nametemp=name.innerHTML;
 var ranktemp=rank.innerHTML;

	
 name.innerHTML="<input type='text' id='name_text"+no+"' value='"+nametemp+"'>";
 rank.innerHTML="<input type='text' id='rank_text"+no+"' value='"+ranktemp+"'>";

}

function save_row(no)
{
 var name_val=document.getElementById("name_text"+no).value;
 var rank_val=document.getElementById("rank_text"+no).value;

 var namerankobj = {}
 namerankobj.name = name_val;
 namerankobj.rank = rank_val;

 namerankobjArray[no-1] = namerankobj;
 console.log("The  save_row namerank object array is ", namerankobjArray);

 document.getElementById("name_row"+no).innerHTML=name_val;
 document.getElementById("rank_row"+no).innerHTML=rank_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";

 if(!(document.getElementById("averageRankdiv").style.display =='none')){
    averageRank();
 }
}

function delete_row(no)
{
 var name=document.getElementById("name_row"+no);
 var rank=document.getElementById("rank_row"+no);
removeFromnamerankArray( name.innerHTML, rank.innerHTML);
 document.getElementById("row"+no+"").outerHTML="";  
 console.log("The namerank  delete_row object array is ", namerankobjArray);
 if(namerankobjArray.length>0){
    if(!(document.getElementById("averageRankdiv").style.display =='none')){
        averageRank();
    }
  }else{
    document.getElementById("averageRankdiv").style.display ='none';
  }

}

var removeFromnamerankArray = function( name, rank){
    var i = namerankobjArray.length;
    while(i--){
        console.log("The array object is ", namerankobjArray[i])
       if(namerankobjArray[i]['name'] === name &&namerankobjArray[i]['rank'] === rank   ){
            namerankobjArray.splice(i,1);
           }
            
       }  
    }

function add_row()
//This function inserts a new row (name and rank) into the table. Whenever a new object is added, it is also added to the Global scope. 
//By design when the row is added, the rank order function is not called. However if the user has already clicked Average Rank, adding a new entry will call the Average Rank function. 
{
 var new_name=document.getElementById("name").value;
 var new_rank=document.getElementById("rank").value;
 var namerankobj = {}
 namerankobj.name = new_name;
 namerankobj.rank = new_rank;
 namerankobjArray.push(namerankobj);
 var table=document.getElementById("dataTable");
 var table_len=(table.rows.length);
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='name_row"+table_len+"'>"+new_name+"</td><td id='rank_row"+table_len+"'>"+new_rank+"</td><td><input type='button' id='edit_button"+table_len+"' class='fas fa-edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' style='display:none;' class='far fa-save' onclick='save_row("+table_len+")'> <input type='button' class='fas fa-trash-alt'  onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("name").value="";
 document.getElementById("rank").value="";
 if(!(document.getElementById("averageRankdiv").style.display =='none')){
    averageRank();
 }

}

function rankOrder()
{
    namerankobjArray.sort(function(a, b) {
        return a.rank - b.rank;
    });
   
    printTable();
}

function printTable(){
    //This function will be called from both the rankOrder as well as the reverseRankOrder functions. 
    var table=document.getElementById("dataTable");
    table.innerHTML = "";
    var row = table.insertRow(0).outerHTML="<tr><th>Name</th><th>Rank</th><th>Action</th></tr>";
    for ( index in namerankobjArray){
        namerank = parseInt(index) + 1;
        console.log("The value of namerank is  ",namerank );
        var row = table.insertRow(namerank).outerHTML="<tr id='row"+namerank+"'><td id='name_row"+namerank+"'>"+namerankobjArray[parseInt(index)].name+"</td><td id='rank_row"+namerank+"'>"+namerankobjArray[parseInt(index)].rank+"</td><td><input type='button' id='edit_button"+namerank+"' class='fas fa-edit' onclick='edit_row("+namerank+")'> <input type='button' id='save_button"+namerank+"' style='display:none;' class='far fa-save' onclick='save_row("+namerank+")'> <input type='button' class='fas fa-trash-alt'  onclick='delete_row("+namerank+")'></td></tr>";

    }
}

function reverserankOrder()
{
    //This function will print the
    namerankobjArray.sort(function(a, b) {
        return b.rank - a.rank;
    });
   
    printTable();
}

function averageRank()
{
    //The averageRank function will calculate the "averageRank" of all the objects in namerankobjArray which is in the Global scope. It will be called each time a rank is edited, a new entry is inserted or deleted.
    //There is no try catch here as front end validation is done to make sure that the rank entered is only integer.  
    console.log("It is getting called..")
   document.getElementById("averageRankdiv").style.display = "block";
   if(namerankobjArray.length>0){
   totalrank = 0; 
   for (index in namerankobjArray){
    totalrank += parseInt(namerankobjArray[parseInt(index)].rank) ; 
   }
   document.getElementById("averageRank").innerHTML = parseFloat(totalrank/namerankobjArray.length).toFixed(2);
   }
   else{
    document.getElementById("averageRankdiv").style.display = "none";
   }


}

