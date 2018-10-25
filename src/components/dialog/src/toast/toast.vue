<template>
    <div class="vm-dialog-white-mask">
        <div class="vm-toast" :class="icon == 'none' ? 'vm-toast-none-icon '+activeClass:activeClass">
            <div v-show="icon&&icon!=='none'" :class="'vm-toast-'+icon+'-icon'"></div>
            <p class="vm-toast-content" v-text="mes"></p>
        </div>
    </div>
</template>

<script type="text/babel">
	const iconType = {
		success:'success',
		error:'error',
		none:'none',
	}
    export default {
    	data() {
    		return {
    			timer:null,
    			activeClass:'',
    		}
    	},
        props: {
            mes:{
            	type:String,
            	default:'自定义内容'
            },
            icon:{
            	validator:(value)=>{
					return iconType[value]
				},
				default: 'none',
            },
            timeout:{
            	type:Number,
            	default:2000
            },
        },
        methods:{
        	showToast() {
        		this.activeClass = 'enter-active';
            	clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                this.closeToast();
                }, this.timeout + 100);
            },
            closeToast() {
            	this.activeClass = 'leave-active';
            	const timer = setTimeout(() => {
            	clearTimeout(timer);
                this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
                this.activeClass = '';
                },250);
                
            }
        }
    }
</script>
