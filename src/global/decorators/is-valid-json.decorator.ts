import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidJSON(requiredProperties: string[], validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidJSON',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [requiredProperties],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'object' || value === null) {
                        return false;
                    }

                    const [requiredProps] = args.constraints;
                    return requiredProps.every(prop => prop in value);
                },
                defaultMessage(args: ValidationArguments) {
                    const [requiredProps] = args.constraints;
                    return `${args.property} must be an object containing the required properties: ${requiredProps.join(', ')}`;
                },
            },
        });
    };
}
