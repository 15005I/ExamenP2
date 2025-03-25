import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonCheckbox, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GradeService, Grade } from '../grades.service';
import { AuthService } from '../auth.service';
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
  damm: number = 0;
  oca: number = 0;
  mate: number = 0;
  pmp: number = 0;
  m3d: number = 0;
  editingGradeId: string | null = null;

  constructor(private gradeService: GradeService, private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.getGrades();
  }

  getGrades() {
    this.grades$ = this.gradeService.getGrades();
  }

  addOrUpdateGrade() {
    if (this.editingGradeId) {
      this.updateGrade(this.editingGradeId);
    } else {
      this.addGrade();
    }
  }

  addGrade() {
    const newGrade: Grade = {
      name: this.name,
      apellidos: this.apellidos,
      matricula: this.matricula,
      email: this.email,
      damm: this.damm,
      oca: this.oca,
      mate: this.mate,
      pmp: this.pmp,
      m3d: this.m3d
    };
    this.gradeService.addGrade(newGrade).then(() => {
      this.getGrades(); 
      this.resetForm();
    });
  }

  updateGrade(id: string) {
    const updatedGrade: Partial<Grade> = {
      name: this.name,
      apellidos: this.apellidos,
      matricula: this.matricula,
      email: this.email,
      damm: this.damm,
      oca: this.oca,
      mate: this.mate,
      pmp: this.pmp,
      m3d: this.m3d
    };
    this.gradeService.updateGrade(id, updatedGrade).then(() => {
      this.getGrades();
      this.resetForm();
    });
  }

  editGrade(grade: Grade) {
    this.editingGradeId = grade.id || null;
    this.name = grade.name;
    this.apellidos = grade.apellidos;
    this.matricula = grade.matricula;
    this.email = grade.email;
    this.damm = grade.damm;
    this.oca = grade.oca;
    this.mate = grade.mate;
    this.pmp = grade.pmp;
    this.m3d = grade.m3d;
  }

  deleteGrade(id: string | undefined) {
    if (id) {
      this.gradeService.deleteGrade(id).then(() => {
        this.getGrades();
      });
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Navigate to the login page
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  }

  resetForm() {
    this.name = '';
    this.apellidos = '';
    this.matricula = '';
    this.email = '';
    this.damm = 0;
    this.oca = 0;
    this.mate = 0;
    this.pmp = 0;
    this.m3d = 0;
    this.editingGradeId = null;
  }
}