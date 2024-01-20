<template>
	<div class="customer-list-container">
		<h2>Customer List</h2>
		<div v-if="localCustomers.length > 0" class="customer-cards-container">
			<div
				v-for="(customer, index) in localCustomers"
				:key="index"
				class="customer-card"
			>
				<div class="customer-info">
					<div class="name">
						<i class="fas fa-user icon"></i>{{ customer.FirstName }}
						{{ customer.LastName }}
					</div>
					<div class="email">
						<i class="fas fa-envelope icon"></i>{{ customer.Email }}
					</div>
					<div class="phone">
						<i class="fas fa-phone icon"></i>{{ customer.PhoneNumber }}
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<p>No customers available.</p>
		</div>
	</div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import CustomerService from "../services/CustomerService";

export default {
	props: ["customers"],
	data() {
		return {
			localCustomers: [], // Use this for local storage
		};
	},
	methods: {
		addCustomer(newCustomer) {
			// Use the service to add a new customer
			CustomerService.addCustomer(newCustomer);

			// Optionally, you can clear the form fields
			// (Note: Make sure to define this.newCustomer in your component's data)
			this.newCustomer = {
				Firstname: "",
				Lastname: "",
				DateOfBirth: "",
				PhoneNumber: "0627862746",
				Email: "",
				BankAccountNumber: "",
			};

			this.errorMessage = "";
			this.loadCustomers();
		},
		loadCustomers() {
			// Use the service to get the customers
			this.localCustomers = CustomerService.getCustomers();
			console.log("Customers loaded:", this.localCustomers);
		},
	},
	mounted() {
		// Load customers on component mount
		this.loadCustomers();
	},
};
</script>

<style scoped>
.customer-list-container {
	max-width: 600px;
	margin: 20px auto;
	background-color: white;
	border: 1px solid rgb(232, 230, 230);
	padding: 15px;
}

.customer-cards-container {
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
}

.customer-card {
	flex: 0 0 calc(50% - 10px); /* Adjust the width to fit two cards with some gap */
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 15px;
	box-sizing: border-box;
	margin-bottom: 15px;
}

.customer-info {
	font-size: 16px;
}

.name {
	font-weight: bold;
	margin-bottom: 8px;
}

.email,
.phone {
	color: #666;
	padding-bottom: 5px;
}
.icon {
	color: #888;
	margin-right: 8px;
}
</style>
