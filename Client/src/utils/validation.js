// Phone number validation for Philippines
export const validatePhoneNumber = (phoneNumber) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  if (cleanNumber.startsWith('639') && cleanNumber.length === 12) {
    return true;
  }
  
  if (cleanNumber.startsWith('09') && cleanNumber.length === 11) {
    return true;
  }
  
  return false;
};

export const getPhoneErrorMessage = (phoneNumber) => {
  if (!phoneNumber) {
    return 'Phone number is required';
  }
  
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  if (cleanNumber.length === 0) {
    return 'Please enter a phone number';
  }
  
  if (cleanNumber.length < 11) {
    return 'Phone number is too short (minimum 11 digits)';
  }
  
  if (!cleanNumber.startsWith('09') && !cleanNumber.startsWith('639')) {
    return 'Phone number must start with 09 or +639';
  }
  
  if (cleanNumber.startsWith('09') && cleanNumber.length !== 11) {
    return 'Invalid format. Use: 09XX-XXX-XXXX (11 digits)';
  }
  
  if (cleanNumber.startsWith('639') && cleanNumber.length !== 12) {
    return 'Invalid format. Use: +639XX-XXX-XXXX (12 digits)';
  }
  
  return 'Invalid Philippine phone number format';
};