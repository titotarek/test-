<template>
	<div id="app">
		<customer-controller></customer-controller>
		<!-- Other components or content -->
	</div>
</template>

<script>
import CustomerController from "./components/CustomerController.vue";

export default {
	components: {
		CustomerController,
		// Other components
	},
};

// validatePhoneNumber(phoneNumber, countryCode) {
		// 	// Check if the phone number is empty
		// 	if (!phoneNumber) {
		// 		this.validationErrors.PhoneNumber = "Phone number is required";
		// 		return false;
		// 	}

		// 	try {
		// 		const parsedPhoneNumber = PhoneNumberUtil.getInstance().parse(
		// 			phoneNumber,
		// 			countryCode
		// 		);
		// 		console.log("Parsed phone number:", parsedPhoneNumber);

		// 		// Check if the parsed phone number is valid
		// 		const isValid =
		// 			parsedPhoneNumber &&
		// 			PhoneNumberUtil.getInstance().isValidNumber(parsedPhoneNumber);

		// 		if (!isValid) {
		// 			this.validationErrors.PhoneNumber = "Invalid phone number";
		// 			return false;
		// 		}

		// 		// Clear any previous validation error
		// 		this.validationErrors.PhoneNumber = "";

		// 		return true;
		// 	} catch (error) {
		// 		console.error("Error validating phone number:", error);
		// 		this.validationErrors.PhoneNumber = "Error validating phone number";
		// 		return false;
		// 	}
		// },

</script>

<style>
body {
	background-color: #f5f8fb;
	font-family: "Lato", sans-serif;
	font-family: "Montserrat", sans-serif;
}
</style>
