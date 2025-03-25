import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Grade {
  id?: string;
  name: string;
  apellidos: string;
  matricula: string;
  email: string;
  damm: number;
  oca: number;
  mate: number;
  pmp: number;
  m3d: number;
}

@Injectable({
  providedIn: 'root'
})

export class GradeService{
  private gradeCollection = collection(this.firestore, 'grades');

  constructor(private firestore: Firestore){}

  getGrades(): Observable<Grade[]> {
    return collectionData(this.gradeCollection, { idField: 'id' }) as Observable<Grade[]>;
  }

  addGrade(task: Grade){ 
    return addDoc(this.gradeCollection, task);
  }

  updateGrade(id: string, data: Partial<Grade>){
    const taskDoc = doc(this.firestore, `grades/${id}`);
    return updateDoc(taskDoc, data);
  }

  deleteGrade(id: string){
    const taskDoc = doc(this.firestore, `grades/${id}`);
    return deleteDoc(taskDoc);
  }
}