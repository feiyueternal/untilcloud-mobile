<template>
   <div class="TeaGestureUnlock">
      <div class="gesture">
         <ul>
           <li ref="selectLi" v-for="(item, index) in list" :key="item.id"
              :class="{'selectedOuter': password.indexOf(index) !== -1 ? true : false,
              'selectedOuter2': password.indexOf(index) !== -1 && redStyle ? true : false}">
            <span :class="{'selectedInside': password.indexOf(index) !== -1 ? true : false,
                   'selectedInside2': password.indexOf(index) !== -1 && redStyle ? true : false}">
             <!--圆心-->
              <i ref="selectLiO"></i>
          </span>
        </li>
       </ul>
     </div>
     <div class="canvasDiv">
       <!-- <canvas id="canvasClearTop">此浏览器不支持canvas</canvas> -->
       <canvas id="canvas"  @touchstart="start" @touchmove="move" @touchend="end">此浏览器不支持canvas</canvas>
     </div>
     <!-- <div class='incorrectTip'><span v-show="tips">前后格式不一致，请重新绘制</span></div> -->
    </div>
</template>

<script>
export default {
    name: "GestureUnlock",
    data() {
        return {
            list: [
            {id:0, top: 0, left: 0, isSelected: false},
            {id:1, top: 0, left: 0, isSelected: false},
            {id:2, top: 0, left: 0, isSelected: false},
            {id:3, top: 0, left: 0, isSelected: false},
            {id:4, top: 0, left: 0, isSelected: false},
            {id:5, top: 0, left: 0, isSelected: false},
            {id:6, top: 0, left: 0, isSelected: false},
            {id:7, top: 0, left: 0, isSelected: false},
            {id:8, top: 0, left: 0, isSelected: false},
          ],
          left: [], // 圆心x坐标
          top: [], // 圆心y坐标
          password: [], // 用来存储创建密码，从上到下，从左到右依次是123,456,789
          cas: '', // 画笔
          casClearTop:'', // 上部清除线条的画布对象
          clientWidth: 0,
          clientHeight: 0,
          isCorrect: true, // 密码是否且是否正确
          redStyle: false, // li样式是否为红色
          createPassword: Array, // 这个用来存一下父组件传过来的fatherPassword，因为子组件不能直接修改父组件传过来的值
          radius: Number, // 半径
          tips: false // 错误提示是否显示
        }
        
    },
    props: {
        // 存储确认密码，变成组件后由父组件传过来，默认是空数组
        fatherPassword: {
          default: ()=>[], // 这个地方不能写成default: []
          type: Array
        }
      },

    methods: {
         // 手指点下
       start (e) {
         if(e.touches.length > 1 || e.scale && e.scale !== 1) { // 多点触碰或者缩放
           console.log('这样不行', e)
         } else {
           console.log('start', e.touches[0].pageX , e.touches[0].pageY)
         }
       },
       // 手指移动
       move (e) {
         // this.casClearTop.clearRect(0,0,200,200);
         let nowLeft = e.touches[0].pageX
         let nowTop = e.touches[0].pageY
         for (var i = 0; i < this.left.length; i++) {
           // 圆心坐标
           let oLeft = this.left[i]
           let oTop = this.top[i]
           if((oLeft - this.radius) <= nowLeft && nowLeft <= (oLeft + this.radius) && (oTop - this.radius) <= nowTop && nowTop <= (oTop + this.radius)) {
             if (this.password.length === 0 && this.password.indexOf(i) === -1) {
               this.password.push(i) // 直接存进密码
             } else if(this.password.indexOf(i) === -1){
               console.log('连中的值：', this.password[this.password.length - 1])
               let value = this.password[this.password.length - 1] // 根据此值(下标)找出对应的this.left和this.top
               // value是上一个点的值，i是当前连接点的值
               // 1-9 9-1、3-7 7-3、2-8 8-2、4-6 6-4
               if (i === 0 && value === 8 || i === 8 && value === 0 ||
                 i === 2 && value === 6 || i === 6 && value === 2 ||
                 i === 1 && value === 7 || i === 7 && value === 1 ||
                 i === 3 && value === 5 || i === 5 && value === 3) {
                 // this.password中存的是下标
                 if (this.password.indexOf(4) === -1) {this.password.push(4)}
               } else if(i === 2 && value === 0 || i === 0 && value === 2) { // 1-3  3-1
                 if (this.password.indexOf(1) === -1) {this.password.push(1)}
               } else if(i === 6 && value === 8 || i === 8 && value === 6){ // 7-9  9-7
                 if (this.password.indexOf(7) === -1) {this.password.push(7)}
               }else if(i === 0 && value === 6 || i === 6 && value === 0){ // 1-7  7-1
                 if (this.password.indexOf(3) === -1) {this.password.push(3)}
               }else if(i === 2 && value === 8 || i === 8 && value === 2){ // 3-9  9-3
                 if (this.password.indexOf(5) === -1) {this.password.push(5)}
               }
               // 存密码
               this.password.push(i)
             }
           }
         }
         this.paint(nowLeft, nowTop, true)
       },
       // 画线的方法
       paint (nowX, nowY, color) {
         // console.log('paint')
         // this.casClearTop.clearRect(0,0,200,200); // 因为不是在这个canvas上画的，所以清了也没用
         this.cas.clearRect(0,0,this.clientWidth,this.clientHeight); // 每次画都清空整个画布
         this.cas.beginPath();
         for (var i = 0; i < this.password .length; i++) {
           this.cas.lineTo(this.left[this.password [i]], this.top[this.password [i]]); // 从这个开始
         }
         this.cas.lineTo(nowX, nowY);
         if (!color) {
           this.cas.strokeStyle = '#ff4b4b'
         } else {
           this.cas.strokeStyle = '#498bcb'
         }
         this.cas.lineJoin = "round"
         this.cas.lineWidth = 2;
         this.cas.stroke();
         // 清除li内圆形区域的线条
         this.password.forEach((item) => {
           this.clearArcFun(this.left[item], this.top[item], this.radius)
         })
       },
       // 清除li内的圆形区域
       clearArcFun (centerX, centerY, radius) {
         var stepClear = 1; //别忘记这一步
         var _this = this
         clearArc(centerX, centerY, radius);
         function clearArc(x, y, radius){ // 圆心x,y，半径radius
           var calcWidth = radius - stepClear;
           var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);
           var posX = x - calcWidth;
           var posY = y - calcHeight;
           var widthX = 2 * calcWidth;
           var heightY = 2 * calcHeight;
           if(stepClear <= radius){
             _this.cas.clearRect(posX, posY, widthX, heightY);
             stepClear += 1;
             clearArc(x, y, radius);
           }
         }
       },
       // 手指松开
       end () {
         console.log('end', this.password)
         if (this.createPassword.length === 0) { // 创建密码的第一次
           if(this.password.length >= 4) {
             this.tips = false
             // 此时再调用一次paint，传undefined, undefined,避免最后一条多余的线出现
             this.paint(undefined, undefined, true)
             // 不变红
             this.redStyle = false
             this.createPassword = this.password
             this.$emit('firstDown', {success: true})
             // 500ms后清空样式
             console.log('第一次设置密码createPassword：', this.createPassword)
             console.log('第一次设置密码password：', this.password)
             setTimeout(() => {
               this.password = []
               this.cas.clearRect(0,0,this.clientWidth,this.clientHeight);
             }, 500)
           } else if(this.password.length < 4 && this.password.length !== 0) {
             console.log('创建密码时长度小于4')
             this.tips = true
             this.paint(undefined, undefined, false)
             // 长度小于4样式为红色
             this.redStyle = true
             // 清空画布，颜色变正常，不然下次输入还是红色
             setTimeout(() => {
               this.password = []
               this.cas.clearRect(0,0,this.clientWidth,this.clientHeight);
               this.redStyle = false // 颜色变蓝，不然下次输入还是红色
             }, 500)
           }
         } else { // 创建密码的第二次 或者 登录，不管是啥反正都是拿password和createPassword（第一次输入的密码或者父组件传过来的密码）比较
           console.log('createPassword.length不为0，进入密码比较环节')
           console.log('createPassword:', this.createPassword)
           console.log('password:', this.password)
           if (this.password.toString() === this.createPassword.toString()) {
             this.tips = false
             // 设置/登录成功
             console.log('设置/登录成功')
             this.$store.commit('getCreatePassword', this.createPassword);
            //  this.$emit('onDrawDone', {success: true, pwd: this.password})
             setTimeout(() => {
               this.password = []
               this.cas.clearRect(0,0,this.clientWidth,this.clientHeight);
               this.redStyle = false // 没true好像就可以没有false，加上吧保险一点
             }, 500)
           } else if(this.password.length !== 0){ // 两次输入不一致/密码不正确    这里写this.password.length !== 0是为了防止点一下canvas也会出现输入错误的提示
             this.tips = true
             this.paint(undefined, undefined, false)
             // 两次输入不一致/密码不正确 样式为红色
             this.redStyle = true // 有true下面必得有false
             console.log('失败')
             // 清空画布，颜色变蓝
             setTimeout(() => {
               this.password = [] // 还有蓝色是因为前几个存在于那个数组，得把password清空
               this.cas.clearRect(0,0,this.clientWidth,this.clientHeight);
               this.redStyle = false
               console.log(this.redStyle)
             }, 500)
           }
         }
       }
    },

     mounted() {
     // 获取到的是每个方块中心i标签的位置，
        for (let i = 0; i < this.$refs.selectLiO.length; i++) {
          this.left.push(this.$refs.selectLiO[i].getBoundingClientRect().left)
          this.top.push(this.$refs.selectLiO[i].getBoundingClientRect().top)
        }
        this.radius = this.$refs.selectLiO[0].getBoundingClientRect().left - this.$refs.selectLi[0].getBoundingClientRect().left
        console.log('半径为：', this.radius)
        console.log(this.left)
        console.log(this.top)
        this.clientWidth = document.documentElement.clientWidth
        this.clientHeight = document.documentElement.clientHeight
        console.log('设备宽高：', this.clientWidth, this.clientHeight)
        this.cas = document.getElementById('canvas').getContext('2d');
        document.getElementById('canvas').width = this.clientWidth;
        // canvas高度为最后一个圆的圆心加半径乘以1.5，就是大于最后一行多一点
        document.getElementById('canvas').height = this.top[this.top.length-1] + this.radius*1.5;
        // this.casClearTop = document.getElementById('canvasClearTop').getContext('2d');
        // document.getElementById('canvasClearTop').width = this.clientWidth;
        // document.getElementById('canvasClearTop').height = this.top[0] - this.radius*1.5;
  },
  created() {
   // 存一下父组件传过来的fatherPassword，因为子组件不能直接修改父组件传过来的值
        // this.createPassword = this.fatherPassword
  },
  computed: {
   
  }
}
</script>

