import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable()
export class FormToolsService {
  constructor() { }

  public getErrors(form: FormGroup, controlName: string): any {
    const control = this.getControl(form, controlName);
    return control.errors;
  }

  public getErrorsChild(form: FormGroup, controlName: string, controlNameChild: string) {
    const control = this.getControlChild(form, controlName, controlNameChild);
    return control.errors;
  }

  public mustShowError(form: FormGroup, controlName: string) {
    const control = this.getControl(form, controlName);
    if (control.invalid && (control.dirty || control.touched)) {
      return true;
    } else {
      return false;
    }
  }

  public mustShowErrorChild(form: FormGroup, controlName: string, controlNameChild: string) {
    const control = this.getControlChild(form, controlName, controlNameChild);
    if (control.invalid && (control.dirty || control.touched)) {
      return true;
    } else {
      return false;
    }
  }

  public hasError(form: FormGroup, controlName: string, errorCode: string): any {
    const control = this.getControl(form, controlName);
    const error = control.getError(errorCode);
    if (error) {
      return true;
    } else {
      return false;
    }
  }

  public hasErrorChild(form: FormGroup, controlName: string, controlNameChild: string, errorCode: string): any {
    const control = this.getControlChild(form, controlName,controlNameChild);
    const error = control.getError(errorCode);
    if (error) {
      return true;
    } else {
      return false;
    }
  }

  private getControl = (form: FormGroup, controlName: string): AbstractControl => form.controls[controlName];
  private getControlChild = (form: FormGroup, controlName: string, controlNameChild: string): AbstractControl => form.controls[controlName]['controls'][controlNameChild];
}
