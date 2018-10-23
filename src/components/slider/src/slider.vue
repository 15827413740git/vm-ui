<template>
  <div class="vm-slider" ref="slider">
    <div class="vm-slider-wrapper" ref="warpper" :class="direction === 'vertical' ? 'vm-slider-wrapper-vertical' : ''" :style="dragStyleObject">
      <div class="vm-slider-item" v-if="loop" :style="itemHeight" v-html="lastItem"></div>
      <slot></slot>
      <div class="vm-slider-item" v-if="loop" :style="itemHeight" v-html="firstItem"></div>
    </div>
    <div class="vm-slider-pagination" v-if="itemsArr.length > 1 && showPagination" :class="direction === 'vertical' ? 'vm-slider-pagination-vertical' : ''">
      <span class="vm-slider-pagination-item" v-for="(t,i) in itemNums" :key="i" :class="paginationIndex === i ? 'vm-slider-pagination-item-active': ''" :style="{backgroundColor: paginationIndex === i ? paginationActiveColor : paginationColor}"></span>
    </div>
  </div>
</template>

<script type="text/babel">


 function isColor(value) {
      const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
      const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
      const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;
      return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
    }

export default {
  name: "vm-slider",
  data() {
    return {
      firstItem: "",
      lastItem: "",
      //当前下标
      currentIndex: 0,
      //轮播个数
      itemNums: 0,
      itemsArr: [],
      //自动轮播计时器
      autoPlayTimer: null,
      //分页下标
      paginationIndex: 0,
      itemHeight: {
        height: null
      },
      dragStyleObject: {
        transform: 0,
        speed: 0
      },
      touches: {
        moveTag: 0,
        //触摸偏移量
        moveOffset: 0,
        //触摸起始时间
        touchStartTime: 0,
        isTouchEvent: false,
        //是否允许点击
        allowClick: false,
        //是否触摸滑动
        isDraging: false
      }
    };
  },
  props: {
    index: {
      default: 0,
      validator(val) {
        return /^\d*$/.test(val);
      }
    },
    speed: {
      default: 200,
      validator(val) {
        return /^\d*$/.test(val);
      }
    },
    autoplay: {
      default: 0,
      validator(val) {
        return /^\d*$/.test(val);
      }
    },
    direction: {
      validator(val) {
        return ["horizontal", "vertical"].indexOf(val) > -1;
      },
      default: "horizontal"
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function
    },
    loop: {
      type: Boolean,
      default: true
    },
    paginationColor: {
      validator(value) {
        if (!value) return true;
        return isColor(value);
      },
      default: "#B7D0E1"
    },
    paginationActiveColor: {
      validator(value) {
        if (!value) return true;
        return isColor(value);
      },
      default: "#FF0005"
    }
  },
  watch: {
    //图片下标（初始展示的图片下标）
    index(val) {
      //取Number整数类似 Math.floor()
      val = ~~val;

      if (val > this.itemNums) {
        val = this.itemNums;
      }
      this.currentIndex = this.loop ? val + 1 : val;

      this.showItem(this.currentIndex);
    },
    //监听当前下标，改变分页器的样式
    currentIndex(val) {
      const itemNums = this.itemNums;
      //tm是实际图片的下标与分页器下标对应
      const tm = (val - 1) % itemNums;
      if (this.loop) {
        this.paginationIndex = tm < 0 ? itemNums - 1 : tm;
      } else {
        this.paginationIndex = val;
      }
    }
  },
  methods: {
    //轮播图初始化
    init() {
      //先销毁
      this.destroy();
      //确认是否垂直滚动
      this.isVertical = this.direction === "vertical";
      //子组件数组
      this.itemsArr = this.$children.filter(
        item => item.$options.name === "vm-slider-item"
      );
      //子组件长度（图片数量）
      this.itemNums = this.itemsArr.length;

      if (this.loop) {
        //默认index为0，即第一张图片，因为循环，所有在原图片的第一张前加了最后一张图片，所有第一张图片下标为1
        this.currentIndex = 1;
        //如果不为第一张图片时，在index基础上加1
        if (this.index > 0) {
          this.currentIndex = ~~this.index + 1;
        }
      } else {
        //如果不循环，则图片下标与index对应
        this.currentIndex = 0;
        if (this.index > 0) {
          this.currentIndex = ~~this.index;
        }
      }
      //根据是否循环进行图片复制
      this.cloneItem();
      //展示当前下标所对应的图片
      this.showItem(this.currentIndex);
      //绑定事件
      this.bindEvents();
      //自动轮播
      this.autoPlay();
    },
    //显示当前下标的图片
    showItem(index) {
      if (this.isVertical) {
        this.$refs.slider.style.height = "100%";
        const height = this.$el.clientHeight;
        this.itemHeight.height = height + "px";
        this.setTranslate(0, -height * index);
        this.itemsArr.forEach(item => {
          item.$el.style.height = height + "px";
        });
      } else {
        this.setTranslate(0, -this.$refs.warpper.offsetWidth * index);
      }
    },
    cloneItem() {
      //如果只有一张图片或者没有图片又或者不循环，则不进行克隆
      if (this.itemsArr.length <= 1 || !this.loop) return;

      const itemArr = this.itemsArr;
      //获取第一张图片的内容
      this.firstItem = itemArr[0].$el.innerHTML;
      //获取最后一张图片的内容
      this.lastItem = itemArr[itemArr.length - 1].$el.innerHTML;
    },
    touchStartHandler(event) {
      const touches = this.touches;
      //触摸开始，点击事件为true
      touches.allowClick = true;
      //如果事件类型为'touchstart'，则触摸事件为true
      touches.isTouchEvent = event.type === "touchstart";
      //如果不是触摸事件，停止进行
      if (!touches.isTouchEvent && "which" in event && event.which === 3)
        return;
      //初始时moveTag为0，代表还未进行触摸
      if (touches.moveTag === 0) {
        //moveTag为1,开始触摸
        touches.moveTag = 1;
        //获取开始触摸时的坐标
        touches.startX = event.touches
          ? event.touches[0].clientX
          : event.clientX;
        touches.startY = event.touches
          ? event.touches[0].clientY
          : event.clientY;
        //获取开始触摸的时间
        touches.touchStartTime = Date.now();

        const itemNums = this.itemNums;

        if (!this.loop) {
          //如果不循环，且当前下标为-1时
          if (this.currentIndex === -1) {
            //当前下标为最后一张图的下标
            this.currentIndex = itemNums - 1;
            //移动到相应的位置
            this.setTranslate(
              0,
              -(itemNums - 1) *
                (this.isVertical
                  ? this.$el.clientHeight
                  : this.$refs.warpper.offsetWidth)
            );
            return;
          }
          //当前下标大于最后一张图的下标时
          if (this.currentIndex > itemNums - 1) {
            //当前下标重新赋值为1，即为第二张图
            this.currentIndex = 1;
            //移动到相应的位置
            this.setTranslate(
              0,
              this.isVertical
                ? -this.$el.clientHeight
                : -this.$refs.warpper.offsetWidth
            );
          }
        } else {
          //如果循环，且当前下标为0，也就是克隆上去的最后一张图
          if (this.currentIndex === 0) {
            //则当前下标为滚动图片的最后一张图的下标
            this.currentIndex = itemNums;
            //移动到相应的位置
            this.setTranslate(
              0,
              -itemNums *
                (this.isVertical
                  ? this.$el.clientHeight
                  : this.$refs.warpper.offsetWidth)
            );
            return;
          }
          //当前下标为大于图片数时，也就是克隆上去的第一张图
          if (this.currentIndex > itemNums) {
            //则当前下标为滚动图片的第一张图的下标
            this.currentIndex = 1;
            //移动到相应的位置
            this.setTranslate(
              0,
              this.isVertical
                ? -this.$el.clientHeight
                : -this.$refs.warpper.offsetWidth
            );
          }
        }
      }
    },
    touchMoveHandler(event) {
      if (!this.supportTouch || this.isVertical) {
        event.preventDefault();
      }
      const touches = this.touches;
      //滑动点击事件为false

      touches.allowClick = false;
      //如果触摸事件为true，且事件类型为鼠标移动

      if (touches.isTouchEvent && event.type === "mousemove") return;
      //获取触摸移动时的x坐标和y坐标
      const currentY = event.touches ? event.touches[0].clientY : event.clientY;
      const currentX = event.touches ? event.touches[0].clientX : event.clientX;
      //计算触摸滑动角度
      const touchAngle =
        (Math.atan2(
          Math.abs(currentY - touches.startY),
          Math.abs(currentX - touches.startX)
        ) *
          180) /
        Math.PI;
      //如果水平轮播，滑动角度大于45度，且supportTouch为true，则moveTag为3（触摸滑动状态失败）
      if (
        (!this.isVertical ? touchAngle > 45 : 90 - touchAngle > 30) &&
        this.supportTouch
      ) {
        touches.moveTag = 3;
        //停止自动轮播
        this.stopAutoplay();
        //滑动到相应位置（即位置不变，因为currentIndex没变，滑动失败）
        this.setTranslate(
          0,
          -this.currentIndex *
            (this.isVertical
              ? this.$el.clientHeight
              : this.$refs.warpper.offsetWidth)
        );
        return;
      }
      //isDraging为true（滑动为true）
      touches.isDraging = true;
      //滑动偏移量
      const deltaSlide = (touches.moveOffset = this.isVertical
        ? currentY - touches.startY
        : currentX - touches.startX);
      //如果滑动偏移量不为0，且滑动状态至少为已触发
      if (deltaSlide !== 0 && touches.moveTag !== 0) {
        //如果滑动状态为1，即已触发touchstart，且角度合适时，moveTag为2，即触摸滑动状态成功。
        if (touches.moveTag === 1) {
          //停止自动轮播
          this.stopAutoplay();
          touches.moveTag = 2;
        }
        //触摸滑动的距离为  偏移量的一半
        if (touches.moveTag === 2) {
          this.setTranslate(
            0,
            -this.currentIndex *
              (this.isVertical
                ? this.$el.clientHeight
                : this.$refs.warpper.offsetWidth) +
              deltaSlide / 2
          );
        }
      }
    },
    touchEndHandler() {
      const touches = this.touches;
      const moveOffset = touches.moveOffset;
      const warpperSize = this.isVertical
        ? this.$el.clientHeight
        : this.$refs.warpper.offsetWidth;
      //如果moveTag为1，即只触摸，未进行滑动
      if (touches.moveTag === 1) {
        //moveTag重新赋值为0，触摸事件结束
        touches.moveTag = 0;
      }

      setTimeout(() => {
        touches.allowClick = true;
        touches.isDraging = false;
      }, this.speed);

      //如果moveTag为2，即滑动状态成功，moveTag重新赋值为0，触摸事件结束
      if (touches.moveTag === 2) {
        touches.moveTag = 0;
        //获取整个滑动时间
        const timeDiff = Date.now() - touches.touchStartTime;

        //非循环轮播状态   如果不循环，且当前下标为0，移动偏移量大于0。或当前下标大于最后一个图片下标，且移动偏移量小于0  则为true
        const unloopDrag =
          !this.loop &&
          ((this.currentIndex === 0 && moveOffset > 0) ||
            (this.currentIndex >= this.itemNums - 1 && moveOffset < 0));
        //如果滑动时间大于250且移动偏移量的绝对值小于等于图片宽度的一半，或者只有一张图片，又或者为非循环轮播状态 则位置不变（currentIndex未变）
        if (
          (timeDiff > 250 && Math.abs(moveOffset) <= warpperSize * 0.5) ||
          this.itemsArr.length <= 1 ||
          unloopDrag
        ) {
          this.setTranslate(this.speed, -this.currentIndex * warpperSize);
        } else {
          this.setTranslate(
            this.speed,
            //如果偏移量大于0（向右滑动），当前下标减1，否则当前下标加1
            -(
              (moveOffset > 0 ? --this.currentIndex : ++this.currentIndex) *
              warpperSize
            )
          );
          //执行回调函数并传入下标
          this.sendIndex();
        }
        //重新执行自动播放
        this.autoPlay();
        return;
      }
      //如果触摸滑动失败
      if (touches.moveTag === 3) {
        //moveTag重新赋值为0，一次触摸结束
        touches.moveTag = 0;
        //重新执行自动播放
        this.autoPlay();
      }
    },
    autoPlay() {
      //如果autoplay小于0或图片只有一张 不执行自动播放
      if (this.autoplay <= 0 || this.itemsArr.length <= 1) return;

      this.autoPlayTimer = setInterval(() => {
        const size = this.isVertical
          ? this.$el.clientHeight
          : this.$refs.warpper.offsetWidth;
        //如果不循环且当前下标为最后一张图片下标，则下标为-1
        if (!this.loop) {
          if (this.currentIndex + 1 >= this.itemNums) {
            this.currentIndex = -1;
          }
        }
        //如果当前下标大于图片数量，即循环时最后一张图片下标
        if (this.currentIndex > this.itemNums) {
          //重新赋值为1，即第一张图片
          this.currentIndex = 1;
          //同时移动到第一张图片
          this.setTranslate(0, -size);
          //100毫秒后移动到第二张图片
          setTimeout(() => {
            this.setTranslate(this.speed, -(++this.currentIndex * size));
          }, 100);
          //执行回调函数
          this.callback && this.callback(this.currentIndex);
          return;
        }
        this.setTranslate(this.speed, -(++this.currentIndex * size));

        this.sendIndex();
      }, this.autoplay);
    },
    sendIndex() {
      //如果不循环
      if (!this.loop) {
        //回调函数存在，执行回调函数传入当前下标
        this.callback && this.callback(this.currentIndex);
      } else {
        let _index = this.currentIndex % this.itemNums;
        this.callback &&
          this.callback(_index === 0 ? this.itemNums - 1 : _index - 1);
      }
    },
    stopAutoplay() {
      //清空计时器
      clearInterval(this.autoPlayTimer);
    },
    stopDrag(event) {
      //如果触摸滑动成功，那么阻止默认事件（屏幕滑动）
      this.touches.isDraging && event.preventDefault();
    },
    //触摸事件绑定
    bindEvents() {
      this.$el.addEventListener("touchstart", this.touchStartHandler);
      this.$el.addEventListener("touchmove", this.touchMoveHandler);
      this.$el.addEventListener("touchend", this.touchEndHandler);

      this.$el.addEventListener("click", e => {
        if (!this.touches.allowClick) {
          e.preventDefault();
        }
      });

      window.addEventListener("resize", this.resizeSlides);

      document.body.addEventListener("touchmove", this.stopDrag, {
        passive: false
      });
    },
    //解除事件绑定
    unbindEvents() {
      this.$el.removeEventListener("touchstart", this.touchStartHandler);
      this.$el.removeEventListener("touchmove", this.touchMoveHandler);
      this.$el.removeEventListener("touchend", this.touchEndHandler);

      window.removeEventListener("resize", this.resizeSlides);

      document.body.removeEventListener("touchmove", this.stopDrag, {
        passive: false
      });
    },
    setTranslate(speed, translate) {
      this.dragStyleObject.transitionDuration = speed + "ms";
      if (this.isVertical) {
        this.dragStyleObject.transform =
          "translate3d(0, " + translate + "px, 0)";
      } else {
        this.dragStyleObject.transform =
          "translate3d(" + translate + "px, 0, 0)";
      }
    },
    resizeSlides() {
      if (this.isVertical) {
        const height = this.$el.clientHeight;
        this.dragStyleObject.transform =
          "translate3d(0, " + -this.currentIndex * height + "px, 0)";
      } else {
        const width = this.$refs.warpper.offsetWidth;
        this.dragStyleObject.transform =
          "translate3d(" + -this.currentIndex * width + "px, 0, 0)";
      }
    },
    //销毁
    destroy() {
      //解绑所有事件
      this.unbindEvents();
      //停止自动播放
      this.stopAutoplay();
    }
  },
  mounted() {
    this.supportTouch =
      (window.Modernizr && !!window.Modernizr.touch) ||
      (function() {
        return !!(
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof DocumentTouch)
        );
      })();
  },
  beforeDestroy() {
    this.destroy();
  }
};
</script>

<style lang="less">
@import "../../../style/components/slider.less";
</style>
