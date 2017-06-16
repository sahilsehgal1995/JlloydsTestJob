<template>
  <div>
    <h1>Test Job 2</h1>
    <div class="problem">
      Problem statement: Google RSS field url data fetch.
    </div>
    <br>
    <div class="problem">
      Implementation: 
      <br>
      <input type="text" v-model="url" placeholder="Enter a valid RSS field url">
      <button v-on:click="getRssFields">Submit</button>
      <br>
      {{error}}
        <ul id="fields">
          <li v-for="field in fields">
              <div> 
                  <div v-html="field.description"></div>
              </div>
              <br>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RSS',
  data () {
    return {
      url: 'https://news.google.com/news?cf=all&hl=en&pz=1&ned=in&output=rss',
      fields: [],
      error: ''
    }
  },
  methods: {
    getRssFields: function(event){
      console.log("getRssFields", event, this.$http.get);
      var data = {
        dataType: 'json',
        params:{
          rss_url: this.url
        }
      }
      this.$http.get('https://api.rss2json.com/v1/api.json', data)
      .then(function(response){
          console.log("response", response);
          this.fields = [];
          if (response.body.status === 'ok'){
            this.error = ''
            this.fields = response.body.items
            return true
          }
          this.error = response.body.message
      }, function(error){
          console.log("error", error);
          this.error = error.body
      });
    }
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
