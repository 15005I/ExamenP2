import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonCheckbox, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GradeService, Grade } from '../grades.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonItem, IonLabel, IonButton, IonCheckbox, IonInput, CommonModule],
})

export class HomePage implements OnInit {

  grades$!: Observable<Grade[]>;
  name: string = '';
  apellidos: string = '';
  matricula: string = '';
  email: string = '';
  grade: number = 0;

  constructor(private gradeService: GradeService){}

  ngOnInit() {
    this.getGrades();
  }

  getGrades() {
    this.grades$ = this.gradeService.getGrades();
  }

  addGrade(grade: number) {
    if (grade) {
      const newGrade: Grade = {name: this.name, apellidos: this.apellidos, matricula: this.matricula, email: this.email, grade: this.grade};
      this.gradeService.addGrade(newGrade).then(() => {
        this.getGrades(); 
        this.name  = '';
        this.apellidos = '';
        this.matricula = '';
        this.email = '';
        this.grade = 0;
      });
    }
  }

  updateGrade(id: string | undefined, grade: number | undefined) {
    if(id){
      this.gradeService.updateGrade(id, { grade: Number(grade) }).then(() => {
        this.getGrades();
      });
    }
  }

  deleteGrade(id: string | undefined) {
    if (id) {
      this.gradeService.deleteGrade(id).then(() => {
        this.getGrades();
      });
    }
  }

}