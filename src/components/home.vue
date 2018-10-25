<template>
	<div>
		
		<vm-button type="warning" :showLoading="true" @click.native="alert">alert</vm-button>
		<vm-button type="primary" @click.native="confirm">confirm</vm-button>
		<vm-button type="success" @click.native="toast">toast</vm-button>
		<vm-button type="danger"  @click.native="loading">loading</vm-button>
		<vm-button type="royal" @click.native="notify">notify</vm-button>
		<!--<scroll
			:on-refresh="onRefresh"
            :on-infinite="onInfinite"
			>
			<p v-for="item in items">1111111111111</p>
		</scroll>-->
		

	</div>
</template>

<script>
	export default {
		data() {
			return {
				infiniteCount: 0,
				items: [],
			}
		},
		mounted() {
			for(let i = 1; i <= 20; i++) {
				this.items.push(i + ' - keep walking, be 2 with you.')
			}
			this.top = 1
			this.bottom = 20
		},
		methods: {
			loading(){
				this.$dialog.loading.open("hahahah");
				setTimeout(()=>{
					this.$dialog.loading.close();
				},2000)
			},
			alert() {
				this.$dialog.alert({
//					mes: '呵呵搭',
//					callback:()=>{
//						console.log("已关闭")
//					}
				});
			},
			confirm() {
				this.$dialog.confirm({
					title: '选填标题',
					mes: '我有一个小毛驴我从来也不骑！',
					callback: (val) => {
						console.log(val)
					}
				});
			},
			toast() {
				this.$dialog.toast({
					mes: 'hellow',
					timeout: 3000,
					icon: 'none'
				});
			},
			notify() {
				this.$dialog.notify({
					mes: '5秒后自动消失，点我也可以消失！',
					timeout: 5000,
					callback: () => {
						console.log('我走咯！');
					}
				});
			},
			onRefresh(done) {
				setTimeout(() => {
          let start = this.top - 1
          for (let i = start; i > start - 10; i--) {
            this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
          }
          this.top = this.top - 10;

          done()
        }, 1500)
			},
			onInfinite(done) {
				setTimeout(() => {
          if (this.infiniteCount < 2) {
            let start = this.bottom + 1
            for (let i = start; i < start + 10; i++) {
              this.items.push(i + ' - keep walking, be 2 with you.')
            }
            this.bottom = this.bottom + 10;

            this.infiniteCount++
          }

          done()
        }, 1500)
			}
		}

	}
</script>

<style>

</style>