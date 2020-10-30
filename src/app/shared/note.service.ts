import { Injectable } from '@angular/core';
import { Note } from './Note';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class NoteService {
  noteListRef: AngularFireList<any>;
  noteRef: AngularFireObject<any>;

  constructor(private database: AngularFireDatabase) { }

  createNote(note: Note) {
    this.noteListRef = this.database.list('/notes');
    return this.noteListRef.push({
      title: note.title,
      description: note.description,
      author: note.author,
      category: note.category,
      created_at: Date(),
      updated_at: Date()
    })
  }

  getNote(id: string) {
    this.noteRef = this.database.object('/notes/' + id);
    return this.noteRef;
  }

  getNoteList() {
    this.noteListRef = this.database.list('/notes');
    return this.noteListRef;
  }

  updateNote(id: string, note: Note) {
    return this.noteRef.update({
      title: note.title,
      description: note.description,
      author: note.author,
      category: note.category,
      updated_at: Date()
    })
  }

  deleteNote(id: string) {
    this.noteRef = this.database.object('/notes/' + id);
    return this.noteRef.remove();
  }

}
