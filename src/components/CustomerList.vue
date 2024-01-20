<template>
  <div class="customer-list-container">
    <h2>Customer List</h2>
    <div v-if="customers.length > 0" class="customer-cards-container">
      <div
        v-for="(customer, index) in customers"
        :key="index"
        class="customer-card"
      >
        <div class="customer-info">
          <div class="name">
            <i class="fas fa-user icon"></i>{{ customer.FirstName }}
            {{ customer.LastName }}
          </div>
          <div class="email">
            <i class="fas fa-envelope icon"></i>{{ customer.Email }}
          </div>
          <div class="phone">
            <i class="fas fa-phone icon"></i>{{ customer.PhoneNumber }}
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
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  props: ["customers"],
};
</script>

<style scoped>
.customer-list-container {
  max-width: 600px;
  margin: 20px auto;
  background-color: white;
  border: 1px solid rgb(232, 230, 230);
  padding: 15px;
}

.customer-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.customer-card {
  flex: 0 0 calc(50% - 10px); /* Adjust the width to fit two cards with some gap */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
}

.customer-info {
  font-size: 16px;
}

.name {
  font-weight: bold;
  margin-bottom: 8px;
}

.email,
.phone {
  color: #666;
  padding-bottom: 5px;
}
.icon {
  color: #888;
  margin-right: 8px;
}
</style>
