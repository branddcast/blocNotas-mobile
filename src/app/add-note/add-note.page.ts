import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NoteService } from './../shared/note.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  noteForm: FormGroup;

  constructor(
    private noteService: NoteService,
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      title: [''],
      description: [''],
      author: [''],
      category: ['']
    })
  }

  async presentToast(mssg: string) {
    const toast = await this.toastController.create({
      message: mssg,
      duration: 3000
    });
    toast.present();
  }

  formSubmit() {
    if (this.noteForm.valid == false) {
      this.presentToast("Debe llenar todos los campos");
      return false;
    } else {
      this.noteService.createNote(this.noteForm.value).then(res => {
        if(res){
          const mssg = "Nota agregada exitosamente";
          this.presentToast(mssg);
        }
        this.noteForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }
}
