<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "InputTemplate",
  props: ["item"],
  watch: {
    selectedItems(val, oldVal) {
      console.log("selectedItems", val, oldVal);
    },
    selectedItem(val, oldVal) {
      console.log("selectedItem", val, oldVal);
    },
    textInput(val, oldVal) {
      console.log("textInput", val, oldVal);
    }
  },
  data() {
    return {
      selectedItems: [],
      selectedItem: null,
      textInput: null
    };
  }
};
</script>
<style>
</style>
