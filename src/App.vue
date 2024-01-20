<template>
  <div id="app">
    <CustomerForm :updateCustomerList="updateCustomerList" />
    <CustomerList :customers="customers" />
    <!-- Other components or content -->
  </div>
</template>

<script>
import CustomerService from "./services/CustomerService";
import CustomerForm from "./components/CustomerForm.vue";
import CustomerList from "./components/CustomerList.vue";

export default {
  components: {
    CustomerForm,
    CustomerList,
  },
  data() {
    return {
      customers: [],
    };
  },
  mounted() {
    // Load customers on component mount
    this.loadCustomers();
  },
  methods: {
    loadCustomers() {
      // Use the service to get the customers
      this.customers = [...CustomerService.getCustomers()];
    },
    updateCustomerList(newCustomer) {
      CustomerService.addCustomer(newCustomer);
      this.customers.push(newCustomer);
    },
  },
};
</script>

<style>
body {
  background-color: #f5f8fb;
  font-family: "Lato", sans-serif;
  font-family: "Montserrat", sans-serif;
}
</style>
