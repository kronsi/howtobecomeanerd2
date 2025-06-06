const newArray = [
    "A", "B", "C", "D", "E"
] 

console.log("newArray.length", newArray.length);
for(let i=0; i < newArray.length; i++){
    console.log("new Array i", i, newArray[i]);
    if(i==1 && newArray[i] == "B"){
        console.log("i = 1");
    }
    else if( i== 2){
        console.log("i = 2");
    }
    else {
        console.log("i ist nicht 1 und nicht 2")
    }
}



/*
let i=0;
while(true){
    if(i >= newArray.length){
        break;
    }
    console.log("new Array i", i, newArray[i]);

    i = i +1;
}
*/