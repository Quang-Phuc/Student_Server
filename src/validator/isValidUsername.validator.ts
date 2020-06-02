import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsValidUsernameValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    return (
      typeof value === 'string' &&
      /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/.test(value)
    );
  }
  defaultMessage?(): string {
    return '$value in invalid username, username only constaint 0-9 a-z A-Z - _';
  }
}

export function IsValidUsername(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidUsernameValidator,
    });
  };
}
