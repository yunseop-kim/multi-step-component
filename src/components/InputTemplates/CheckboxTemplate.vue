<template>
  <div>
    <h2 class="question">{{item.title}}</h2>
    <div v-for="option in item.options" :key="option.id">
      <input
        :id="`checkbox_${option.id}`"
        type="checkbox"
        :value="option.text"
        v-model="selectedItems"
      >
      <label :for="`checkbox_${option.id}`">{{option.text}}</label>
    </div>
  </div>
</template>
<script>
import InputTemplate from "./InputTemplate";
export default {
  name: "CheckboxTemplate",
  extends: InputTemplate,
  watch: {
    selectedItems(val) {
      const item = {
        id: this.item.itemId,
        answer: val.join(",")
      };
      this.setInputItem(item);
    }
  }
};
</script>
