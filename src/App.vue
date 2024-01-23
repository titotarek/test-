<template>
	<div id="app">
		<CustomerForm
			:addCustomer="addCustomer"
			:editingCustomer="editingCustomer"
			:updateCustomer="updateCustomer"
		/>
		<CustomerList
			:customers="customers"
			:deleteCustomer="deleteCustomer"
			:editCustomer="editCustomer"
		/>
		<!-- Other components or content -->
	</div>
</template>

<script>
import CustomerForm from "./components/CustomerForm.vue";
import CustomerList from "./components/CustomerList.vue";
import CustomerService from "./services/CustomerService";

export default {
	components: {
		CustomerForm,
		CustomerList,
	},
	data() {
		return {
			customers: [],
			editingCustomer: null,
		};
	},
	mounted() {
		// Load customers on component mount
		this.loadCustomers();
	},
	methods: {
		loadCustomers() {
			// Use the service to get the customers
			this.customers = [...CustomerService.getCustomers()];
		},
		addCustomer(newCustomer) {
			CustomerService.addCustomer(newCustomer);
			this.customers.push(newCustomer);
		},
		editCustomer(customer) {
			this.editingCustomer = customer;
			window.scrollY = 0;
		},
		updateCustomer(customer) {
			const newCustomerList = CustomerService.updateCustomer(customer);
			if (newCustomerList) {
				this.customers = newCustomerList;
			}
			this.editingCustomer = null;
		},
		deleteCustomer(customer) {
			const newCustomerList = CustomerService.deleteCustomer(
				customer.firstName
			);
			if (newCustomerList) {
				this.customers = newCustomerList;
			}
		},
	},
};
</script>
