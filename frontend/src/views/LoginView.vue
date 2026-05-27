<template>
  <section class="page">
    <h1>{{ mode === "login" ? "Login" : "Sign Up" }}</h1>

    <form @submit.prevent="submit" class="form">
      <div v-if="mode === 'signup'" class="form-controls">
        <label>Name</label>
        <input type="text" v-model="name" class="input-control"/>
      </div>

      <div class="form-controls">
        <label>Email</label>
        <input type="email" v-model="email" />
        <button type="button" @click="sendOtp" v-if="mode === 'signup'">
          Send OTP
        </button>
      </div>
      <div v-if="otpSent" >
        <div v-if="mode === 'signup'" class="form-controls">
        <label>OTP</label>
        <input type="password" v-model="otp" />
        <button type="button" @click="verifyOtp">Verify OTP</button>
      </div>
      </div>
      <div class="form-controls" v-if="(mode==='signup' && emailVerified===true) || mode==='login'">
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>

      <button type="submit">
        {{ mode === "login" ? "Login" : "Sign Up" }}
      </button>

      <button type="button" @click="switchMode">
        {{ mode === "login" ? "Create account" : "Already have an account?" }}
      </button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  emits: ["login-success"],

  data() {
    return {
      mode: "login",
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      successMessage: "",
      otp: null,
      emailVerified: false,
      otpSent: false
    };
  },

  methods: {
    async sendOtp() {
      try {
        this.errorMessage = "";
        this.successMessage = "";
        if (!this.email.includes("@")) {
          this.errorMessage = "Enter a valid email first";
          return;
        };
        const response = await axios.post("http://localhost:5000/auth/send-otp", {
          email: this.email});
          console.log(response);
          this.successMessage = response.data.message;
          this.otpSent=true

      } catch (err) {
        this.errorMessage = "Failed to send otp";
      }
    },
    async verifyOtp() {
      try {
        this.errorMessage = "";
        this.successMessage = "";
        const response = await axios.post(
          "http://localhost:5000/auth/verify-otp",
          {
            email: this.email,
            otp: this.otp,
          }
        );
        if (response.data.message === "Success") {
          this.emailVerified = true;
          this.successMessage = "Email verified successfully.";
        }
      } catch (Err) {
        this.errorMessage = "OTP verification failed";
      }
    },
    async submit() {
      this.errorMessage = "";
      this.successMessage = "";

      if (!this.email.includes("@") || this.password.length < 6) {
        this.errorMessage =
          "Enter a valid email and password of at least 6 characters.";
        return;
      }
      if(this.mode==="signup" && !this.emailVerified){
        this.errorMessage="please verify your email before signing up";
        return;
      }
      if (this.mode === "signup" && this.name.trim() === "") {
        this.errorMessage = "Name is required.";
        return;
      }

      const url =
        this.mode === "login"
          ? "http://localhost:5000/auth/login"
          : "http://localhost:5000/auth/signup";

      const body =
        this.mode === "login"
          ? {
              email: this.email,
              password: this.password,
            }
          : {
              name: this.name,
              email: this.email,
              password: this.password,
            };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        localStorage.setItem("token", data.accessToken);

        this.successMessage = data.message;
        this.$emit("login-success");

        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));

        if (payload.role === "admin") {
          this.$router.push("/admin");
        } else {
          this.$router.push("/home");
        }
      } catch (err) {
        this.errorMessage = err.message;
      }
    },

    switchMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
      this.errorMessage = "";
      this.successMessage = "";
    },
  },
};
</script>

<style scoped>
label{
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem
}
input{
  display: block;
  width: 100%;
  font:inherit;
  padding: 0.15rem;
  height: 30px;
}
button{
  display: block;
  margin-top: 0.5rem;
  background-color: #222;
  color: white;
}
</style>