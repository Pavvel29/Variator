const regul = /^[0-9]{1,3}$/;
let check = false;
document.querySelector('.options2__checkbox1').addEventListener('click', function () {
   if (this.hasAttribute('checked')) {
      if (document.querySelector('.item-error2')) {
         //console.log(111)
         document.querySelector('.item-error2').remove();
      }
      this.removeAttribute('checked');
      document.querySelector('.options2__checkbox1').checked = false;
      check = false;
   } else {
      let Varlen = document.querySelectorAll('.corpus__input').length;
      let numVar = document.querySelector('.options__input').textContent
      document.querySelector('.options2__checkbox1').checked = true;
      this.setAttribute('checked', 'checked');
      //console.log(+numVar)
      if ((Varlen - +numVar) >= 2) {
         check = true;
      } else {
         const itemError2 = document.createElement('div');
         itemError2.classList.add('item-error2');
         itemError2.textContent = 'Чтобы пользоваться этой функцией нужно больше участников или уменьшите количество победителей';
         document.querySelector('.options2').append(itemError2);
      }
   }
})

let arrWin = ['']
let w = 0;
const foo = function (win) {
   if (arrWin.length >= win) {
      return;
   }
   let rand = Math.floor(Math.random() * document.querySelectorAll('.corpus__input').length);
   arrWin.forEach(element => {
      if (document.querySelectorAll('.corpus__input')[rand].firstElementChild.textContent === element) {

         foo(win);
      }
   })

   arrWin[w] = document.querySelectorAll('.corpus__input')[rand].firstElementChild.textContent
   w++;
   foo(win);
}

document.querySelector('.options__input').addEventListener('keyup',function(){ 
      const ArrLen = this.textContent;
      const ArrLen2 = ArrLen.split('');
      //console.log(ArrLen2.length);
      //console.log(ArrLen2[0]);
         if(ArrLen2.length === 0){
            //console.log('Равняется нулю');
            //this.textContent = 1;
         }
         if(ArrLen2[0] == 0){
            //console.log('Значение ноль');
            this.textContent = 1;
         }
         if(ArrLen2.length > 2){
            //console.log('Больше трех');
            ArrLen2.pop();
            const fin = ArrLen2.join('');
            this.textContent = fin
         }
         if(ArrLen2.length > 3){
            this.textContent = 1;
         }
         if(regul.test(this.textContent)){
            //console.log('true');
            
         }else{
            //console.log('false');
            this.textContent = 1;
         }
         

      
})


