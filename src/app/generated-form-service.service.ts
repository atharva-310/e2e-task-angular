import { Injectable } from '@angular/core';
import { FormFieldDataProcesses } from './form-builder/form-builder.component';

@Injectable({
  providedIn: 'root',
})
export class GeneratedFormServiceService {
  savedForms: [
    {
      id: string;
      data: FormFieldDataProcesses[];
      htmlElements: [HTMLElement[]?];
    }?
  ] = [];

  // private newFieldSubject = new Subject<{
  //   dataElements: HTMLElement[];
  // }>();

  // savedForms$ = this.newFieldSubject.asObservable();

  // addForm(data: HTMLElement[]) {
  //   this.newFieldSubject.next({
  //     dataElements: data,
  //   });
  // }

  getSavedForms() {
    return this.savedForms;
  }
  addForm(
    id: string,
    htmlElements: [HTMLElement[]?],
    data: FormFieldDataProcesses[]
  ) {
    this.savedForms.push({
      id,
      htmlElements,
      data,
    });

    return;
  }
  deleteForm(indexToDelete: number) {
    console.log(indexToDelete);
    console.log(this.savedForms);
    this.savedForms = this.savedForms.filter(
      (item, index) => index != indexToDelete
    ) as [
      {
        id: string;
        data: FormFieldDataProcesses[];
        htmlElements: [HTMLElement[]?];
      }?
    ];
  }
}
