# CRUD Code Test 

Please read each note very carefully!
Feel free to add/change the project structure to a clean architecture to your view.

Create a simple CRUD application with VueJ that implements the below model:
```
Customer {
	Firstname
	Lastname
	DateOfBirth
	PhoneNumber
	Email
	BankAccountNumber
}
```
## Practices and patterns (Must):

- TDD [Wiki](https://en.wikipedia.org/wiki/Test-driven_development)
- [DDD](https://en.wikipedia.org/wiki/Domain-driven_design)
- [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)
- Clean git commits that shows your work progress.

### Validations (Must)

- During Create; validate the phone number to be a valid *mobile* number only (You are required to use [Google LibPhoneNumber](https://github.com/google/libphonenumber) to validate mobile number).

- A Valid email and a valid account number must be checked before submitting the form.

- Create a Browser local storage to store the list of customers.

- Customers must be unique in the database: By `Firstname`, `Lastname` and `DateOfBirth`.

- Email must be unique in the local storage or memory array

### Nice to do

- [Microfrontend](https://en.wikipedia.org/wiki/Microfrontend)

### Delivery (Must)
- Please clone this repository in a new GitHub repository in private mode and share with ID: `mason-chase` in private mode on github.com, make sure you do not erase my commits and then create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (code review).



# Project Title

## Overview

Briefly describe the purpose and goals of your project.

## Technologies Used

List the technologies and frameworks used in your project.

- Vue.js
- Tailwind CSS
- Google-libphonenumber
- Font Awesome
- Jest

## Local Development

Include instructions on how to set up and run the project locally.

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run serve`

## Testing

Briefly describe the testing approach and how to run tests.

- Unit tests are written using Jest.
- Run tests: `npm test`

## Responsive Design

Detail how the project is designed to be responsive, including the use of media queries and improvements for different screen sizes.

## Clean Git Commits

Follow a clean Git commit strategy to track your work progress.

1. **Atomic Commits:** Make small, atomic commits that represent a single logical change.
2. **Descriptive Commit Messages:** Write clear and descriptive commit messages.
3. **Use Branches:** Work on feature branches and merge into the main branch when ready.
4. **Follow Conventional Commits:** Optionally, follow a conventional commit format.

## Recent Updates

### [2024-01-12] - Initial Tests

- Time spent: 2 hours
- Implemented initial unit tests covering the core functionalities of the project.

### [2024-01-17] - Design Iteration and Form Logic

- Time spent: 3 hours
- Refined overall design, focusing on improving the user interface.
- Implemented additional logic for the form, including validation and enhanced user feedback.

### [2024-01-20] - Form Validation and Additional Features

- Time spent: 2 hours
- Completed form validation with additional features:
  - Added validation for all form fields.
  - Improved error messaging.
  - Implemented logic for preventing duplicate customer attributes.
  - Refactored existing code for modularity and maintainability.
