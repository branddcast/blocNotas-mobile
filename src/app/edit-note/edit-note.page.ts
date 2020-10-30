import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NoteService } from './../shared/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
  updateNoteForm: FormGroup;
  id: any;

  constructor(
    private noteService: NoteService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.noteService.getNote(this.id).valueChanges().subscribe(res => {
      this.updateNoteForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateNoteForm = this.fb.group({
      title: [''],
      description: [''],
      author: [''],
      category: [''],
      created_at: ['']
    })
  }

  updateForm() {
    this.noteService.updateNote(this.id, this.updateNoteForm.value)
      .then(() => {
        this.router.navigate(['/show_note/'+this.id]);
      })
      .catch(error => console.log(error));
  }

}
