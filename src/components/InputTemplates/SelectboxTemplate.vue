<template>
  <div>
    <select v-model="selectedItem">
      <option :value="null">선택하세요</option>
      <option v-for="option in item.options" :key="option.id" :value="option.text">{{option.text}}</option>
    </select>
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
  },
};
</script>
