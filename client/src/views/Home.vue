<template>
  <div class="home">
    <div class="mobile-container">
      <div class="mobile-status-bar">
        <div class="left-status">
          <p>9.00</p>
        </div>
        <div class="right-status">
          <i class="fas fa-signal"></i>
          <i class="fas fa-wifi"></i>
          <i class="fas fa-battery-full"></i>
        </div>
      </div>
      <div class="mobile-header">
        <h5>Ghibah</h5>
      </div>
      <div class="mobile-body">
        <p>Welcome To Ghibah App</p>
      </div>
      <form @submit.prevent="login" class="mobile-footer">
        <input v-model="username" type="text" placeholder="enter your name" autofocus>
        <i class="fas fa-paper-plane"></i>
      </form>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Home',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    login () {
      localStorage.setItem('username',this.username)
      let data = {
        name: this.username
      }
      socket.emit('user-connect', data)
      this.$router.push('/chat')
    }
  },
  created () {
    
  }
}
</script>

<style scoped>
.home {
  background-image: url(../assets/bg1.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-container {
  width: 450px;
  height: 600px;
  background-color: #e9ecf5;
  border-radius: 10px !important;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px #f8f8fa;
}

.mobile-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5%;
  padding: 10px;
  box-sizing: border-box;
}

.left-status p {
  font-size: 15px;
}

.right-status i {
  margin: 0 2px;
  font-size: 12px;
}

.mobile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  height: 5%;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f3f5;
  font-size: 25px;
}

.mobile-body {
  background-image: url(../assets/gosip.png);
  background-color: white;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 80%;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.mobile-body p {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
}

.mobile-footer {
  height: 10%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-footer input {
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 80%;
  text-indent: 10px;
}

.mobile-footer i {
  margin-left: 5px;
}
</style>
