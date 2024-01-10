import { Component, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneratedFormServiceService } from '../generated-form-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css',
})
export class FormBuilderComponent {
  constructor(private _snackBar: MatSnackBar) {}
  formSaveService: GeneratedFormServiceService = inject(
    GeneratedFormServiceService
  );

  FieldTypeOptions = [
    {
      id: 0,
      name: 'Main Heading',
      typeHtml: 'h1',
      callback: (data: FormFieldDataProcesses) =>
        this.addTypography(data, 'h1'),
    },
    {
      id: 1,
      name: 'Sub Heading',
      typeHtml: 'h3',
      callback: (data: FormFieldDataProcesses) =>
        this.addTypography(data, 'h3'),
    },
    {
      id: 2,
      name: 'Paragraph',
      typeHtml: 'p',
      callback: (data: FormFieldDataProcesses) => this.addTypography(data, 'p'),
    },
    {
      id: 3,
      name: 'Input - Text',
      typeHtml: 'text',
      callback: (data: FormFieldDataProcesses) =>
        this.addInputWithType(data, 'text'),
    },
    {
      id: 4,
      name: 'Input - Email',
      typeHtml: 'email',
      callback: (data: FormFieldDataProcesses) =>
        this.addInputWithType(data, 'email'),
    },
    {
      id: 5,
      name: 'Input - Password',
      typeHtml: 'password',
      callback: (data: FormFieldDataProcesses) =>
        this.addInputWithType(data, 'password'),
    },
    {
      id: 6,
      name: 'Input - Number',
      typeHtml: 'number',
      callback: (data: FormFieldDataProcesses) =>
        this.addInputWithType(data, 'number'),
    },
    {
      id: 7,
      name: 'Input - Date',
      typeHtml: 'date',
      callback: (data: FormFieldDataProcesses) =>
        this.addInputWithType(data, 'date'),
    },
    {
      id: 8,
      name: 'Textarea - Text',
      typeHtml: 'textarea',
      callback: (data: FormFieldDataProcesses) => this.addTextArea(data),
    },
    {
      id: 9,
      name: 'Select',
      typeHtml: 'select',
      callback: (data: FormFieldDataProcesses) => this.addSelectData(data),
    },
    {
      id: 10,
      name: 'Button',
      typeHtml: 'button',
      callback: (data: FormFieldDataProcesses) => this.addButton(data),
    },
  ];

  showRequiredField = false;
  showAddOptionsForm = false;
  showFieldTable = false;

  addFieldForm = new FormGroup({
    fieldValue: new FormControl('', [Validators.required]),
    isRequired: new FormControl('', [Validators.required]),
    fieldType: new FormControl('', [Validators.required]),
  });
  addOptionForm = new FormControl('');
  addedOptionsList: string[] = [];

  handleFormSave() {
    this.formSaveService.addForm(
      `#${this.generateString(6)}`,
      this.generatedFormElementsArray,
      this.formFieldsList
    );
    this._snackBar.open('Form Saved , Navigate to Form Preview', undefined, {
      duration: 1500,
    });
  }
  handleAddOption() {
    if (this.addOptionForm.value?.trim())
      this.addedOptionsList.push(this.addOptionForm.value);
    else {
      this.addOptionForm.markAsTouched;
      this._snackBar.open('Fill all required Fields', undefined, {
        duration: 1500,
      });
      this.addOptionForm.setErrors({});
      return;
    }
    this.addOptionForm.reset();
    this._snackBar.open('Option Added Successfully', undefined, {
      duration: 1500,
    });
  }

  handleDeleteOption(indexToDelete: number) {
    this.addedOptionsList = this.addedOptionsList.filter(
      (i, index) => indexToDelete
    );
    this._snackBar.open('Option Deleted !!', undefined, {
      duration: 1500,
    });
  }

  handleFieldTypeChange(event: EventEmitter<any>) {
    if (Number(event) >= 3 && Number(event) != 10) {
      this.showRequiredField = true;
    } else {
      this.showRequiredField = false;
    }
    if (Number(event) === 9) {
      this.showAddOptionsForm = true;
    } else {
      this.showAddOptionsForm = false;
    }

    this.addedOptionsList = [];
  }
  handleCreateField() {
    if (
      (!this.addFieldForm.value.fieldType &&
        this.addFieldForm.value.fieldType != '0') ||
      this.addFieldForm.value.fieldValue?.trim() === ''
    ) {
      this.addFieldForm.markAllAsTouched();
      this._snackBar.open('Failed, fill all required fields', undefined, {
        duration: 1500,
      });
      return;
    }

    if (
      this.addFieldForm.value.fieldType == '9' &&
      this.addedOptionsList.length == 0
    ) {
      this.addFieldForm.markAllAsTouched();
      this.addOptionForm.markAllAsTouched();
      this._snackBar.open('Failed,Add Options Select Option', undefined, {
        duration: 1500,
      });
      return;
    }

    const formFieldData: FormFieldDataProcesses = {
      fieldValue: this.addFieldForm.value.fieldValue as string,
      isRequired: this.addFieldForm.value.isRequired ? true : false,
      fieldTypeId: Number(this.addFieldForm.value.fieldType),
      typeHtml: this.FieldTypeOptions.find(
        (item) => Number(item.id) === Number(this.addFieldForm.value.fieldType)
      )?.typeHtml as string,
      fieldType: this.FieldTypeOptions.find(
        (item) => Number(item.id) === Number(this.addFieldForm.value.fieldType)
      )?.name as string,
      optionsString: 'N/A',
      optionsArray: this.addedOptionsList,
    };

    if (Number(this.addFieldForm.value.fieldType) === 9) {
      formFieldData.optionsString = this.addedOptionsList.join(', ');
    }

    this.generateRawHTML(formFieldData);
    this.formFieldsList = [...this.formFieldsList, formFieldData];
    this.addedOptionsList = [];
    this._snackBar.open('New Field Added To the Form', undefined, {
      duration: 1500,
    });

    this.addFieldForm.reset();
  }

