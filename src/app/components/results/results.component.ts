import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { ResultsService } from '../service/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {

  score: number = 0;
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  NotAttempted: number = 0;
  questionList: any = [];
  id: any;
  choicesArr: any = [];
  public currentQue: number=0;

  constructor(private RS: ResultsService, private QS: QuestionsService) { }

  async ngOnInit(): Promise<void> {
    this.score = this.RS.score;
    this.correctAnswer = this.RS.correctAnswer;
    this.wrongAnswer = this.RS.wrongAnswer;
    this.questionList = await this.QS.getQuestionJson();
    this.choicesArr=this.RS.choicesArr;
    this.NotAttempted= this.questionList.length -(this.correctAnswer+this.wrongAnswer)
  }

  changeDisplay(){
    this.id = document.getElementById("content");
    if (this.id.style.display === "none") {
      this.id.style.display = "block";
    } else {
      this.id.style.display = "none";
    }
  }
}


  
    
  


  
   


