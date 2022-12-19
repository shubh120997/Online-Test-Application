import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root'
})

export class ResultsService implements OnInit {

  score: number = 0;
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  choicesArr: any = [];
  queList: any = [];
  constructor( private QS: QuestionsService, private router: Router) { }

  async ngOnInit(): Promise<void> {  
    this.queList = await this.QS.getQuestionJson();     
  }
  // saving the options entered by the user into the choicearr
  saveChoices(quesNo: number, choice: any) {
    const length = this.choicesArr.length;
    const question = {
      questionNumber: quesNo,
      choice: choice
    }
    if (length === 0) {
      this.choicesArr.push(question);
    } 
    else if (length > 0) {
      for(var i=0; i<length; i++){
        if (this.choicesArr[i].questionNumber === quesNo) {
          this.choicesArr[i].choice = choice;
          break;
        }
      }
      if(i === length){
        this.choicesArr.push(question);
      }
    }
  }
    
  // evaluating the user entered choices (choicearr)with correct answers
  async Evaluate() {
    console.log('******inside evalute******')
    this.queList = await this.QS.getQuestionJson();
    const list = this.choicesArr; 
    this.router.navigate(["/results"]);
    list.map((value: any, i: number) => {
      let queNo = (value.questionNumber)-1;
      this.queList[queNo].options.map((option: any) => {
        if(option.correct){
          if(option.text === value.choice){
            this.correctAnswer++;
            this.score += 10;
          }
          else{
            this.wrongAnswer++;
            this.score -= 5;
          }
        }
      })
    })
  }

}
