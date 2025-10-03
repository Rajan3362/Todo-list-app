import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  Timestamp,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore = inject(Firestore);
  private tasksCollection = collection(this.firestore, 'tasks');

  getTasks(): Observable<Task[]> {
    const q = query(this.tasksCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }).pipe(
      map(tasks => tasks.map(task => this.convertFirestoreDates(task)))
    );
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const taskWithTimestamps = {
      ...task,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(this.tasksCollection, taskWithTimestamps);
    return {
      ...taskWithTimestamps,
      id: docRef.id,
      createdAt: taskWithTimestamps.createdAt.toDate(),
      updatedAt: taskWithTimestamps.updatedAt.toDate()
    };
  }

  async updateTask(task: Task): Promise<Task> {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    const updatedTask = {
      ...task,
      updatedAt: Timestamp.now()
    };
    
    // Remove id field before updating Firestore
    const { id, ...taskWithoutId } = updatedTask;
    
    await updateDoc(taskDoc, this.prepareForFirestore(taskWithoutId));
    return {
      ...updatedTask,
      updatedAt: updatedTask.updatedAt.toDate()
    };
  }

  async deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    await deleteDoc(taskDoc);
  }

  private convertFirestoreDates(task: any): Task {
    return {
      ...task,
      dueDate: task.dueDate ? task.dueDate.toDate() : undefined,
      createdAt: task.createdAt.toDate(),
      updatedAt: task.updatedAt.toDate()
    };
  }

  private prepareForFirestore(task: any): any {
    const prepared: any = { ...task };
    
    // Convert Date objects to Firestore Timestamps
    if (task.dueDate instanceof Date) {
      prepared.dueDate = Timestamp.fromDate(task.dueDate);
    }
    if (task.createdAt instanceof Date) {
      prepared.createdAt = Timestamp.fromDate(task.createdAt);
    }
    if (task.updatedAt instanceof Date) {
      prepared.updatedAt = Timestamp.fromDate(task.updatedAt);
    }
    
    return prepared;
  }
}