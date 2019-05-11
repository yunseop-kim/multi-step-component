<script>
export default {
  name: "InputTemplate",
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      selectedItems: [],
      selectedItem: null,
      textInput: null
    };
  },
  methods: {
    setInputItem(item) {
      this.$store.commit("setInputItem", item);
    }
  }
};
</script>