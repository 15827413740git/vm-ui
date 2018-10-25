<template>
	<div style="display: inline-block;">
    <button :class="classs">
    	<div class="vm-btn-box">
    		<i class="vm-btn-loading" v-if="showLoading"></i>
    		<slot></slot>
    	</div>
    	
    </button>
    </div>
</template>

<script type="text/babel">
    const btnType = {
    	primary:'primary',
    	success:'success',
    	warning:'warning',
    	danger:'danger',
    	royal:'royal',
    	default:'default',
    }
    export default {
        name: 'vm-button',
        props: {
            disabled: Boolean,
            showLoading:Boolean,
            type: {
                validator(value) {
                    return btnType[value];
                },
                default: 'default'
            }
        },
        computed: {
            classs() {
            	let c1,c2,c3;
            	c1 = 'vm-btn';
            	c2 = ' vm-btn-'+this.type;
            	c3 = this.disabled?' vm-btn-disabled':'';
            	return c1+c2+c3
            }
        }
    }
</script>

<style lang="less">
    @import '../../../style/components/button.less';
</style>
