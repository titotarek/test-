import { v4 as uuidV4 } from "uuid";

export default {
	getCustomers() {
		const storedCustomers = localStorage.getItem("customers");

		try {
			return JSON.parse(storedCustomers) || [];
		} catch (error) {
			console.error("Error parsing customers from localStorage:", error);
			return [];
		}
	},

	addCustomer(newCustomer) {
		const customers = this.getCustomers();
		newCustomer.id = uuidV4();
		customers.push(newCustomer);
		localStorage.setItem("customers", JSON.stringify(customers));
	},

	isDuplicateCustomer(newCustomer) {
		const customers = this.getCustomers();
		return customers.some(
			(customer) =>
				customer.Firstname === newCustomer.Firstname &&
				customer.Lastname === newCustomer.Lastname &&
				customer.DateOfBirth === newCustomer.DateOfBirth
		);
	},

	isDuplicateCustomerAttribute(attribute, value) {
		const customers = this.getCustomers();
		return customers.some((customer) => customer[attribute] === value);
	},

	isDuplicateEmail(email) {
		const customers = this.getCustomers();
		return customers.some((customer) => customer.Email === email);
	},
	deleteCustomer(firstName) {
		if (!firstName) {
			console.error("Invalid customer:", firstName);
			return;
		}

		const currentList = this.getCustomers();

		const newCustomerList = currentList.filter((item) => {
			return item.firstName !== firstName;
		});

		localStorage.setItem("customers", JSON.stringify(newCustomerList));
		return newCustomerList;
	},

	updateCustomer(updatedCustomer) {
		const customers = this.getCustomers();
		const index = customers.findIndex(
			(customer) => customer.id === updatedCustomer.id
		);

		if (index !== -1) {
			customers[index] = updatedCustomer;
			localStorage.setItem("customers", JSON.stringify(customers));
			return customers;
		}
		return null;
	},
};
