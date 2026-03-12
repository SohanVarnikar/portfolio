import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import App from "../App.vue";

test("renders the main heading", () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        // This tells the test to ignore the complex parts of these tags
        img: true,
        svg: true,
      },
    },
  });
  expect(wrapper.text()).toContain("Portfolio");
});
