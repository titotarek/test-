<template>
	<div class="p-4">
		<h2 class="text-2xl font-bold mb-4">Delete Customer</h2>
		<p>
			Are you sure you want to delete {{ customer.firstName }}
			{{ customer.lastName }}?
		</p>

		<button
			@click="confirmDelete"
			class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4 mt-4"
		>
			Yes, Delete
		</button>

		<button
			@click="cancelDelete"
			class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-4"
		>
			Cancel
		</button>
	</div>
</template>

<script>
export default {
	props: ["customer"],
	methods: {
		confirmDelete() {
			this.$emit("confirmDelete");
		},
		cancelDelete() {
			this.$emit("cancel-delete");
		},
	},
};
</script>
