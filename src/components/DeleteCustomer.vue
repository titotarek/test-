<template>
	<div>
		<h2 class="text-2xl font-bold mb-4">Delete Customer</h2>
		<p>
			Are you sure you want to delete {{ customer.firstName }}
			{{ customer.lastName }}?
		</p>

		<button @click="confirmDelete">Yes, Delete</button>
		<button @click="cancelDelete">Cancel</button>
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
