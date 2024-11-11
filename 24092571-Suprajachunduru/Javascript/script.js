let a = "Supraja"
console.log(a);
number = 0;
if (number > 0){
    console.log("pn");
}
else {
    console.log("nn");
}
number = 10;
if(number %2==0){
    console.log("even number");
}
else{
    console.log("odd number");
}
// conct the two values
number = 10;
if(number %2==0){
    console.log(`${number} is a even number`);
}
else{
    console.log(`${number} is a odd number`);
}

let num1=10;
let num2=20;
let num3=30;
if(num1>num2 || num2>num3) {
    console.log(`${num1} is greater than ${num2}`);
}
else{
    console.log(`${num2} is greater than ${num3}`);
}

a=10
b=++a
b=a++
console.log(a,b);

c=20
d=--c
console.log(c,d);
d=c--
console.log(c,d)