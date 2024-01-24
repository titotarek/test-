import "jest-localstorage-mock";
import CustomerService from "./src/services/CustomerService";

beforeEach(() => {
	localStorage.clear();
});

describe("CustomerService", () => {
	test("should add a customer", () => {
		const newCustomer = {
			Firstname: "John",
			Lastname: "Doe",
			DateOfBirth: "1990-01-01",
			Email: "john.doe@example.com",
		};

		CustomerService.addCustomer(newCustomer);

		const customers = CustomerService.getCustomers();
		expect(customers).toHaveLength(1);
		expect(customers[0]).toEqual(newCustomer);
	});

	test("should check for duplicate customer", () => {
		const existingCustomer = {
			Firstname: "Jane",
			Lastname: "Doe",
			DateOfBirth: "1980-01-01",
			Email: "jane.doe@example.com",
		};

		const newCustomer = {
			Firstname: "Jane",
			Lastname: "Doe",
			DateOfBirth: "1980-01-01",
			Email: "jane.doe@example.com",
		};

		CustomerService.addCustomer(existingCustomer);

		const isDuplicate = CustomerService.isDuplicateCustomer(newCustomer);
		expect(isDuplicate).toBe(true);
	});

	test("should check for duplicate customer attribute", () => {
		const attribute = "Email";
		const existingEmail = "john.doe@example.com";

		// Clear localStorage before each test
		localStorage.clear();

		const newCustomer = {
			Firstname: "John",
			Lastname: "Doe",
			DateOfBirth: "1990-01-01",
			Email: existingEmail,
		};

		// Add the new customer
		CustomerService.addCustomer(newCustomer);

		const isDuplicate = CustomerService.isDuplicateCustomerAttribute(
			attribute,
			existingEmail
		);
		expect(isDuplicate).toBe(true);
	});
});
