<template>
  <div>
    <h2 class="question">{{item.title}}</h2>
    <div v-for="option in item.options" :key="option.id">
      <input :id="`option-${option.id}`" type="radio" :value="option.text" v-model="selectedItem">
      <label :for="`option-${option.id}`">{{option.text}}</label>
    </div>
  </div>
</template>
<script>
import InputTemplate from "./InputTemplate";
export default {
  name: "RadioTemplate",
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
