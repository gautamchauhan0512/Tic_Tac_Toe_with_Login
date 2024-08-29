let boxss = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let ngame = document.querySelector("#new_game");
let msg = document.querySelector("#msg");
let msg_con =document.querySelector(".msg_con");
 let turnO = true;
 const wingame = [
    [0 , 1, 2],
    [0 , 3, 6],
    [0 , 4, 8],
    [1 , 4, 7],
    [2 , 5, 8],
    [2 , 4, 6],
    [3 , 4, 5],
    [6 , 7, 8],
 ];
const newgame = () => {
    let turnO = true;
    btnenable();
    msg_con.classList.add("hide");
}


 boxss.forEach((box) =>{
    box.addEventListener("click",() => {
        console.log("box was clicked");
        if (turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText ="X"
            turnO = true;
        }
        box.disabled = true;

        checkwin();
    });

});
const btndisable = () => {
    for(let box of boxss){
        box.disabled =true;
    }
}
const btnenable = () => {
    for(let box of boxss){
        box.disabled =false;
        box.innerHTML = "";
    }
}
const showWinner = (winner) =>{
    msg.innerText = `Congratulation,Winner is ${winner}`;
    msg_con.classList.remove("hide");
    btndisable(); 

}
const checkwin = () => {
    for(let pattern of wingame){
      let pos1val = boxss[pattern[0]].innerText;
      let pos2val = boxss[pattern[1]].innerText;
      let pos3val = boxss[pattern[2]].innerText;

      if(pos1val != "" && pos2val != "" && pos3val != ""){
        if(pos1val === pos2val && pos2val === pos3val){
            console.log("Winnwr",pos1val);
            showWinner(pos1val);
        }
      }

    }
};
reset.addEventListener("click",newgame);
ngame.addEventListener("click",newgame);
