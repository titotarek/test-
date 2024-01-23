<template>
	<div>
		<h2 class="text-2xl font-bold mb-4">Edit Customer</h2>
		<button @click="saveChanges">Save Changes</button>
		<button @click="cancelEdit">Cancel</button>
	</div>
</template>

<script>
export default {
	props: ["customer"],
	data() {
		return {
			editedCustomer: { ...this.customer },
		};
	},
	methods: {
		saveChanges() {
			this.$emit("update-customer", this.editedCustomer);
		},
		cancelEdit() {
			this.$emit("cancel-edit");
		},
	},
};
</script>
