import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customStringLength', async: false })
export class CustomStringLength implements ValidatorConstraintInterface {
  validate(text: string) {
    if (text === '') {
      return true;
    }
    return typeof text === 'string' && text.length === 10;
  }

  defaultMessage() {
    return 'El campo debe estar vacío o tener exactamente 10 caracteres';
  }
}
