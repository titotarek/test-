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
};
