<template>
  <div>
    <h1>Test Job 1</h1>
    <div class="problem">
      Problem statement: Real time update of data between two browser tabs or windows.
    </div>
    <br>
    <div class="problem">
      Implementation:
      <br>
      Steps: 
      <ul>
        <li>Step 1: Click on Open new tab button</li>
        <li>Step 2: Start typing in this window. You'll see the changes reflected to the new window</li>
      </ul>
      <button v-on:click="openTab">Open new tab</button>
      <br>
      <input type="text" v-model="message" placeholder="Enter message">
      <br>
      {{message}} 
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterBrowser',
  data () {
    return {
      message: "",
      newWindow: null
    }
  },
  methods: {
    openTab: function(){
      console.log("open tab", window.location.href)
      this.newWindow = window.open(window.location.href)
      console.log("newWindow", this.newWindow)
    },
    receiveMessage: function(event){
      //console.log("recieveMessage", event)
      if (event.origin !== window.location.origin){
        // Origin matching to prevent XSS attack.
        return;
      }
      this.message = event.data
      console.log(event.data)
    }
  },
  watch: {
    'message': function(newValue, oldValue){
      if( oldValue !== newValue){
        this.newWindow.postMessage(this.message, window.location.href)
      }
    }
  },
  mounted(){
    this.$nextTick(function(){
      window.addEventListener('message', this.receiveMessage, false)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.problem {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
