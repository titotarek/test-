import { shallowMount } from "@vue/test-utils";
import CustomerForm from "../components/CustomerForm.vue";

describe("CustomerForm", () => {
  it("renders form fields correctly", () => {
    const wrapper = shallowMount(CustomerForm);

    expect(wrapper.find("#firstNameFirstName").exists()).toBe(true);
    expect(wrapper.find("#lastNameLastName").exists()).toBe(true);
    expect(wrapper.find("#dob").exists()).toBe(true);
    expect(wrapper.find("#phone").exists()).toBe(true);
    expect(wrapper.find("#email").exists()).toBe(true);
    expect(wrapper.find("#bank").exists()).toBe(true);

    expect(wrapper.find("#firstNameFirstName").isVisible()).toBe(true);
    expect(wrapper.find("#lastNameLastName").attributes("required")).toBe("required");
  });

});
