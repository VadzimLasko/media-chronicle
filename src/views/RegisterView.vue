<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <!-- <router-link :to="{ name: 'login' }">
              Need an account?
            </router-link> -->
          </p>
          <McvValidationErrors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import McvValidationErrors from "@/components/ValidationErrors";
  export default {
    name: "RegisterView",
    components: {
      McvValidationErrors,
    },
    computed: {
      isSubmitting() {
        return this.$store.state.auth.isSubmitting;
      },
      validationErrors() {
        return this.$store.state.auth.validationErrors;
      },
    },
    data() {
      return {
        username: "",
        email: "",
        password: "",
        errors: [],
      };
    },
    methods: {
      onSubmit() {
        console.log("Form submitted", this.username, this.email, this.password);
        this.$store
          .dispatch("register", {
            email: this.email,
            username: this.username,
            password: this.password,
          })
          .then((user) => {
            console.log("Successfully register user", user);
            this.$router.push({ name: "home" });
          });
      },
    },
  };
</script>
