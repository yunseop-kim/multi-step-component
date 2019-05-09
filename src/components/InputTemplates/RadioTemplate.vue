<template>
  <div>
    <div v-for="option in item.options" :key="option.id">
      <input
        :name="`option-${option.itemId}`"
        type="radio"
        :value="option.text"
        v-model="selectedItem"
      >
      {{option.text}}
    </div>
  </div>
</template>
<script>
import InputTemplate from "./InputTemplate";
export default {
  name: "CheckboxTemplate",
  extends: InputTemplate,
  watch: {
    selectedItem(val, oldVal) {
      const item = {
        id: this.item.itemId,
        answer: val
      };
      this.$store.commit("setInputItem", item);
    }
  }
};
</script>
