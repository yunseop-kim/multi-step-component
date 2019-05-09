<template>
  <div>
    <div v-for="option in item.options" :key="option.id">
      <input type="checkbox" :value="option.text" v-model="selectedItems">
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
    selectedItems(val, oldVal) {
      const item = {
        id: this.item.itemId,
        answer: val.join(",")
      };
      this.$store.commit('setInputItem', item)
    }
  }
};
</script>
