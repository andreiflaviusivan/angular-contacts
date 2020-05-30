import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

export abstract class FormBaseComponent {

    private submitAttempt: boolean;
    private form: FormGroup;
    

    constructor(private builder: FormBuilder) {
        this.form = this.buildForm(builder);

        if (this.form == null) {
            throw 'Please override the buildForm method in inherited class!';
        }
    }


    protected abstract buildForm(builder: FormBuilder): FormGroup;

    public get baseForm() {
        return this.form;
    }

    public hasAnyError(control: AbstractControl) {
        return (!control.valid && control.dirty) || (!control.valid && this.submitAttempt);
    }

    public hasSpecificError(control: AbstractControl, error: string) {
        if (control.errors == null) {
            return false;
        }
        return (control.errors[error] && control.dirty) || (control.errors[error] && this.submitAttempt);
    }

    protected formSubmitted() {
        this.submitAttempt = true;
    }

    protected resetForm() {
        this.form.reset();
        this.submitAttempt = false;
    }
}
