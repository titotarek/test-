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
</script>