  handleDeleteField(indexToDelete: number) {
    console.log(indexToDelete);
    console.log(this.generatedFormElementsArray, this.formFieldsList);
    this.generatedFormElementsArray = this.generatedFormElementsArray.filter(
      (item, index) => index != indexToDelete
    ) as [(HTMLElement[] | undefined)?];
    this.formFieldsList = this.formFieldsList.filter(
      (item, index) => index != indexToDelete
    );
  }

  handleCopyFunction() {
    navigator.clipboard.writeText(this.generatedFormElement.innerHTML).then(
      () => {
        console.log('Content copied to clipboard');
        this._snackBar.open('Content copied to clipboard', undefined, {
          duration: 1500,
        });
        // window.alert('Raw HTML Copied');
      },
      () => {
        console.error('Failed to copy');
        window.alert('Failed to copy');
      }
    );
  }

  // FormField
  formFieldsList: FormFieldDataProcesses[] = [];

  // Generation of HTML code

  rawCodeForm: FormControl = new FormControl('');
  generatedFormElement: HTMLElement = document.createElement('form');
  generatedFormElementsArray: [HTMLElement[]?] = [];

  generateRawHTML(data: FormFieldDataProcesses) {
    const generatorCallback = this.FieldTypeOptions.find(
      (item) => item.id == data.fieldTypeId
    )?.callback;
    if (generatorCallback) {
      generatorCallback(data);
    }
    const breakElement = document.createElement('br');
    this.generatedFormElement.appendChild(breakElement);

    this.rawCodeForm.setValue(this.generatedFormElement.innerHTML);

    // console.log(this.generatedFormElementsArray[0][0]);
  }

  addButton(data: FormFieldDataProcesses) {
    const newElement = document.createElement('button');
    newElement.innerHTML = data.fieldValue;

    this.generatedFormElement.appendChild(newElement);
    this.generatedFormElementsArray.push([newElement]);
  }
  addTypography(data: FormFieldDataProcesses, tagname: string) {
    const newElement = document.createElement(tagname);
    newElement.innerHTML = data.fieldValue;

    this.generatedFormElement.appendChild(newElement);
    this.generatedFormElementsArray.push([newElement]);
  }

  addTextArea(data: FormFieldDataProcesses) {
    const textareaElement = document.createElement('textarea');
    const labelElement = document.createElement('label');

    const labelValue = data.fieldValue;
    const name = this.removeSpace(labelValue);

    textareaElement.id = this.generateString(5);
    textareaElement.name = name;

    if (data.isRequired) {
      textareaElement.setAttribute('required', '');
    }

    labelElement.innerHTML = labelValue;
    labelElement.htmlFor = name;

    this.generatedFormElement.appendChild(labelElement);
    this.generatedFormElement.appendChild(textareaElement);
    this.generatedFormElementsArray.push([labelElement, textareaElement]);
  }

  addSelectData(data: FormFieldDataProcesses) {
    const selectElement = document.createElement('select');
    const labelElement = document.createElement('label');

    const labelValue = data.fieldValue;
    const name = this.removeSpace(labelValue);

    selectElement.id = this.generateString(5);
    selectElement.name = name;

    if (data.isRequired) {
      selectElement.setAttribute('required', '');
    }

    labelElement.innerHTML = labelValue;
    labelElement.htmlFor = name;

    this.addedOptionsList.forEach((item) => {
      const optionElement = document.createElement('option');
      optionElement.innerHTML = item;
      optionElement.value = this.removeSpace(item);
      selectElement.appendChild(optionElement);
    });
    this.generatedFormElement.appendChild(labelElement);
    this.generatedFormElement.appendChild(selectElement);
    this.generatedFormElementsArray.push([labelElement, selectElement]);
  }

  addInputWithType(data: FormFieldDataProcesses, inputType: string) {
    const inputElement = document.createElement('input');
    const labelElement = document.createElement('label');

    const labelValue = data.fieldValue;
    const name = this.removeSpace(labelValue);

    inputElement.type = inputType;
    inputElement.id = this.generateString(5);
    inputElement.name = name;

    if (data.isRequired) {
      inputElement.setAttribute('required', '');
    }

    labelElement.innerHTML = labelValue;
    labelElement.htmlFor = name;

    this.generatedFormElement.appendChild(labelElement);
    this.generatedFormElement.appendChild(inputElement);
    this.generatedFormElementsArray.push([labelElement, inputElement]);
  }

  // Utility functions

  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = result.trim();
    return result;
  }
  removeSpace(text: string) {
    return text.split(' ').join('');
  }
}

export interface FormField {
  fieldValue: string;
  fieldType: string | number;
  isRequired: boolean;
  options?: string[];
}

export interface FormFieldDataProcesses {
  fieldValue: string;
  fieldTypeId: string | number;
  fieldType: string | number;
  typeHtml: string;
  isRequired: boolean;
  optionsString: string;
  optionsArray: string[];
}
