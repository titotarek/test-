<template>
	<div class="max-w-2xl mx-auto mt-8">
		<form class="bg-blue-100 p-8 rounded-md" @submit.prevent="submitForm">
			<div class="flex justify-between mb-4">
				<h2 class="md:text-lg text-md font-bold">Create new customer</h2>
				<button
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Save
				</button>
			</div>

			<div v-if="errorMessage" class="text-red-500 mb-4">
				{{ errorMessage }}
			</div>

			<div class="flex flex-wrap -mx-2 mb-6">
				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="firstName" class="block text-sm font-semibold text-gray-600 mb-1"
						>First name</label
					>
					<input
						v-model="newCustomer.firstName"
						id="firstName"
						placeholder="Enter first name"
						class="w-full py-2 px-3 border rounded"
						@input="clearValidationError('firstName')"
					/>
					<small class="text-gray-500">*Required</small>
					<div v-if="validationErrors.firstName" class="text-red-500 text-sm">
						{{ validationErrors.firstName }}
					</div>
				</div>

				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="lastName" class="block text-sm font-semibold text-gray-600 mb-1"
						>Last name</label
					>
					<input
						v-model="newCustomer.lastName"
						id="lastName"
						placeholder="Enter last name"
						class="w-full py-2 px-3 border rounded"
						@input="clearValidationError('lastName')"
					/>
					<small class="text-gray-500">*Required</small>
					<div v-if="validationErrors.lastName" class="text-red-500 text-sm">
						{{ validationErrors.lastName }}
					</div>
				</div>

				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="email" class="block text-sm font-semibold text-gray-600 mb-1"
						>Email address</label
					>
					<input
						v-model="newCustomer.email"
						id="email"
						placeholder="Enter email address"
						type="email"
						class="w-full py-2 px-3 border rounded"
						@input="clearValidationError('email')"
					/>
					<small class="text-gray-500">*Required</small>
					<div v-if="validationErrors.email" class="text-red-500 text-sm">
						{{ validationErrors.email }}
					</div>
				</div>

				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="phoneNumber" class="block text-sm font-semibold text-gray-600 mb-1"
						>Mobile number</label
					>
					<input
						v-model="newCustomer.phoneNumber"
						id="phoneNumber"
						placeholder="e.g., +3162782746"
						class="w-full py-2 px-3 border rounded"
					/>
					<small class="text-gray-500">*Required</small>
					<div v-if="validationErrors.phoneNumber" class="text-red-500 text-sm">
						{{ validationErrors.phoneNumber }}
					</div>
				</div>

				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="dob" class="block text-sm font-semibold text-gray-600 mb-1"
						>Date of Birth</label
					>
					<input
						v-model="newCustomer.dateOfBirth"
						id="dob"
						placeholder="Enter date of birth"
						type="date"
						class="w-full py-2 px-3 border rounded"
						@input="clearValidationError('dateOfBirth')"
					/>
					<small class="text-gray-500">*Required</small>
					<div v-if="validationErrors.dateOfBirth" class="text-red-500 text-sm">
						{{ validationErrors.dateOfBirth }}
					</div>
				</div>

				<div class="w-full md:w-1/2 px-2 mb-4">
					<label
						for="bankAccountNumber"
						class="block text-gray-600 mb-1 text-sm font-semibold"
						>Bank Account Number</label
					>
					<input
						v-model="newCustomer.bankAccountNumber"
						id="bankAccountNumber"
						placeholder="Enter or scan loyalty card"
						type="number"
						class="w-full py-2 px-3 border rounded"
					/>
					<small class="text-gray-500">*Required</small>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import CustomerService from "../services/CustomerService";

