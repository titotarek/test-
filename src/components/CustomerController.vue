<template>
	<div id="app">
		<CustomerForm :updateCustomerList="updateCustomerList" />
		<CustomerList :customers="customers" />
	</div>
</template>

<script>
import CustomerService from "../services/CustomerService";
import CustomerForm from "./CustomerForm.vue";
import CustomerList from "./CustomerList.vue";

export default {
	components: {
		CustomerForm,
		CustomerList,
	},
	data() {
		return {
			customers: [],
		};
	},
	mounted() {
		// Load customers on component mount
		this.loadCustomers();
	},
	methods: {
		loadCustomers() {
			// Use the service to get the customers
			this.customers = CustomerService.getCustomers();
		},
		updateCustomerList(newCustomer) {
			this.customers.push(newCustomer);
		},
	},
};
</script>

<style>
body {
	background-color: #f5f8fb;
	font-family: "Lato", sans-serif;
	font-family: "Montserrat", sans-serif;
}
</style>
