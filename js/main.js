'use strict';


// промисы

// console.log('Запрос данных ...');

// const req = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         console.log('Подготовка данных ...');

//         const data = {
//             name: 'John',
//             status: 'trainee'
//         };

//         resolve(data);
//     }, 2000);

// });


// req.then(data =>{
//     return new Promise((resolve, reject) =>{
//         setTimeout(() => {
//             data.old = 25;
//             resolve(data);
//             reject(data);
//         }, 2000);
//     }).then((resolve,reject) => {
//          data.modify = true;
//          return data;
//     }).then((data)=>{
//         console.log(data);
//     }).catch(()=>{
//         console.error('Произошла ошибка');
//     }).finally(()=>{
//         console.log('finally');
//     });
// });

const test = time => {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve()
        }, time);
    });
};

Promise.race([test(1000), test(2000)]).then(()=>{
    console.log('all');
});