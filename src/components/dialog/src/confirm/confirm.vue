<template>
    <div 
    	class="vm-dialog-black-mask" 
    	@touchmove.prevent="stopEvent" 
    	@mousewheel.prevent="stopEvent"
    	v-if="visible"
    	>
        <div :class="'vm-confirm '+activeClass">
            <div class="vm-confirm-hd"><strong class="vm-confirm-title" v-text="title"></strong></div>
            <div class="vm-confirm-bd" v-text="mes"></div>
                <div class="vm-confirm-ft">
                    <a href="javascript:;" class="vm-confirm-btn default" @click.stop="closeConfirm(false)" v-text="cancelText"></a>
                    <a href="javascript:;" class="vm-confirm-btn primary" @click.stop="closeConfirm(true)" v-text="okText"></a>
                </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
    	data(){
    		return {
    			visible:false,
    			activeClass:'',
    			closed:false,
    		}
    	},
        props: {
            title:{
            	type:String,
            	default:'标题'
            },
            mes:{
            	type:String,
            	default:'自定义内容'
            },
            callback:{
            	type:Function,
            	default:(res)=>{
            		console.log(res)
            	}
            },
            cancelText:{
            	type:String,
            	default:'取消'
            },
            okText:{
            	type:String,
            	default:'确认'
            },
        },
        methods:{
           stopEvent(){
            	return false;
           },
           destroyAlert() {
        		this.$el.removeEventListener('webkitAnimationEnd', this.destroyAlert);
        		this.visible = false;
                this.$el.parentNode.removeChild(this.$el);
            },
           closeConfirm(Boolean){
              	this.closed = true;
        		this.$el.addEventListener('webkitAnimationEnd', this.destroyAlert);
                this.activeClass = "leave-active";
        		return typeof this.callback === 'function' && this.callback(Boolean);
           }
        }
    }
</script>
