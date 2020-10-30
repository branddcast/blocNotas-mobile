import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowNotePageRoutingModule } from './show-note-routing.module';

import { ShowNotePage } from './show-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowNotePageRoutingModule
  ],
  declarations: [ShowNotePage]
})
export class ShowNotePageModule {}
