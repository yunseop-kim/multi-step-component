<template>
  <div>
    <h2 class="question">{{item.title}}</h2>
    <input type="text" v-model="textInput">
  </div>
</template>
<script>
import InputTemplate from "./InputTemplate";
export default {
  name: "CheckboxTemplate",
  extends: InputTemplate,
  watch: {
    textInput(val) {
      const item = {
        id: this.item.itemId,
        answer: val
      };
      this.setInputItem(item);
    }
  }
};
</script>
