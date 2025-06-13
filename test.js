const a = new Array(5);
a[0] = "A";
a[1] = "B";
a[2] = "C";
a[3] = "D";
a[4] = "E";
/*
for(let i=0; i < a.length; i++){
    console.log("a i", i, a[i]);
    if(a[i] == "B"){
        console.log("i = b");
    }
    else if(a[i] == "C"){
        console.log("i = c");
    }
    else {
        console.log("Was anderes");
    }
}
*/
let i=0;
while(true){

    i++;
    if(i >= a.length){
        break;
    }
    console.log("a i", i, a[i]);
}