<template>
    <div class="vm-dialog-white-mask">
        <div class="vm-loading">
            <div class="vm-loading-icon"></div>
            <div class="vm-loading-txt" v-text="title"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
        	return {
        		 title:'正在加载'
        	}
        },
        methods:{
        	open(title){
        		title?this.title = title:'';
        		if(typeof title !== 'string' ){
        			document.body.appendChild(this.$el);
        		    console.warn("'title' it should be string type ")
        		} else{
        			document.body.appendChild(this.$el);
        		}
        	},
        	close(){
        		this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
        	}
        }
        
    }
</script>
