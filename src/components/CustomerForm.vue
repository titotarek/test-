<template>
  <div class="custom-form">
    <form class="form-container" @submit.prevent="submitForm">
      <div class="form-header">
        <h2>Create new customer</h2>
        <button class="btn-save" type="submit">Save</button>
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First name</label>
          <input
            class="form-control"
            v-model="newCustomer.FirstName"
            id="firstName"
            placeholder="Enter first name"
            @input="clearValidationError('FirstName')"
          />
          <small class="text-muted">*Required</small>
          <div v-if="validationErrors.FirstName" class="error-message">
            {{ validationErrors.FirstName }}
          </div>
        </div>

        <div class="form-group">
          <label for="lastName">Last name</label>
          <input
            class="form-control"
            v-model="newCustomer.LastName"
            id="lastName"
            placeholder="Enter last name"
            @input="clearValidationError('LastName')"
          />
          <small class="text-muted">*Required</small>
          <div v-if="validationErrors.LastName" class="error-message">
            {{ validationErrors.LastName }}
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            class="form-control"
            v-model="newCustomer.Email"
            id="email"
            placeholder="Enter email address"
            type="email"
            @input="clearValidationError('Email')"
          />
          <small class="text-muted">*Required</small>
          <div v-if="validationErrors.Email" class="error-message">
            {{ validationErrors.Email }}
          </div>
        </div>

        <div class="form-group">
          <label for="phoneNumber">Mobile number</label>
          <input
            class="form-control"
            v-model="newCustomer.PhoneNumber"
            id="phoneNumber"
            placeholder="e.g., +3162782746"
            type="tel"
            @blur="validatePhoneNumber"
          />
          <small class="text-muted">*Required</small>
          <div v-if="validationErrors.PhoneNumber" class="error-message">
            {{ validationErrors.PhoneNumber }}
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input
            class="form-control"
            v-model="newCustomer.DateOfBirth"
            id="dob"
            placeholder="Enter date of birth"
            type="date"
            @input="clearValidationError('DateOfBirth')"
          />
          <small class="text-muted">*Required</small>
          <div v-if="validationErrors.DateOfBirth" class="error-message">
            {{ validationErrors.DateOfBirth }}
          </div>
        </div>

        <div class="form-group">
          <label for="cardNumber">Card number</label>
          <input
            class="form-control"
            v-model="newCustomer.CardNumber"
            id="cardNumber"
            placeholder="Enter or scan loyalty card"
            type="number"
            min="1"
          />
          <small class="text-muted">*Required</small>
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
        // TODO: use camel case
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        PhoneNumber: "",
        Email: "",
        BankAccountNumber: "",
      },
      validationErrors: {
        Email: "",
        PhoneNumber: "",
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
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
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newCustomer.Email);
    },

    validatePhoneNumber() {
      const phoneNumber = this.newCustomer.PhoneNumber;

      if (!phoneNumber) {
        this.validationErrors.PhoneNumber = "Phone number is required";
        return false;
      }

      // Remove dashes and spaces from the phone number
      const cleanedPhoneNumber = phoneNumber.replace(/[-\s]/g, "");
      console.log("Cleaned phone number:", cleanedPhoneNumber);

      // Extract country code from the input (assuming it's provided as the first part)
      const countryCodeMatch = cleanedPhoneNumber.match(/^\+(\d+)/);
      const countryCode = countryCodeMatch ? countryCodeMatch[1] : null;
      console.log("Extracted country code:", countryCode);

      try {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const parsedPhoneNumber = phoneUtil.parse(
          cleanedPhoneNumber,
          countryCode
        );

        const isValid =
          parsedPhoneNumber && phoneUtil.isValidNumber(parsedPhoneNumber);

        if (!isValid) {
          this.validationErrors.PhoneNumber = "Invalid phone number";
          return false;
        }

        this.validationErrors.PhoneNumber = "";
        return true;
      } catch (error) {
        console.error("Error validating phone number:", error);
        this.validationErrors.PhoneNumber = "Error validating phone number";
        return false;
      }
    },

    validateField(fieldName) {
      const fieldValue = this.newCustomer[fieldName];

      if (!fieldValue) {
        this.validationErrors[fieldName] = `${fieldName} is required`;
        this.editedField = fieldName;
      } else {
        this.validationErrors[fieldName] = "";
      }

      if (
        fieldName !== "DateOfBirth" &&
        this.isDuplicateCustomerAttribute(
          fieldName,
          this.newCustomer[fieldName]
        )
      ) {
        this.validationErrors[fieldName] = `${fieldName} has been taken.`;
      }

      // Clear error message only for the currently edited field
      if (this.editedField !== fieldName) {
        this.errorMessage = "";
      }

      return !!fieldValue;
    },

    isDuplicateCustomerAttribute(attribute, value) {
      return CustomerService.getCustomers().some(
        (existingCustomer) => existingCustomer[attribute] === value
      );
    },

    submitForm() {
      this.clearValidationError();

      const fieldValidations = {
        Email: this.validateEmail,
        PhoneNumber: this.validatePhoneNumber,
        FirstName: () => this.validateField("FirstName"),
        LastName: () => this.validateField("LastName"),
        DateOfBirth: () => this.validateField("DateOfBirth"),
      };

      let allFieldsValid = true;
      // Perform dynamic validation for each field
      for (const [fieldName, validateFn] of Object.entries(fieldValidations)) {
        const isValid = validateFn();
        if (!isValid && this.editedField === fieldName) {
          allFieldsValid = false;
        }
      }

      // Check for duplicate attributes

      if (allFieldsValid) {
        // Clear error message before adding customer
        this.errorMessage = "";
        this.$props.updateCustomerList(this.newCustomer);

        // Manually reset the form
        this.newCustomer = {
          FirstName: "",
          LastName: "",
          DateOfBirth: "",
          PhoneNumber: "",
          Email: "",
          BankAccountNumber: "",
        };

        // Clear error messages
        this.validationErrors = {
          Email: "",
          PhoneNumber: "",
          FirstName: "",
          LastName: "",
          DateOfBirth: "",
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
    "newCustomer.FirstName": function () {
      this.clearValidationError("FirstName");
    },
    "newCustomer.LastName": function () {
      this.clearValidationError("LastName");
    },
    "newCustomer.DateOfBirth": function () {
      this.clearValidationError("DateOfBirth");
    },
    "newCustomer.PhoneNumber": function () {
      this.clearValidationError("PhoneNumber");
    },
    "newCustomer.Email": function () {
      this.clearValidationError("Email");
    },
  },
};
</script>

<style scoped>
.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.custom-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-container {
  margin-top: 40px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f5f8fb;
}

.form-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.btn-save {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-save:hover {
  background-color: #0056b3;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.form-group {
  flex: 0 0 48%;
  margin-right: 4%;
  position: relative;
  margin-bottom: 15px;
}

.form-group:nth-child(even) {
  margin-right: 0;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.text-muted {
  font-size: 0.8em;
  position: absolute;
  top: 0;
  right: 0;
  color: #ccc;
}

.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.error-message {
  color: #dc3545;
  font-size: 0.8em;
  padding-top: 5px;
}

.form-control-warning {
  border-color: #ffc107;
}

.form-control-feedback {
  font-size: 0.8em;
  color: #ffc107;
}
</style>
