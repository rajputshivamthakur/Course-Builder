export const ITEM_TYPES = {
  MODULE: 'module',
  RESOURCE: 'resource',
};

export const RESOURCE_TYPES = {
  LINK: 'link',
  FILE: 'file',
};

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_URL: 'Please enter a valid URL',
  INVALID_FILE_TYPE:
    'File type not supported. Please upload PDF, images, or documents.',
  FILE_TOO_LARGE: 'File size must be less than 10MB',
  MIN_LENGTH: 'Must be at least 2 characters long',
};
