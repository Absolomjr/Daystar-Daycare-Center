import { useState, useCallback } from 'react';
import { validation } from '../utils/validation';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Handle input blur
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    if (validationRules[name]) {
      validateField(name, values[name]);
    }
  }, [values, validationRules]);

  // Validate a single field
  const validateField = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return true;

    let fieldError = '';
    
    if (rules.required && !validation.isNotEmpty(value)) {
      fieldError = 'This field is required';
    } else if (rules.email && !validation.isValidEmail(value)) {
      fieldError = 'Invalid email address';
    } else if (rules.phone && !validation.isValidPhone(value)) {
      fieldError = 'Invalid phone number';
    } else if (rules.min && value < rules.min) {
      fieldError = `Minimum value is ${rules.min}`;
    } else if (rules.max && value > rules.max) {
      fieldError = `Maximum value is ${rules.max}`;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError
    }));

    return !fieldError;
  }, [validationRules]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const isFieldValid = validateField(fieldName, values[fieldName]);
      if (!isFieldValid) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Set form values
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormValues,
    isValid: Object.keys(errors).length === 0
  };
}; 