export default {
	props: ["updateCustomerList"],
	data() {
		return {
			newCustomer: {
				firstName: "",
				lastName: "",
				dateOfBirth: "",
				phoneNumber: "",
				email: "",
				bankAccountNumber: "",
			},
			validationErrors: {
				email: "",
				phoneNumber: "",
				firstName: "",
				lastName: "",
				dateOfBirth: "",
			},
			errorMessage: "", // General error message
			editedField: null,
		};
	},
	methods: {
		clearValidationError(fieldName) {
			this.validationErrors[fieldName] = "";
			this.errorMessage = "";
		},

		validateEmail() {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newCustomer.email);
		},

		validatePhoneNumber() {
			const phoneNumber = this.newCustomer.phoneNumber;

			if (!phoneNumber) {
				this.validationErrors.phoneNumber = "Phone number is required";
				return false;
			}

			// Remove dashes and spaces from the phone number
			const cleanedPhoneNumber = phoneNumber.replace(/[-\s]/g, "");
			console.log("Cleaned phone number:", cleanedPhoneNumber);

			// Extract country code from the input (assuming it's provided as the first part)
			const countryCodeMatch = cleanedPhoneNumber.match(/^\+(\d+)/);
			const countryCode = countryCodeMatch ? countryCodeMatch[1] : null;
			console.log("Extracted country code:", countryCode);

			if (!countryCode) {
				this.validationErrors.phoneNumber = "Please provide a country code";
				return false;
			}

			try {
				const phoneUtil = PhoneNumberUtil.getInstance();
				const parsedPhoneNumber = phoneUtil.parse(
					cleanedPhoneNumber,
					countryCode
				);

				const isValid =
					parsedPhoneNumber && phoneUtil.isValidNumber(parsedPhoneNumber);

				if (!isValid) {
					this.validationErrors.phoneNumber = "Invalid phone number";
					return false;
				}

				this.validationErrors.phoneNumber = "";
				return true;
			} catch (error) {
				console.error("Error validating phone number:", error);
				this.validationErrors.phoneNumber = "Error validating phone number";
				return false;
			}
		},

		validateField(fieldName) {
			const nameDict = {
				firstName: "First name",
				lastName: "Last name",
				email: "Email",
				dateOfBirth: "Date of birth",
				phoneNumber: "Phone number",
			};

			const customer = { ...this.newCustomer };
			delete customer.bankAccountNumber;
			const fieldValue = customer[fieldName];

			if (!fieldValue && fieldValue !== "bankAccountNumber") {
				this.validationErrors[fieldName] = `${nameDict[fieldName]} is required`;
				this.editedField = fieldName;
			} else {
				this.validationErrors[fieldName] = "";
			}

			if (
				fieldName !== "dateOfBirth" &&
				this.isDuplicateCustomerAttribute(
					fieldName,
					this.newCustomer[fieldName]
				)
			) {
				this.validationErrors[
					fieldName
				] = `${nameDict[fieldName]} has been taken.`;
			}

			if (fieldName === "phoneNumber" && fieldValue) {
				const result = this.validatePhoneNumber();
				return !!result;
			}

			return !!fieldValue;
		},

		isDuplicateCustomerAttribute(attribute, value) {
			return CustomerService.getCustomers().some(
				(existingCustomer) => existingCustomer[attribute] === value
			);
		},

		submitForm() {
			let allFieldsValid = true;
			Object.keys(this.validationErrors).forEach(this.validateField);

			if (Object.values(this.validationErrors).join("").length > 0) {
				allFieldsValid = false;
			}

			if (allFieldsValid) {
				// Clear error message before adding customer
				this.errorMessage = "";
				this.$props.updateCustomerList(this.newCustomer);

				// Manually reset the form
				this.newCustomer = {
					firstName: "",
					lastName: "",
					dateOfBirth: "",
					phoneNumber: "",
					email: "",
					bankAccountNumber: "",
				};

				// Clear error messages
				this.validationErrors = {
					email: "",
					phoneNumber: "",
					firstName: "",
					lastName: "",
					dateOfBirth: "",
				};

				// Reset edited field
				this.editedField = null;
			} else {
				// Display a general error message
				this.errorMessage =
					"Form contains errors. Please fix them before submitting.";
			}
		},
	},
	watch: {
		"newCustomer.firstName": function () {
			this.clearValidationError("firstName");
		},
		"newCustomer.lastName": function () {
			this.clearValidationError("lastName");
		},
		"newCustomer.dateOfBirth": function () {
			this.clearValidationError("dateOfBirth");
		},
		"newCustomer.phoneNumber": function () {
			this.clearValidationError("phoneNumber");
		},
		"newCustomer.email": function () {
			this.clearValidationError("email");
		},
	},
};
</script>
