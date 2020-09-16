//THIS IS NEW UPDATE
let deck_id = "";
const decknameValue = {
  "KING": 13,
  "QUEEN": 12,
  "JACK": 11,
  "ACE": 1
};

let totalcurrentBet = 0;
let totalBet = 40000;
let getInputBet = 0;
let computerScore = 0;
let playerScore = 0;
let showTubeCards =[]; 
let GetpickCards = [];
      async function fetchQuote() {
        const rsp = await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const data = await rsp.json();

        return data.deck_id;
      }

      async function shuffleCard() {
        let result = await fetchQuote();

        return result;
      }

      async function drawCard(num, deck_id) {
        let url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`;

        const rsp = await fetch(url);
        const data = await rsp.json();

        return data.cards;
      }

      const dealer = async () => {
        deck_id = await shuffleCard();

        return {
          Draw1st: [],
          drawCards: async () => {
            this.Draw1st = await drawCard(2, deck_id);

            return this.Draw1st;
          },
        };
      };

      (async function () {
        let run = await dealer();
        let cardsDrawn = await run.drawCards();
        console.log(cardsDrawn);
        cardsDrawn.forEach((card) => {
        let deckNameVal_player = (decknameValue[card.value]===undefined?card.value:decknameValue[card.value]);
          console.log(card.value);
          console.log(card.suit);
          console.log(card.image);

          document.querySelector(
            "#player"
          ).innerHTML += `<img src="${card.image}" heigth="100" width="100"/>`;
           playerScore+=parseInt(deckNameVal_player);
        });
        document.querySelector("#playerhand").innerHTML= `Player on hand: ${playerScore}`;//"Player on hand: "+playerScore;

        let cardsDrawnComputer = await run.drawCards();
        //console.log(cardsDrawnComputer.length);

        for(i = 0 ; i < cardsDrawnComputer.length; i++){
            console.log(cardsDrawnComputer[i]);
            const cardsDawArr = cardsDrawnComputer[i];
            let deckNameVal = (decknameValue[cardsDawArr.value]===undefined?cardsDawArr.value:decknameValue[cardsDawArr.value]);
            if(i==0){
              document.querySelector("#computer").innerHTML += `<img src="${cardsDawArr.image}" heigth="100" width="100"/>`;
            }
            else{
               document.querySelector("#computer").innerHTML += `<img src="https://opengameart.org/sites/default/files/card%20back%20red.png" heigth="100" width="100"/>`;
            }
          //  computerScore.push(deckNameVal);
            console.log(deckNameVal);
            computerScore+=parseInt(deckNameVal);
            showTubeCards.push(cardsDrawnComputer[i]);
        }
        console.log('computerscore:'+ (computerScore > 21?(computerScore-21):computerScore));
       
        // cardsDrawnComputer.forEach((card) => {
        //   console.log(card.value);
        //   console.log(card.suit);
        //   console.log(card.image);

        //   document.querySelector(
        //     "#computer"
        //   ).innerHTML += `<img src="${card.image}" heigth="100" width="100"/>`;
        // });
         // document.querySelector(
         //    "#computer"
         //  ).innerHTML += `<img src="https://opengameart.org/sites/default/files/card%20back%20red.png" heigth="100" width="100"/>`;
        //https://opengameart.org/sites/default/files/card%20back%20red.png
      })();


       const getHitCards = async ()=>{
          deck_id = await fetchQuote();
          return {
            Draw: [],
            drawCards: async () => {
              this.Draw = await drawCard(1, deck_id);
              return this.Draw;
            },
          }
       };
       let count = 0;
      document.querySelector("#pickcards").addEventListener('click',async ()=>{

          let gethitcards = await getHitCards();
          let cardshit = await gethitcards.drawCards();
          cardshit.forEach((cards)=>{
            let deckNameVal_player = (decknameValue[cards.value]===undefined?cards.value:decknameValue[cards.value]);
            count++;
            if(count> 1){
              document.querySelector(".information-board").innerHTML="Only one cards at the time to Pick Cards";

            }else{
              document.querySelector("#player").innerHTML+= `<img src="${cards.image}" heigth="100" width="100">`;
              playerScore+=parseInt(deckNameVal_player);
              computersPick();
              GetpickCards.push(cards);
            }
            
          });
          document.querySelector("#playerhand").innerHTML=`Player on hand: ${(playerScore > 21?(playerScore-21):playerScore)}`;
          


       }); 


  async function computersPick(){
    const computerGetCards = await getHitCards();
    const cardsPickCom = await computerGetCards.drawCards();

    if((computerScore > 21?(computerScore-21):computerScore) < 10) {
        cardsPickCom.forEach((cards)=>{
          let deckNameVal_player = (decknameValue[cards.value]===undefined?cards.value:decknameValue[cards.value]);
           document.querySelector("#computer").innerHTML += `<img src="https://opengameart.org/sites/default/files/card%20back%20red.png" heigth="100" width="100"/>`;
          computerScore+=parseInt(deckNameVal_player);
          console.log(cards.value);
          showTubeCards.push(cards);
        });
    }
  }

 function Display(){
  document.querySelector(".totalbethand").innerHTML=`Total Bet: ${totalBet.toLocaleString()}`;
};

Display();


document.querySelector("#dealbtn").addEventListener('click',()=> {
  const inputbetValue = document.querySelector("#inputbet").value;
  const inputValueInt = inputbetValue.replace(/,/g, "");
  if(totalBet < inputValueInt||(inputValueInt==="")) {
    alert("Not enough bet value");
  }else{
    getInputBet = inputValueInt;
    document.querySelector("#holdbtn").style.display="block";
    document.querySelector("#pickcards").style.display="block";
    document.querySelector("#dealbtn").style.display="none";
    document.querySelector("#inputbet").setAttribute("disabled","");
  }
});


async function computersPickHold(decname){
    const computerGetCards = await getHitCards();
    const cardsPickCom = await computerGetCards.drawCards();

    if((computerScore > 21?(computerScore-21):computerScore) < 10) {
        cardsPickCom.forEach((cards)=>{

           document.querySelector("#computer").innerHTML += `<img src="${cards.image}" heigth="100" width="100"/>`;
          computerScore+=parseInt(decname);
          console.log(cards.value);
          
        });

        console.log(computerScore);
    }
  }

document.querySelector("#holdbtn").addEventListener('click', ()=>{
    showTubeCards.forEach((cards)=>{
        document.querySelector("#computer > img").remove();
       document.querySelector("#computer").innerHTML+=`<img src="${cards.image}" heigth="100" width="100">`;
    });
    
    document.querySelector("#computerhand").innerHTML=`Computer on hand: ${computerScore}`;
    if((playerScore > 21?(playerScore-21):playerScore) > (computerScore > 21?(computerScore-21):computerScore)){
      document.querySelector(".information-board").innerHTML=`<label style="color: #eee;">You win, got <i style="color: #2db300;">${parseInt(getInputBet).toLocaleString()}</i></label>`;
      totalBet=(parseInt(totalBet)+parseInt(getInputBet));
     // totalBet+=totalcurrentBet;
       document.querySelector(".totalbethand").innerHTML=`Total Bet: ${totalBet.toLocaleString()}`;
       
    }else if(playerScore==computerScore){
         document.querySelector(".information-board").innerHTML="Draw";
    }
    else{
    //  console.log("error->"+totalBet);
      document.querySelector(".information-board").innerHTML=`<label style="color: #eee;">You lose, will deducted <i style="color: #e62e00;">${parseInt(getInputBet).toLocaleString()}</i></label>`;
      totalBet = (parseInt(totalBet)-parseInt(getInputBet));
     
       document.querySelector(".totalbethand").innerHTML=`Total Bet: ${totalBet.toLocaleString()}`;
       
    }


    document.querySelector("#holdbtn").style.display="none";
    document.querySelector("#pickcards").style.display="none";
    document.querySelector("#inputbet").setAttribute("disabled","");
   // document.querySelector("#dealbtn").style.display="block";
    document.querySelector("#return").style.display="block";
   // document.querySelector("#inputbet").removeAttribute("disabled");
    document.querySelector("#inputbet").value="";
    
    getInputBet=0;

});

document.querySelector("#return").addEventListener("click",()=>{
      getInputBet = 0;
      computerScore = 0;
      playerScore = 0;
      count=0;
      //showTubeCards.splice(0, showTubeCards.length);
      //console.log(`eto error ah -> ${showTubeCards}`);
    // for(countsTubeCards = 0 ; countsTubeCards<showTubeCards.length;countsTubeCards++){
    //   showTubeCards.splice(0, 1);
    // console.log(countsTubeCards);
    // }
    showTubeCards.forEach((erase)=>{
      document.querySelector("#computer > img").remove();
    });
    showTubeCards.splice(0, showTubeCards.length);
   
    
      PlayAgain();
      document.querySelector(".information-board").innerHTML="Win or Lose";
      document.querySelector("#return").style.display="none";
      document.querySelector("#dealbtn").style.display="block";
      document.querySelector("#inputbet").removeAttribute("disabled");
})
async function PlayAgain(){
  let run = await dealer();
        let cardsDrawn = await run.drawCards();
        //console.log(cardsDrawn);
        if(totalBet==0){
          alert("GAME OVER!!!");
          const yesno = confirm("Do you want to play again?");
          if(yesno){
            location.reload();
          }
        } else {
          cardsDrawn.forEach((card) => {
            document.querySelector("#player > img").remove();
         let deckNameVal_player = (decknameValue[card.value]===undefined?card.value:decknameValue[card.value]);
           document.querySelector(
             "#player"
           ).innerHTML += `<img src="${card.image}" heigth="100" width="100"/>`;
            playerScore+=parseInt(deckNameVal_player);
         });
 
         GetpickCards.forEach((car)=>{
           document.querySelector("#player > img").remove();
         });
          GetpickCards.splice(0, GetpickCards.length);
         document.querySelector("#playerhand").innerHTML=`Player on hand: ${playerScore}`;
 
         let cardsDrawnComputer = await run.drawCards();
 
         //showTubeCards.splice(0, showTubeCards.length);
 
         for(i = 0 ; i < cardsDrawnComputer.length; i++){
         //   document.querySelector("#computer > img").remove();
            
             const cardsDawArr = cardsDrawnComputer[i];
             let deckNameVal = (decknameValue[cardsDawArr.value]===undefined?cardsDawArr.value:decknameValue[cardsDawArr.value]);
             if(i==0){
               document.querySelector("#computer").innerHTML += `<img src="${cardsDawArr.image}" heigth="100" width="100"/>`;
             }
             else{
                document.querySelector("#computer").innerHTML += `<img src="https://opengameart.org/sites/default/files/card%20back%20red.png" heigth="100" width="100"/>`;
             }
             document.querySelector("#computerhand").innerHTML="Computer on hand: ?";
             computerScore+=parseInt(deckNameVal);
             showTubeCards.push(cardsDrawnComputer[i]);
         }
        }
       
       
}



function FormatCurrency(ctrl) {
  //Check if arrow keys are pressed - we want to allow navigation around textbox using arrow keys
  if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
      return;
  }

  var val = ctrl.value;
  val = val.replace(/,/g, "")
  ctrl.value = "";
  val += '';
  x = val.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';

  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  ctrl.value = x1 + x2;
}

function CheckNumeric() {
  return event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 46;
}