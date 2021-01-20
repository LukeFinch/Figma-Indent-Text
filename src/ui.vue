<template>
<div id="ui">
  <input type=number class="input" v-model="indent" />
	<button class="button button--primary" @click='createNode'> Indent Text </button>
</div>
</template>

<script>
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'
import {
  dispatch,
  handleEvent
} from "./uiMessageHandler";
import {
  onMounted,
  ref
} from 'vue';

export default {
  setup() {

    const indent = ref("")

    function createNode() {
      // This shows how the UI code can send messages to the main code.
      dispatch("createNode", indent.value);
    }
    onMounted(() => {

      // The following shows how messages from the main code can be handled in the UI code.
      handleEvent("nodeCreated", nodeID => {
        message.value = `Node ${nodeID} was created!`;
      });
    })

    return {
      indent,
      createNode
    };
  }

};
</script>

<style scoped>
#ui{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--size-medium);
}
</style>