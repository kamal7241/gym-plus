import Joi from 'joi';

// Function to map DTO schema to Swagger schema
export const mapDtoToSwaggerSchema = (dtoSchema: Joi.ObjectSchema): object => {
  const properties: any = {};
  const schemaDescription = dtoSchema.describe();

  if (schemaDescription && schemaDescription.children) {
    for (const child of schemaDescription.children) {
      properties[child.key] = {
        type: getTypeFromJoiType(child.schema),
        // Add additional properties such as description, enum, etc.
      };
    }
  }

  return {
    type: 'object',
    properties,
  };
};

// Helper function to get Swagger type from Joi type
const getTypeFromJoiType = (joiSchema: Joi.Schema): string => {
  switch (joiSchema.type) {
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'date':
      return 'string';
    // Handle other types as needed
    default:
      return 'string';
  }
};
