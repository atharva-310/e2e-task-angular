import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from './material-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    MaterialUIModule,
    ReactiveFormsModule,

    RouterModule,
  ],
})
export class SharedModule {}
