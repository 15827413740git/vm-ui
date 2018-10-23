<template>
    <div @touchmove.prevent="stopEvent"
    	 @mousewheel.prevent="stopEvent"  
    	 class="vm-dialog-black-mask"
    	 v-if="visible"
    	 >
        <div :class="'vm-confirm vm-alert '+activeClass">
            <div class="vm-confirm-bd" v-text="mes"></div>
            <div class="vm-confirm-ft">
                <a href="javascript:;" class="vm-confirm-btn primary" @click.stop="closeAlert">确定</a>
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
            mes:{
            	type:String,
            	default:'自定义内容'
            },
            callback:{
            	type:Function,
            	default:()=>{
            		console.log("close")
            	}
            },
        },
        methods:{
        	closeAlert(){
        		this.closed = true;
        		this.$el.addEventListener('webkitAnimationEnd', this.destroyAlert);
                this.activeClass = "leave-active";
        		return typeof this.callback === 'function' && this.callback();
        	},
        	destroyAlert() {
        		this.$el.removeEventListener('webkitAnimationEnd', this.destroyAlert);
        		this.visible = false;
                this.$el.parentNode.removeChild(this.$el);
            },
            stopEvent(){
            	return false;
            }
        },
    }
</script>

<style lang="less">
    @import "../../../../style/components/dialog.less";
    
</style>
