import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { ResultsService } from '../service/results.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  public user: string = "";
  public queList: any = [];
  public currentQuestion: number = 0;
  public onsumbit: boolean = false;

  constructor(private QS: QuestionsService, private RS: ResultsService) { }

  async ngOnInit(): Promise<void> {
    this.user = localStorage.getItem('name')!.toUpperCase();   
    this.queList = await this.QS.getQuestionJson(); 
  }
  getChoices(quesNo: number, choice: any, index?: number) {
    this.RS.saveChoices(quesNo, choice);

  }
  submit() {
    this.onsumbit = true;
    this.RS.Evaluate(); 
  }
  preQuestion() {
    this.currentQuestion--;
  }
  nextQuestion() {
    this.currentQuestion++;
  }
}
