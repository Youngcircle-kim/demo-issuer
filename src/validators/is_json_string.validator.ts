import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isJsonString', async: false })
export class IsJsonString implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }

  defaultMessage(): string {
    return 'Invalid JSON string';
  }
}
