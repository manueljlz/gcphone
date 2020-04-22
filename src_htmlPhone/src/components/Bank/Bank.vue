<template>
  <div style="width: 326px; height: 743px;" class="screen">
    
    
    <div class='elements'>
      <InfoBare style="width: 326px;top: -207px;margin-left: -17px;"/>
      <img class="logo_maze" src="/html/static/img/app_bank/fleeca_tar.png">
      <div class="num-tarj" >
        <span  class="moneyTitle">{{ IntlString('APP_BANK_TITLE_BALANCE') }}</span>
        <span class="moneyTitle">{{ bankAmontFormat }}$</span>
      </div>
      
      <div class="hr"></div>
      
      <div class='element'>
        <div class="element-content">
          
        </div>

        <div class="element-content" ref="form"> 
          <input style=" border-radius: 23px; font-size: 16px;" v-bind:class="{ select: 0 === currentSelect}" v-autofocus oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" ref="form0" v-model="id" class="paragonder" placeholder="ID">
        </div> 

        <div class="element-content">           
          <input  style=" border-radius: 23px; font-size: 16px;" v-bind:class="{ select: 1 === currentSelect}" oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" ref="form1" v-model="paratutar" class="paragonder" placeholder="$">
          <button  v-bind:class="{ select: 2 === currentSelect}" ref="form2" id="gonder" @click.stop="paragonder" class="buton-transfer">{{ IntlString('APP_BANK_BUTTON_TRANSFER') }}</button><br/>
          <button  v-bind:class="{ select: 3 === currentSelect}" ref="form3" id="iptal" @click.stop="iptal" class="buton-cancel">{{ IntlString('APP_BANK_BUTTON_CANCEL') }}</button>
        </div>
        
      </div>
      
    </div>
    <img class="logo_tarj_end" src="/html/static/img/app_bank/tarjetas.png">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfoBare from '../InfoBare'
export default {
  components: {
    InfoBare
  },
  data () {
    return {
      id: '',
      paratutar: '',
      currentSelect: 0
    }
  },
  methods: {
    ...mapActions(['sendpara']),
    scrollIntoViewIfNeeded: function () {
      this.$nextTick(() => {
        document.querySelector('focus').scrollIntoViewIfNeeded()
      })
    },
    onBackspace () {
      this.$router.go(-1)
    },
    iptal () {
      // this.$router.push({path: '/messages'})
      this.$router.go(-1)
    },
    paragonder () {
      const paratutar = this.paratutar.trim()
      if (paratutar === '') return
      this.paratutar = ''
      this.sendpara({
        id: this.id,
        amount: paratutar
      })
    },
    onUp: function () {
      if ((this.currentSelect - 1) >= 0) {
        this.currentSelect = this.currentSelect - 1
      }
      this.$refs['form' + this.currentSelect].focus()
      console.log(this.currentSelect)
    },
    onDown () {
      if ((this.currentSelect + 1) <= 3) {
        this.currentSelect = this.currentSelect + 1
      }
      this.$refs['form' + this.currentSelect].focus()
      console.log(this.currentSelect)
    },
    onEnter () {
      if (this.ignoreControls === true) return
      if (this.currentSelect === 2) {
        this.paragonder()
      } else if (this.currentSelect === 0) {
        this.$phoneAPI.getReponseText().then(data => {
          let message = data.text.trim()
          this.id = message
        })
      } else if (this.currentSelect === 1) {
        this.$phoneAPI.getReponseText().then(data => {
          let message = data.text.trim()
          this.paratutar = message
        })
      } else if (this.currentSelect === 3) {
        this.iptal()
      }
    }
  },
  computed: {
    ...mapGetters(['bankAmont', 'IntlString']),
    bankAmontFormat () {
      return Intl.NumberFormat().format(this.bankAmont)
    }
  },
  created () {
    this.display = this.$route.params.display
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpEnter', this.onEnter)
    }
    this.$bus.$on('keyUpBackspace', this.onBackspace)
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
    this.$bus.$off('keyUpBackspace', this.onBackspace)
  }
}
</script>

<style scoped>
.screen{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 18px;
  background-color: white;
}

.num-tarj{
 margin-top: -88px; 
 margin-left: 50px
}

.moneyTitle{
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-weight: 200;
    color: white;
        font-size: 16px;
}



.title{
  padding-left: 16px;
  height: 34px;
  line-height: 34px;
  font-weight: 700;
  color: white;
  background-color: rgb(76, 175, 80);
}
.elements{
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
.hr{
  width: 100;
  height: 4px;
  margin-top: 73px;
  background-image: linear-gradient(to right, #a9cc2e, #7cb732, #3a5d0d);  
}
.logo_maze {
  width: 100%; 
  height: auto;
  flex-shrink: 0;
  
  width: 113%;
  margin-left: -18px;
  margin-top: -207px
}

.logo_tarj_end {
  width: 100%; 
  height: auto;
  flex-shrink: 0;
  
  width: 113%;
  margin-left: -18px;
  margin-top: -57px
}

.element-content{
  margin-top: 24px;
  display: block; 
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: black;
  
}
.paragonder{
    display: block;
       
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-weight: 300;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.buton-transfer{
  border: none;
  width: 220px;
  color: #fff;
   background-image: linear-gradient(to right, #a9cc2e, #7cb732, #3a5d0d); 
    padding: .5rem 1rem;
    font-size: 17px;
    line-height: 1.5;
    margin-top: 1.25rem;
    font-weight: 300;
    margin-bottom: .25rem;
    cursor: pointer;
    border-radius: 1.3rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    text-transform: none;
}

.buton-cancel{
  border: none;
  width: 220px;
  color: #fff;
  background-image: linear-gradient(to right, #D3D3D3, #C5C5C5 , #B6B6B6); 
  padding: .5rem 1rem;
  font-size: 17px;
  line-height: 1.5;
  margin-top: 1.25rem;
  font-weight: 300;
  margin-bottom: .25rem;
  cursor: pointer;
  border-radius: 1.3rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  text-transform: none;
}
.select{
  border: 1px double #7cb732;
}
</style>
