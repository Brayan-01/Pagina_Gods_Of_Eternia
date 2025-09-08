import { describe, it, expect } from 'vitest';
import { validatePassword } from './validation';

describe('validatePassword', () => {
  it('should return an empty string for a valid password', () => {
    expect(validatePassword('ValidPass1!')).toBe('');
  });

  it('should return an error for passwords shorter than 8 characters', () => {
    expect(validatePassword('Short1!')).toBe('La contraseña debe tener al menos 8 caracteres');
  });

  it('should return an error for passwords without an uppercase letter', () => {
    expect(validatePassword('invalidpass1!')).toBe('La contraseña debe contener al menos una letra mayúscula');
  });

  it('should return an error for passwords without a lowercase letter', () => {
    expect(validatePassword('INVALIDPASS1!')).toBe('La contraseña debe contener al menos una letra minúscula');
  });

  it('should return an error for passwords without a number', () => {
    expect(validatePassword('InvalidPass!')).toBe('La contraseña debe contener al menos un número');
  });

  it('should return an error for passwords without a special character', () => {
    expect(validatePassword('InvalidPass1')).toBe('La contraseña debe contener al menos un carácter especial');
  });

  it('should return an error for common passwords', () => {
    expect(validatePassword('password')).toBe('Esta contraseña es muy común y fácil de adivinar');
    expect(validatePassword('123456')).toBe('Esta contraseña es muy común y fácil de adivinar');
  });
});
