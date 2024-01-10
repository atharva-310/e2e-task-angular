import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GeneratedFormServiceService } from './../generated-form-service.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.css',
})
export class FormPreviewComponent {
  constructor(private sanitizer: DomSanitizer) {}
  generatedFormElementsArray: [HTMLElement[]?] = [];
  generatedFormService: GeneratedFormServiceService = inject(
    GeneratedFormServiceService
  );
  savedForms = this.generatedFormService.getSavedForms();
  // code = ` <button
  //             mat-flat-button
  //             color="accent"
  //             (click)="handleFormShow($index)"
  //           >
  //             Show
  //           </button>`;

  // sanitizedHTML: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.code);

  formIndexToShow: number | undefined = undefined;
  showForm = false;
  refetch() {
    this.savedForms = this.generatedFormService.getSavedForms();
  }
  handleFormShow(index: number) {
    console.log(this.savedForms);
    this.formIndexToShow = index;
    this.showForm = true;
    console.log(this.formIndexToShow);
  }
  handleFormDelete(index: number) {
    this.generatedFormService.deleteForm(index);
    this.refetch();
    this.formIndexToShow = undefined;
    this.showForm = false;
  }

  createFormUI(index: number) {}
}