<style lang="less" scoped>
.incorrectTip{
     height: .5rem;
     span{
       /*line-height: .8rem;*/
       color: #ff4b4b;
     }
   }
   .TeaGestureUnlock{
     margin: 0 auto;
   }
   .gesture{
     margin: 1.0rem auto 0;
     ul{
       margin: auto;
       display: flex;
       width: 8.88rem;
       height: 8.88rem;
       justify-content: space-between;
       align-content: space-between;
       flex-wrap: wrap;
       li{
         display: flex;
         align-items:center;
         justify-content:center;
         margin: 0.45rem 0.45rem;
         border-radius: 50%;
         width: 1.2rem;
         height: 1.2rem;
         border: 0.08rem solid #e0e0e0;
         /*宽度是1.2rem,边框是0.08rem,所以半径是0.68rem,1rem=37.5px，所以0.68x37.5 = 25.5px*/
         span{
           display: flex;
           align-items:center;
           justify-content:center;
           width: 0.40rem;
           height: 0.40rem;
           border-radius: 50%;
           i{
             display: inline-block;
             width: 1px;
             height: 1px;
           }
         }
       }
       /*被选中的样式*/
       .selectedOuter{
         border: 0.08rem solid #498bcb;
         .selectedInside{
           background: #498bcb;
         }
       }
       .selectedOuter2{
         border: 0.08rem solid #ff4b4b;
         .selectedInside2{
           background: #ff4b4b;
         }
       }
     }
   }
   .canvasDiv{
     position: fixed;
     top:0;
     left: 0;
     // background: rgba(0,0,0,0.1);
     z-index: 100;
     #canvasClearTop{
       position: absolute;
       top: 0;
       left: 0;
       background: rgba(255,0,0,0.2)
     }
   }
</style>