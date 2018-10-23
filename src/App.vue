<template>
  <div id="app">
  	 <router-view></router-view>
  	   
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
  		flex:'horizontal',
  		listItems: ['buy food', 'play games', 'sleep'],
  	}
  },
  methods:{
  	
  }
  
}
</script>

<style>
#app {
	height: 100%;
	width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.lines{
	width: 100%;
	height: 20px;
}
</style>
