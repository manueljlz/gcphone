<template>
  <div>
    <list :list='callList' :showHeader="false" :disable='ignoreControls' v-on:select="onSelect"></list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from './../List.vue'
import Modal from '@/components/Modal/index.js'

export default {
  name: 'Favoris',
  components: { List },
  data () {
    return {
      ignoreControls: false
    }
  },
  computed: {
    ...mapGetters(['config']),
    callList () {
      return this.config.serviceCall || []
    }
  },
  methods: {
    onSelect (itemSelect) {
      if (this.ignoreControls === true) return
      this.ignoreControls = true
      Modal.CreateModal({choix: [...itemSelect.subMenu, {title: 'Cancelar'}]}).then(rep => {
        this.ignoreControls = false
        if (rep.title === 'Cancelar') return
<<<<<<< HEAD
        /* this.$phoneAPI.callEvent(rep.eventName, rep.type)
        this.$router.push({name: 'home'}) */
        this.$router.push({ name: 'messages.view', params: { number: itemSelect.subMenu[0].type.number, display: itemSelect.display } })
=======
        this.$phoneAPI.callEvent(rep.eventName, rep.type)
        this.$router.push({name: 'home'})
>>>>>>> e0c28121a5540c72683e33db0da6c0191c695f14
      })
    }
  },

  created () {
  },

  beforeDestroy () {
  }
}
</script>

<style scoped>

</style>