document.querySelector('.corpus__button').addEventListener('click', function () {
   const item = document.createElement('div');
   item.classList.add('corpus__input-animate');
   this.before(item);

   setTimeout(() => {
      item.classList.remove('corpus__input-animate');
      item.classList.add('corpus__input');
      const item2 = document.createElement('span');
      item2.classList.add('corpus__input-text');
      item2.setAttribute('contenteditable', 'true')
      item.append(item2);


      if (document.querySelectorAll('.corpus__input').length >= 3) {
         document.querySelectorAll('.corpus__input').forEach(element => {
            const item3 = document.createElement('div');
            item3.classList.add('delete');
            if (!(element.lastElementChild.classList.contains('delete2'))) {
               element.append(item3)
               setTimeout(() => {
                  item3.classList.add('delete2');
                  item3.classList.remove('delete');
               }, 100)
            }
            element.lastElementChild.addEventListener('click', function () {
               
               if ((document.querySelectorAll('.corpus__input').length - +(document.querySelector('.options__input').textContent)) >= 2) {
                  check = false;
                  document.querySelector('.options2__checkbox1').checked = false;
                  
                  if(document.querySelector('.item-error2')){
                     document.querySelector('.item-error2').remove();
                  }
               }
               const itemDelete = this.parentElement;
               this.classList.add('delete3');
               setTimeout(() => {
                  
                  this.classList.remove('delete3');
                  this.remove();
                  itemDelete.classList.add('corpus__input-animate2');
                  setTimeout(() => {
                     itemDelete.remove();
                     if (document.querySelectorAll('.corpus__input').length <= 2) {
                        document.querySelectorAll('.corpus__input').forEach(element => {
                           if (element.lastElementChild.classList.contains('delete2')) {
                              element.lastElementChild.remove();
                           }
                        });
                     }
                  }, 100);
               }, 70);
            });
         });
      }
   }, 200);


})
document.querySelector('.corpus__output-button').addEventListener('click', () => {
   if (!(+(document.querySelector('.options__input').textContent) >= document.querySelectorAll('.corpus__input').length)) {
      const arrEle = [''];
      let iter = 0;
      let i = 0;
      document.querySelectorAll('.corpus__input-text').forEach(element => {
         new Promise((res, rej) => {
            setTimeout(() => {
               if (element.textContent === '') {
                  res(element);
               } else {
                  rej(element);
               }
            }, 0)
         })
            .then((element) => {
               element.parentElement.classList.add('border-error')
               const itemError = document.createElement('div');
               itemError.classList.add('item-error');
               itemError.textContent = 'Заполните все поля'
               document.querySelector('.corpus__output-button').append(itemError)
               new Promise(() => {
                  setTimeout(() => {
                     itemError.remove();
                     document.querySelectorAll('.corpus__input').forEach(element => {
                        if (element.classList.contains('border-error')) {
                           element.classList.remove('border-error');
                        }
                     })
                  }, 4000)
               })
            })
            .catch((element) => {
               arrEle[iter] = element.textContent;
               iter++;
               let randTriger = true;
               if (iter === document.querySelectorAll('.corpus__input').length) {
                  document.querySelectorAll('.corpus__input-text').forEach(element => {
                     let iter = 0;
                     arrEle.forEach(ele => {
                        if (ele === element.textContent) {
                           iter++
                        }
                        if (iter > 1) {
                           randTriger = false;
                           const item = element.parentElement;
                           item.classList.add('border-error');
                           const itemError = document.createElement('div');
                           itemError.classList.add('item-error');
                           itemError.textContent = 'Нельзя использовать одинаковые строки';
                           document.querySelector('.corpus__output-button').append(itemError);
                           new Promise(() => {
                              setTimeout(() => {
                                 itemError.remove();
                                 document.querySelectorAll('.corpus__input').forEach(element => {
                                    if (element.classList.contains('border-error')) {
                                       element.classList.remove('border-error');
                                    }
                                 });
                              }, 4000);
                           });
                        }
                     });
                  });
                  if (randTriger === true) {
                     if (check === false) {

                        //============
                        let arrWin = ['']
                        let w = 0;
                        const foo = function (win) {
                           let rand = Math.floor(Math.random() * document.querySelectorAll('.corpus__input').length);
                           arrWin.forEach(element => {
                              if (document.querySelectorAll('.corpus__input')[rand].firstElementChild.textContent === element) {
                                 foo(win);
                              }
                           })
                           if (arrWin.length >= win && arrWin[0] != '') {
                              return;
                           }
                           arrWin[w] = document.querySelectorAll('.corpus__input')[rand].firstElementChild.textContent;
                           w++;
                           foo(win);
                        }
                        //============

                        foo(+(document.querySelector('.options__input').textContent));
                        //console.log(arrWin);

                        document.querySelector('.corpus').classList.add('corpus3');
                        setTimeout(() => {
                           document.querySelector('.corpus').classList.add('display-none');
                           document.querySelector('.fone-img').classList.add('fone-img2');
                           document.querySelector('.conteiner').classList.add('overf');
                           document.querySelector('.corpus').classList.remove('corpus3');
                           setTimeout(() => {
                              document.querySelector('.fone-img').classList.remove('fone-img2');
                              document.querySelector('.conteiner').classList.remove('overf');
                              document.querySelector('.corpus2').classList.remove('display-none');
                              let num = 0;
                              arrWin.forEach(element => {
                                 num++
                                 document.querySelector('.result__text').innerHTML += num + ') ' + element + '<br>';
                              })
                           }, 2000)
                        }, 500);
                     } else {


                        //============
                        let arrWin = ['']
                        let w = 0;
                        const foo = function (win) {
                           let rand = Math.floor(Math.random() * document.querySelectorAll('.corpus__input').length);
                           arrWin.forEach(element => {
                              if (document.querySelectorAll('.corpus__input')[rand].firstElementChild.textContent === element) {
                                 foo(win);
                              }
                           })
                           if (arrWin.length >= win && arrWin[0] != '') {
                              return;
                           }
                           arrWin[w] = document.querySelectorAll('.corpus__input')[rand].firstElementChild.textContent;
                           w++;
                           foo(win);
                        }
                        //============

                        foo(+(document.querySelector('.options__input').textContent));
                        //console.log(arrWin);

                        document.querySelector('.corpus').classList.add('corpus3');
                        setTimeout(() => {
                           document.querySelector('.corpus').classList.add('display-none');
                           document.querySelector('.fone-img').classList.add('fone-img2');
                           document.querySelector('.corpus').classList.remove('corpus3');
                           setTimeout(() => {
                              document.querySelector('.fone-img').classList.remove('fone-img2');
                              document.querySelector('.corpus2').classList.remove('display-none');
                              let num = 0;
                              arrWin.forEach(element => {
                                 num++;
                                 document.querySelector('.result__text').innerHTML += num + ') ' + element + '<br>';
                                 document.querySelectorAll('.corpus__input-text').forEach(item => {
                                    if (item.textContent === element) {
                                       item.parentElement.remove();
                                    }
                                 })
                              })
                           }, 2000)
                        }, 500);
                     }



                  }



               }
            })
      })
   } else {
      const itemError = document.createElement('div');
      itemError.classList.add('item-error');
      itemError.textContent = 'Нельзя использовать такое количестово победителей';
      document.querySelector('.corpus__output-button').append(itemError);
      document.querySelector('.options__input').classList.add('border-error');
      new Promise(() => {
         setTimeout(() => {
            document.querySelector('.options__input').classList.remove('border-error');
            itemError.remove();
            document.querySelectorAll('.corpus__input').forEach(element => {
               if (element.classList.contains('border-error')) {
                  element.classList.remove('border-error');
               }
            });
         }, 4000);
      });
   }
})

document.querySelector('.corpus2__button').addEventListener('click', () => {
   if (document.querySelectorAll('.corpus__input').length <= 2) {
      console.log(1111);

      
      document.querySelectorAll('.corpus__input').forEach(element => {
         if (element.lastElementChild.classList.contains('delete2')) {
            element.lastElementChild.classList.remove('delete2');
            document.querySelector('.options2__checkbox1').removeAttribute('checked');
            document.querySelector('.options2__checkbox1').checked = false;
            check = false;
         }
      })
   }

   document.querySelector('.result__text').innerHTML = '';
   document.querySelector('.corpus2').classList.add('display-none');
   document.querySelector('.corpus').classList.remove('display-none');
})






































