import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class QuestionsService implements OnInit{

	public questionList: any =[];

	constructor(private http : HttpClient) { }

	ngOnInit():void {          
	}

	async getQuestionJson(){
		const data = await this.http.get<any>("assets/data/questions.json").toPromise();
		return data.questions;
	}
}