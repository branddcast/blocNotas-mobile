import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowNotePage } from './show-note.page';

const routes: Routes = [
  {
    path: '',
    component: ShowNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowNotePageRoutingModule {}
