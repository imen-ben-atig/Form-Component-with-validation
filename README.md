
# Form Component with Validation

This is a Next.js project featuring a form component with client-side validation using TypeScript, Tailwind CSS, and Yup for schema validation. The form allows users to input their name, age, and upload a profile picture while ensuring all fields meet specified validation rules.

## Features

- **Form Fields**:
  - Text Input for the name.
  - Number Input for age.
  - File Upload for a profile picture.

- **Validation Rules**:
  - Name: At least 3 characters.
  - Age: Must be between 18 and 100.
  - File: Only `jpg` and `png` formats, with a maximum size of 5 MB.

- **User Feedback**:
  - Real-time error messages displayed below each field for invalid inputs.
  - Success message displayed upon successful form submission.

- **Styling**:
  - Tailwind CSS is used for responsive and visually appealing design.
  - Centered form with a purple background card on a gray page background.

- **Testing**:
  - Cypress is used for end-to-end testing of the form functionality.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Yup](https://github.com/jquense/yup) for validation
- [Cypress](https://www.cypress.io/) for testing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imen-ben-atig/Form-Component-with-validation.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Form-Component-with-validation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be accessible at `http://localhost:3000`.

## Usage

1. Navigate to the form component in your browser.
2. Fill in the form fields:
   - Enter a name (minimum 3 characters).
   - Enter an age (between 18 and 100).
   - Upload a valid image file (`jpg` or `png`).
3. Submit the form.
4. View validation errors (if any) or a success message upon valid submission.

## Testing

1. Start the application:
   ```bash
   npm run dev
   ```
2. Open Cypress:
   ```bash
   npx cypress open
   ```
3. Run the tests to ensure the form works as expected.

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
├── components/
│   ├── Form.tsx
├── styles/
│   ├── globals.css
├── tests/
│   ├── form.cy.ts
tailwind.config.js
next.config.js
```


## License

This project is licensed under the [MIT License](LICENSE).

