<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="URL of profile image"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="New password"
                />
              </fieldset>
              <span class="span">
                <button
                  type="submit"
                  class="btn btn-lg btn-primary pull-xs-right colored"
                  :disabled="isSubmitting"
                >
                  Update settings
                </button>
                <p v-if="isUpdated" class="settings__p">Successfully</p>
              </span>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout" type="text">
            Or cick here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
} from "@/store/modules/auth.js";
import McvValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: "McvSettings",
  components: {
    McvValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: "",
      };
    },
  },
  data() {
    return {
      isUpdated: false,
    };
  },
  watch: {
    isUpdated: () => {},
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(authActionTypes.updateCurrentUser, {
          currentUserInput: this.form,
        })
        .then((result) => {
          if (result) {
            this.isUpdated = true;
            setTimeout(() => {
              this.isUpdated = false;
            }, 2000);
          }
        });
    },
    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({ name: "globalFeed" });
      });
    },
  },
};
</script>

<style scoped>
.colored {
  background-color: #b22cff !important;
  border-color: #b22cff !important;
}
.colored:focus {
  outline: none;
}
.colored:active {
  background-color: #9711d1 !important;
  border-color: #9711d1 !important;
}
.span {
  position: relative;
}
.settings__p {
  color: #5cb85c;
  position: absolute;
  font-size: 1.25rem;
  top: 0.6rem;
  left: 14.5rem;
}
</style>
