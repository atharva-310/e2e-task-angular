import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormField, FormFieldDataProcesses } from '../form-builder.component';

@Component({
  selector: 'app-fields-table',
  templateUrl: './fields-table.component.html',
  styleUrl: './fields-table.component.css',
})
export class FieldsTableComponent implements OnInit, OnChanges {
  @Output() tableDeleteEvent = new EventEmitter<number>();
  @Input({ required: true }) FormFieldData!: FormFieldDataProcesses[];
  dataSource!: FormFieldDataProcesses[];

  ngOnInit() {
    this.dataSource = this.FormFieldData;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.FormFieldData;
  }
  displayedColumns: string[] = [
    'fieldValue',
    'fieldType',
    'isRequired',
    'optionsString',
    'delete',
  ];
  handleRowDelete(indexToDelete: number) {
    console.log(indexToDelete);
    this.tableDeleteEvent.emit(indexToDelete);
  }
}
