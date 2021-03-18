  
  let money = document.getElementById("money");
  let display = document.getElementById("display");
  let bill_acc = document.getElementById("bill_acc");
  let displayBalance = document.getElementById("displayBalance");
  let displayInfo = document.getElementById("displayInfo");
  let progressBar = document.getElementsByClassName("progress-bar")[0];
  let change_box = document.getElementById("change_box");
  let lock = document.getElementById("lock");
  let cup_coff = document.getElementById("cup_coff");
  let progress = 0;
  
  function clearInp(){
    display.hidden;
  }
  
  function getCoffee(coffeeName, rub){
    if(+money.value>=rub){
      money.value = +money.value-rub;
      displayBalance.innerText = money.value;
      let timerId = setInterval(()=>{
        /*lock.hidden = false;*/
        if(progress>110){
          clearInterval(timerId);
          progressBar.style.width = 0+'%';
          displayInfo.innerHTML = `<i class="fas fa-mug-hot"></i> Кофе ${coffeeName} готов`;
          progress = 0;
          cup_coff.hidden = false;
         /* lock.hidden = true*/
          return;
        }
        else if(progress<40) displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> Приготовление...`;
        else if(progress<80) displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> Приготовление...`;
        else
          displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i>Приготовление...`;
          progressBar.style.width = ++progress+'%';
      },70);
    }else{
       displayInfo.innerHTML = `<i class="far fa-frown"></i> Недостаточно средств`;
      }
  }
  
  
    
   function getChange(num){
    let change_box_h = change_box.getBoundingClientRect().height-60;
    let change_box_w = change_box.getBoundingClientRect().width-60;
    let change = 0;
    let top = Math.random()*change_box_h;
    let left = Math.random()*change_box_w;
    if(num>=10) change = 10;
    else if(num>=5) change = 5;
    else if(num>=2) change = 2;
    else if(num>=1) change = 1;
    else{
      let audio = new Audio("audio/getchange.mp3");
      audio.play();
      money.value = 0;
      displayBalance.innerText = money.value;
    }
   
    
    if(change>0){
      /*change_box.innerHTML += `<img onclick='this.style.display="none";' src="/img/${change}rub.png" style="top:${top}px;left:${left}px;">`;*/
      let img = document.createElement('img');
      img.src = `img/${change}rub.png`;
      img.style.top = top+'px';
      img.style.left = left+'px';
      img.onclick = function(){this.hidden=true;}
      change_box.append(img);
      getChange(num-change);
    }
   }
   
      let banknotes = document.querySelectorAll("[src$='rub.jpg']");
      let zIndex = 1;
      for(let i=0; i<banknotes.length; i++){
        let banknote = banknotes[i];
        banknote.onmousedown = function(){
          banknote.ondragstart = function(){return false;}
          banknote.style.position = 'absolute';
          banknote.style.zIndex = ++zIndex;
          banknote.style.transform = 'rotate(90deg)';
          /*let shiftX = event.clientX - banknote.getBoundingClientRect().left;
          let shiftY = event.clientY - banknote.getBoundingClientRect().top;*/
          
          function moveAt(event){
            banknote.style.top = (event.clientY-banknote.offsetHeight/2)+'px';
            banknote.style.left = (event.clientX-banknote.offsetWidth/2)+'px';
          }
          document.addEventListener('mousemove',moveAt);
          banknote.onmouseup = function(){
            document.removeEventListener('mousemove',moveAt);
            let bill_acc_top = bill_acc.getBoundingClientRect().top;
            let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height*2/3);
            let bill_acc_left = bill_acc.getBoundingClientRect().left;
            let bill_acc_right = bill_acc.getBoundingClientRect().right;
            let banknote_top = banknote.getBoundingClientRect().top;
            let banknote_left = banknote.getBoundingClientRect().left;
            let banknote_right = banknote.getBoundingClientRect().right;
            if(bill_acc_top<banknote_top && bill_acc_bottom>banknote_top && bill_acc_left<banknote_left && bill_acc_right>banknote_right){
              money.value = (+money.value)+(+banknote.dataset.value);
              displayBalance.innerText = money.value;
              let audio = new Audio("audio/banknotes.mp3");
              audio.play();
              banknote.hidden = true;
            }
        }
      }
    }
