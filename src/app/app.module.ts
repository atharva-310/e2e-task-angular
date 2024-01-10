import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FieldsTableComponent } from './form-builder/fields-table/fields-table.component';
import { HomeComponent } from './home/home.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

@NgModule({
  declarations: [AppComponent, FormBuilderComponent, FieldsTableComponent, HomeComponent, FormPreviewComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
