<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="firstNameFirstName">First Name:</label>
      <input type="text" id="firstNameFirstName" v-model="customer.FirstName" required />
    </div>
    <div>
      <label for="lastNameLastName">Last Name:</label>
      <input type="text" id="lastNameLastName" v-model="customer.LastName" required />
    </div>
    <div>
      <label for="dob">Date of Birth:</label>
      <input type="date" id="dob" v-model="customer.DateOfBirth" required />
    </div>
    <div>
      <label for="phone">Phone Number:</label>
      <input type="tel" id="phone" v-model="customer.PhoneNumber" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="customer.Email" required />
    </div>
    <div>
      <label for="bank">Bank Account Number:</label>
      <input type="text" id="bank" v-model="customer.BankAccountNumber" required />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      customer: {
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        PhoneNumber: "",
        Email: "",
        BankAccountNumber: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.validateForm()) {
        console.log("Form submitted!", this.customer);

        this.resetForm();
      } else {
        console.log("Form validation failed. Please fill in all required fields.");
      }
    },
    validateForm() {
      return (
        this.customer.FirstName &&
        this.customer.LastName &&
        this.customer.DateOfBirth &&
        this.customer.PhoneNumber &&
        this.customer.Email &&
        this.customer.BankAccountNumber
      );
    },
    resetForm() {
      this.customer = {
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        PhoneNumber: "",
        Email: "",
        BankAccountNumber: "",
      };
    },
  },
};
</script>

<style>
/* Your CSS styles */
</style>
