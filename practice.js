// Hoisting :
// Hoisting in javascript is default behaviour of moving the declaration of variable to the top of the current scope.
// We can say due to  hoisting we can use variable befaore declration.
// var can be hoisted but there is different scenerio for let and const it cannot be used before it is declared.
// Javascript Initialization are not hoisted.
// Javascript declaration are hoisted.
// Using strict-mode we cannnot use variable if they are not declared.


// CallBack : 
// 1) A callback is a function passed as an argument to another function.
// 2) It is a technique where we can call a function with another function.
// 3) A callback function can run after another function has finished.

// function displayResult(finalCalculation) {

//     console.log('Result : ' +finalCalculation);
// }

// function calculate(num1, num2, letsCallBack) {

//     const result = num1 + num2;
//     letsCallBack(result);

// }

// calculate(5, 10, displayResult);
// calculate(20, 10, displayResult);
// calculate(5, 40, displayResult);


//CallBackHell

// function post1(callback) {
//     console.log('post1 has been added.')
//     if(callback){
//         callback();
//     }
// }

// function post2(callback) {
//     console.log('post2 has been added.')
//     if(callback){
//         callback();
//     }
// }

// function post3(callback) {
//     console.log('post3 has been added.')
//     if(callback){
//         callback();
//     }
// }

// function post4() {
//     console.log('post4 has been added.')
// }

// post1(() => {
//     post2(() => {
//         post3(() => {
//             post4();
//         });
//     });
// });


// Promise : 
// A promise is an object which links producing code and consuming code.
// Producing code is a code that takes sometime
// Whereas consuming code is code which wait for sometime.

// promise has there state which has three different-result.
// pending - undefined
// fullfilled - result value 
// rejected - errorobject

// function createPost() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('Post Had been added')
//             resolve()
//         }, 3000)
//     });
// }

// function createPost1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('Post1 Had been added');
//             resolve();
//         }, 2000);
//     });   
// }

// // createPost();
// // createPost1();

// createPost()
// .then(createPost1);


// Async and await
// Async and awit makes promise easier to write 
// async makes function to return promise
// await make function to awit for promise
// await keyword can only be used in async function.
// await keyword makes the function to pause the exceution untile the promise is resolved/settled 

// async function createPost() {
//     let promise1 = await new Promise((resolve, reject) => {
//         setTimeout(() => {
          
//             resolve('Post has been added.');
//         }, 3000)
//     })

//     let result = await promise1;
//     console.log(result);
// }

// async function createPost1() {
//     let promise2 = await new Promise((resolve, reject) => {
//         setTimeout(() => {
    
//             resolve('Post1 has been added.');
//         }, 2000);
//     });

//     let result2 = await promise2;
//     console.log(result2);
// }

// createPost()
// .then(createPost1);

//Hoisting
//callback
//promise
//async and await
//temporal dead zone
//try-catch
//then.catch
//reduce method
//seTimeout()