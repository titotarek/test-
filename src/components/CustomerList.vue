<!-- <template>
	<div class="max-w-2xl mx-auto mt-10 border p-4 rounded">
		<h2 class="text-3xl font-bold mb-6">Customer List</h2>
		<div
			v-if="customers.length > 0"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
		>
			<div
				v-for="(customer, index) in customers"
				:key="index"
				class="customer-card bg-white border border-gray-300 p-4 rounded"
			>
				<div class="customer-info">
					<div class="name text-lg font-bold mb-2">
						<i class="fas fa-user text-gray-500"></i> {{ customer.firstName }}
						{{ customer.lastName }}
					</div>
					<div class="email text-gray-600">
						<i class="fas fa-envelope icon"></i>{{ customer.email }}
					</div>
					<div class="phone text-gray-600">
						<i class="fas fa-phone icon"></i>{{ customer.phoneNumber }}
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
export default {
	props: ["customers"],
};
</script> -->
<template>
	<div class="max-w-2xl mx-auto mt-10 border p-4 rounded">
		<h2 class="text-3xl font-bold mb-6">Customer List</h2>

		<div
			v-if="customers.length > 0"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
		>
			<div
				v-for="(customer, index) in customers"
				:key="index"
				class="customer-card bg-white border border-gray-300 p-4 rounded transition-transform hover:scale-105"
			>
				<div class="flex flex-col">
					<div class="text-lg font-bold mb-2">
						<i class="fas fa-user text-gray-500"></i> {{ customer.firstName }}
						{{ customer.lastName }}
					</div>
					<div class="text-gray-600">
						<i class="fas fa-envelope icon"></i>{{ customer.email }}
					</div>
					<div class="text-gray-600">
						<i class="fas fa-phone icon"></i>{{ customer.phoneNumber }}
					</div>

					<div class="mt-4 space-x-2">
						<button
							@click="editCustomer(customer)"
							class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
						>
							Edit
						</button>
						<button
							@click="confirmDeleteCustomer(customer)"
							class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>

		<div v-else>
			<p>No customers available.</p>
		</div>

		<!-- <EditCustomer
			v-if="editingCustomer"
			:customer="editingCustomer"
			@update-customer="updateCustomer"
			@cancel-edit="cancelEdit"
		/> -->

		<!-- DeleteCustomer component -->
		<DeleteCustomer
			v-if="deletingCustomer"
			:customer="deletingCustomer"
			@confirm-delete="confirmDelete"
			@cancel-delete="cancelDelete"
		/>
	</div>
</template>
<script>
import DeleteCustomer from "@/components/DeleteCustomer.vue";
// import EditCustomer from "@/components/EditCustomer.vue";

export default {
	components: {
		// EditCustomer,
		DeleteCustomer,
	},
	props: ["customers", "deleteCustomer", "editCustomer"],
	data() {
		return {
			deletingCustomer: null,
		};
	},
	methods: {
		// editCustomer(customer) {
		// 	this.$props.editingCustomer = customer;
		// },
		// cancelEdit() {
		// 	this.editingCustomer = null;
		// },
		confirmDeleteCustomer(customer) {
			this.deletingCustomer = customer;
		},

		confirmDelete() {
			console.log(this.deletingCustomer, "deleting");
			this.$props.deleteCustomer(this.deletingCustomer);
		},

		cancelDelete() {
			this.deletingCustomer = null;
		},
	},
};
</script>
