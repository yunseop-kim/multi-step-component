<template>
  <div>
    <input type="text" v-model="textInput">
  </div>
</template>
<script>
import InputTemplate from "./InputTemplate";
export default {
  name: "CheckboxTemplate",
  extends: InputTemplate,
  watch: {
    textInput(val, oldVal) {
      const item = {
        id: this.item.itemId,
        answer: val
      };
      this.$store.commit("setInputItem", item);
    }
  },
};
</script>
