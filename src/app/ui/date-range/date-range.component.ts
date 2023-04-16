import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateRangeComponent {
  @Output() filterDateRange = new EventEmitter<{ startDate: Date, endDate: Date }>();
  @Output() clearDateRange = new EventEmitter<void>();

  dateRangeForm: FormGroup;
  startDateControl: FormControl;
  endDateControl: FormControl;
  showForm = false;
  selectedDateRange: string = '';

  constructor(
    private snackBar: MatSnackBar,
    fb: FormBuilder
  ) {
    this.startDateControl = new FormControl('', Validators.required);
    this.endDateControl = new FormControl('', Validators.required);

    this.dateRangeForm = fb.group({
      startDate: this.startDateControl,
      endDate: this.endDateControl
    }, { validators: this.dateRangeValidator } as AbstractControlOptions);

    this.dateRangeForm.valueChanges.pipe(
      (distinctUntilChanged())).
      subscribe(() => {
        if (this.dateRangeForm.dirty && !this.dateRangeForm.errors) {
          this.dateRangeForm.updateValueAndValidity({ emitEvent: false });
        }
      });
  }

  toggleDatePicker() {
    this.showForm = !this.showForm;
  }

  filter(): void {
    if (this.dateRangeForm.valid) {
      this.filterDateRange.emit(this.dateRangeForm.value);
      this.updateSelectedDateRange();
    } else {
      this.snackBar.open('Please select a valid date range', 'Close', {
        duration: 3000,
        verticalPosition: 'bottom'
      });
    }
  }

  clear(): void {
    this.dateRangeForm.reset();
    this.clearDateRange.emit();
    this.selectedDateRange = '';
  }

  startDateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.startDateControl.patchValue(event.value);
  }

  endDateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.endDateControl.patchValue(event.value);
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value as Date;
    const endDate = control.get('endDate')?.value as Date;

    if (startDate && endDate && startDate > endDate) {
      return { invalidDateRange: true };
    }

    return null;
  }

  updateSelectedDateRange(): void {
    const startDate = this.startDateControl.value;
    const endDate = this.endDateControl.value;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      this.selectedDateRange = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    } else {
      this.selectedDateRange = '';
    }
  }
}

