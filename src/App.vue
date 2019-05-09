<template>
  <div id="app">
    <div id="title">
      <h1>{{myInput.title}}</h1>
    </div>
    <input-template v-for="(item, index) in myInput.items" :key="index" :item="item">
      <h2 v-if="step == index">{{item.title}}</h2>
      <component v-if="step == index" :item="item" :is="componentFactory(item.formType)"></component>
    </input-template>
    <div name="buttons" v-if="!submitted">
      <button v-if="step != 0" @click="prev">이전</button>
      <button v-if="!isLast" @click="next">다음</button>
      <button v-if="isLast" @click="submit">제출</button>
    </div>
    <div v-else>
      <h5>답변이 제출되었습니다.</h5>
      {{output}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import myInput from "@/assets/input.json";
import InputTemplate from "./components/InputTemplates/InputTemplate";
import CheckboxTemplate from "./components/InputTemplates/CheckboxTemplate";
import RadioTemplate from "./components/InputTemplates/RadioTemplate";
import SelectboxTemplate from "./components/InputTemplates/SelectboxTemplate";
import TextInputTemplate from "./components/InputTemplates/TextInputTemplate";
export default {
  name: "app",
  data() {
    return {
      myInput,
      step: 0,
      submitted: false
    };
  },
  mounted() {
    this.$store.commit("setFormId", this.myInput.formId);
  },
  computed: {
    ...mapGetters(["output"]),
    isLast() {
      return this.step == this.myInput.items.length - 1;
    }
  },
  methods: {
    componentFactory(formType) {
      switch (formType) {
        case 1:
          return "CheckboxTemplate";
        case 2:
          return "RadioTemplate";
        case 3:
          return "TextInputTemplate";
        case 4:
          return "SelectboxTemplate";
        default:
          return "InputTemplate";
      }
    },
    prev() {
      this.$store.commit("removeItem");
      this.step--;
    },
    next() {
      if (this.$store.getters.currentItem.answer) {
        this.$store.commit("addItem");
        this.step++;
      } else {
        window.alert("값을 입력해주세요!");
        return;
      }
      // if (!this.isLast)
    },
    submit() {
      this.next();
      console.log("result: ", this.output);
      this.submitted = true;
    }
  },
  components: {
    InputTemplate,
    CheckboxTemplate,
    RadioTemplate,
    SelectboxTemplate,
    TextInputTemplate
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
