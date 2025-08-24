import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  VALIDATION_MESSAGES,
} from './constants.js';

export const validateFile = file => {
  if (!file) {
    return { isValid: false, error: 'Please select a file' };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_FILE_TYPE,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.FILE_TOO_LARGE,
    };
  }

  return { isValid: true, error: null };
};

export const getFileIcon = fileName => {
  if (!fileName) return '📎';

  const extension = fileName.toLowerCase().split('.').pop();

  switch (extension) {
    case 'pdf':
      return '📄';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return '🖼️';
    case 'doc':
    case 'docx':
      return '📝';
    case 'txt':
      return '📋';
    default:
      return '📎';
  }
};

export const formatFileSize = bytes => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
