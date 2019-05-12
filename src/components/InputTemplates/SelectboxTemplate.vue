<template>
  <div>
    <h2 class="question">{{item.title}}</h2>
    <select v-model="selectedItem">
      <option v-for="option in item.options" :key="option.id" :value="option.text">{{option.text}}</option>
    </select>
  </div>
</template>
<script>
import InputTemplate from "./InputTemplate";
export default {
  name: "SelectBoxTemplate",
  extends: InputTemplate,
  watch: {
    selectedItem(val) {
      const item = {
        id: this.item.itemId,
        answer: val
      };
      this.setInputItem(item);
    }
  }
};
</script>
