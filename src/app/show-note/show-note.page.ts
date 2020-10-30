import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NoteService } from './../shared/note.service';
import { Note } from '../shared/Note';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.page.html',
  styleUrls: ['./show-note.page.scss'],
})
export class ShowNotePage implements OnInit {
  Note: any = [];
  id: string;

  constructor(
    private noteService: NoteService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    let noteResult = this.noteService.getNote(this.id);
    noteResult.snapshotChanges().subscribe(res => {
      this.Note = [];
        let a = JSON.parse(JSON.stringify(res.payload));
          a['$key'] = res.key;
        this.Note.push(a as Note);
    })
  }

  public category(title: string){
    switch(title){
      case 'Trabajo': 
        return "briefcase";
      case 'Viajes':
        return "airplane";
      case 'Comidas':
        return "fast-food";
      default: 
        return "chatbubble-ellipses";
    }
  }

  public categoryBG(title: string){
    switch(title){
      case 'Trabajo': 
        return "tertiary";
      case 'Viajes':
        return "success";
      case 'Comidas':
        return "warning";
      default: 
        return "medium";
    }
  }

  public dateFormat(date_: string){
    const MESES = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const date = new Date(date_);
    return MESES[date.getMonth()]+". "+date.getDate()+", "+date.getFullYear();
  }

}
