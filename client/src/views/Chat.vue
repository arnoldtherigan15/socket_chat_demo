<template>
  <div class="chat">
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
        <h3>Online Users</h3>
        <div class="online-user-container">
          <div v-for="user in users" :key="user.name" class="online-user">
            <img :src="ava+user.name" alt="avatar">
            <i class="fas fa-circle"></i>
            <p>{{user.name}}</p>
          </div>
        </div>
        <!-- message -->
        <div class="message-box">
          <div v-for="msg in messages" :key="msg.name" class="sender">
            <div class="sender-text">
              <p>{{ msg.message }}</p>
            </div>
            <div class="sender-image">
              <img class="ava" :src="ava+msg.name" alt="avatar">
              <p>{{ msg.name }}</p>
            </div>
          </div>
          <!-- is typing -->
          <div v-if="isType" class="isTyping">
            <img class="ava" :src="ava+isTypeName" alt="avatar">
            <p>{{isTypeName}} is typing</p>
            <img src="../assets/loading.gif" alt="loading">
          </div>
        </div>
      </div>
      <form @submit.prevent="send" class="mobile-footer">
        <input v-model="message" type="text" placeholder="enter your name" autofocus>
        <i class="fas fa-paper-plane"></i>
      </form>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Chat',
  data () {
    return {
      users: [],
      message: '',
      ava: 'https://api.adorable.io/avatars/285/',
      messages: [],
      isType: false,
      isTypeName : ''
    }
  },
  methods: {
    send() {
      let data = {
        name: localStorage.username,
        message: this.message
      }
      socket.emit('send-message', data)
      this.message = ''
    }
  },
  watch: {
    message (val) {
      if (val) {
        let data = {
          name: localStorage.username
        }
        socket.emit('typing-start', data)
      } else {
        socket.emit('typing-stop')
      }
    }
  },
  created () {
    socket.on('user-connect', (data) => {
      this.users = data
    })
    socket.on('send-message', (data) => {
      this.messages = data
    })
    socket.on('typing-start', (data) => {
      this.isType = true
      this.isTypeName = data.name
    })
    socket.on('typing-stop', () => {
      this.isType = false
    })
  }
}
</script>

<style scoped>
.chat {
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
  background-color: white;
  height: 80%;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}

.mobile-body p {
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 20px;
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

.online-user {
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.online-user img {
  width: 50px;
  border-radius: 100%;
  margin: 0;
}
.online-user p {
  margin: 0;
}

.online-user i {
  color: #7dd926;
  font-size: 10px;
  position: relative;
  top: -10px;
  left: 15px;
}

.online-user-container {
  display: flex;
  overflow-x: scroll;
}

::-webkit-scrollbar {
  width: 5px;
  height: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

.message-box {
  padding: 10px;
  /* background-color: red; */
  height: 72%;
  overflow-y: auto;
}

.sender {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  background-color: #f2f2f4;
  border-radius: 10px;
  padding: 10px;
}

.sender .ava {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0 10px;
}
.sender-image {
  display: flex;
  justify-content: flex-end;
}

.receiver {
  background-color: #ee4853;
  border-radius: 10px 0 10px 10px;
  color: white;
  padding: 10px;
}

.isTyping {
  display: flex;
}

.isTyping img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0 10px;
}
</style>
