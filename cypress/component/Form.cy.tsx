import { mount } from 'cypress/react';
import Form from '@/components/Form'; 

describe('Form Component', () => {
  beforeEach(() => {
    mount(<Form />);  // Mount the form component
  });
  it('should display the form with all fields', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="age"]').should('be.visible');
    cy.get('input[name="file"]').should('be.visible');
  });

  it('should show an error when the name is too short', () => {
    cy.get('input[name="name"]').type('Jo');
    cy.get('button[type="submit"]').click();
    cy.contains('Name must be at least 3 characters long').should('be.visible');
  });

  it('should show an error when the age is below 18', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="age"]').type('16');
    cy.get('button[type="submit"]').click();
    cy.contains('Age must be at least 18').should('be.visible');
  });

  it('should show an error when the age is above 100', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="age"]').type('105');
    cy.get('button[type="submit"]').click();
    cy.contains('Age must be less than 100').should('be.visible');
  });

  it('should show an error when no file is selected', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="age"]').type('25');
    cy.get('button[type="submit"]').click();
    cy.contains('File is required').should('be.visible');
  });

  it('should show an error when the selected file is not an image', () => {
    // Choose a non-image file (e.g., a txt file)
    const fileName = 'example.txt';
    cy.get('input[name="file"]').attachFile(fileName);
    cy.get('button[type="submit"]').click();
    cy.contains('Unsupported file type').should('be.visible');
  });

  it('should show an error when the selected image file is too large', () => {
    // Attach a file larger than 5MB
    const fileName = 'large-image.jpg';
    cy.get('input[name="file"]').attachFile({
      filePath: fileName,
      mimeType: 'image/jpeg',
    });
    cy.get('button[type="submit"]').click();
    cy.contains('File size is too large').should('be.visible');
  });

  it('should submit the form when all fields are valid', () => {
    // Mock the form submission to test the form behavior
    const validFile = 'valid-image.jpg'; // A valid image file

    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="age"]').type('30');
    cy.get('input[name="file"]').attachFile(validFile);

    cy.intercept('POST', '/form', {
      statusCode: 200,
      body: { message: 'Form submitted successfully' },
    }).as('submitForm');

    cy.get('button[type="submit"]').click();
    cy.wait('@submitForm');

    cy.contains('Form submitted successfully!').should('be.visible');
  });
});
