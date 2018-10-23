<template>
    <div class="vm-slider-item">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'vm-slider-item',
        mounted() {
            this.$nextTick(this.$parent.init);
        }
    }
</script>
