import { Component } from '@angular/core';
import { Note } from '../shared/Note';
import { NoteService } from './../shared/note.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Notes = [];

  constructor(
    private noteService: NoteService,
    public toastController: ToastController,
    public alertController: AlertController,
    private statusBar: StatusBar
  ) {}

  ngOnInit() {
    this.fetchNotes();
    let noteResult = this.noteService.getNoteList();
    noteResult.snapshotChanges().subscribe(res => {
      this.Notes = [];
      res.forEach(item => {
        let a = JSON.parse(JSON.stringify(item.payload));
          a['$key'] = item.key;
        this.Notes.push(a as Note);
      })
    })
  }

  async presentAlert(title: string, subtitle: string, mssg: string) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subtitle,
      message: mssg,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentToast(mssg: string) {
    const toast = await this.toastController.create({
      message: mssg,
      duration: 3000
    });
    toast.present();
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

  fetchNotes() {
    this.noteService.getNoteList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  async deleteNote(id: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      subHeader: '¿Está seguro de eliminar la nota?',
      message: 'Una vez eliminada no podrá recuperarse',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            this.presentAlert("¡Cuidado!", "", "Sé más precavido la próxima vez.");
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            const deleted = this.noteService.deleteNote(id);
            let mssg = '';
            if(deleted){
              mssg = "Nota eliminada exitosamente";
            }else{
              mssg = "No se pudo eliminar la nota";
            }
            
            this.presentToast(mssg);
          }
        }
      ]
    });

    await alert.present();
  }
}
