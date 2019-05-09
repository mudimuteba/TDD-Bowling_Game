"use strict";

class Player {
    constructor(name){
        this.name = name;
        this.firstRoll = Array.from(document.getElementsByClassName("shot1"));
        this.secondRoll = Array.from(document.getElementsByClassName("shot2"));
        this.thirdRoll = Array.from(document.getElementsByClassName("shot3"));
        this.frameScore = Array.from(document.getElementsByClassName("current"));
        this.totalScore = Array.from(document.getElementsByClassName("total"));
        this.pins = 10;
        this.remainder = 0;
        this.index = 0;
        this.score = 0;
    }

    scores(){
        this.updateTotals();
        if (this.firstRoll[this.index] && this.firstRoll[this.index].innerHTML == 10)
            this.secondRoll[this.index].innerHTML = 0;
    
        if (this.firstRoll[this.index] && this.index < 9){
            //one strike
            if (this.firstRoll[this.index - 1] && this.firstRoll[this.index - 1].innerHTML == 10)
                this.frameScore[this.index - 1].innerHTML = Number(this.firstRoll[this.index - 1].innerHTML) + Number(this.firstRoll[this.index].innerHTML) + Number(this.secondRoll[this.index].innerHTML);
            //two strikes
            if ((this.firstRoll[this.index - 2] && this.firstRoll[this.index - 2].innerHTML == 10) && (this.firstRoll[this.index - 1].innerHTML == 10))
                this.frameScore[this.index - 2].innerHTML = Number(this.firstRoll[this.index - 2].innerHTML) + Number(this.firstRoll[this.index - 1].innerHTML) + Number(this.firstRoll[this.index].innerHTML); 
            //three strikes
            if (this.firstRoll[this.index - 2] && this.firstRoll[this.index - 2].innerHTML == 10 && this.firstRoll[this.index - 1].innerHTML == 10 && this.firstRoll[this.index].innerHTML == 10)
                this.frameScore[this.index - 2].innerHTML = Number(this.firstRoll[this.index - 2].innerHTML) + Number(this.firstRoll[this.index - 1].innerHTML) + Number(this.firstRoll[this.index].innerHTML);
            //spare
            if (this.firstRoll[this.index - 1] && Number(this.firstRoll[this.index - 1].innerHTML) != 10 && (Number(this.firstRoll[this.index - 1].innerHTML) + Number(this.secondRoll[this.index - 1].innerHTML) == 10))
                this.frameScore[this.index - 1].innerHTML = Number(this.firstRoll[this.index - 1].innerHTML) + Number(this.secondRoll[this.index - 1].innerHTML) + Number(this.firstRoll[this.index].innerHTML);
            this.frameScore[this.index].innerHTML = Number(this.firstRoll[this.index].innerHTML) + Number(this.secondRoll[this.index].innerHTML);
            this.totalScore[0].innerHTML = Number(this.frameScore[0].innerHTML);
    
            if (this.index >= 1)
                this.updateTotals();
        } else if (this.index == 9) {
          this.secondRoll[9].innerHTML = Math.floor(Math.random() * this.pins + 1);
          this.thirdRoll[0].innerHTML = Math.floor(Math.random() * this.pins + 1);
        }
    }
     
    updateTotals(){
        for (let i = 1; i <= this.index; i++)
            if (this.totalScore[i])
                this.totalScore[i].innerHTML = Number(this.frameScore[i].innerHTML) + Number(this.totalScore[i - 1].innerHTML);
    }
    
    roll(pins){
      if (this.firstRoll[this.index] && this.firstRoll[this.index].innerHTML == "-"){
          this.firstRoll[this.index].innerHTML = pins;
          if (pins == 10){
              this.scores();
              if (this.totalScore[this.index]){
                this.score = parseInt(this.totalScore[this.index].innerHTML);
                this.index++;
              }
          }
          return this.score;
      } else {
          if (this.secondRoll[this.index])
            this.secondRoll[this.index].innerHTML = pins;
          this.scores();
          if (this.totalScore[this.index])
            this.score = parseInt(this.totalScore[this.index].innerHTML);
          this.index++;          
          return this.score;
      }
    }
};