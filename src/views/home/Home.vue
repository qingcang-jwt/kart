/**
* Created by tudou on 2020/4/25 16:14.
*/
<template>
  <div>
    <h1>Home</h1>
    <a-button type="primary" @click="handleTest">调整</a-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    handleTest() {
      this.$router.push({
        name: 'todoList',
      });
    },
  }
};
</script>

<style lang="less" scoped>

</style>
