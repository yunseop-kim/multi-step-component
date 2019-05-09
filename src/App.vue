<template>
  <div id="app">
    <div id="title">
      <h1>{{myInput.title}}</h1>
    </div>
    <div id="items" v-for="(item, index) in myInput.items" :key="index">
      <h2 :id="`item-${item.itemId}`">{{item.title}}</h2>
      <div v-if="item.formType == 1">
        <div v-for="option in item.options" :key="option.id">
          <input
            type="checkbox"
            :id="`checkbox-${option.id}`"
            :value="option.text"
            v-model="checkedItem"
          >
          <label :for="`checkbox-${option.id}`">{{option.text}}</label>
        </div>
      </div>
      <div v-if="item.formType == 2">
        <div v-for="option in item.options" :key="option.id">
          <input
            type="radio"
            :id="`radio-${option.id}`"
            :value="option.text"
            v-model="radioCheckedItem"
          >
          <label :for="`radio-${option.id}`">{{option.text}}</label>
          <br>
        </div>
      </div>
      <div v-if="item.formType == 3">
        <input type="text" v-model="textItem">
      </div>
      <div v-if="item.formType == 4">
        <select v-model="selectedItem">
          <option
            v-for="option in item.options"
            :key="option.id"
            :value="option.text"
          >{{option.text}}</option>
        </select>
      </div>
    </div>
    {{checkedItem}}
    {{radioCheckedItem}}
    {{textItem}}
    {{selectedItem}}
  </div>
</template>

<script>
import myInput from "@/assets/input.json";
export default {
  name: "app",
  data() {
    return {
      myInput,
      checkedItem: [],
      radioCheckedItem: null,
      textItem: "",
      selectedItem: null
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
