<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <!-- <McvValidationErrors v-if="errors" :validation-errors="errors" /> -->
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Comment"
                  v-model="textComment"
                />
              </fieldset>

              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish Comment
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import McvValidationErrors from "@/components/ValidationErrors.vue";
export default {
  name: "McvCraeteComment",
  //   props: {
  //     initialValues: {
  //       type: Object,
  //       required: true,
  //     },
  //     errors: {
  //       type: Object,
  //       required: false,
  //     },
  //     isSubmitting: {
  //       type: Boolean,
  //       required: true,
  //     },
  //   },
  components: {},
  data() {
    return {
      textComment: "",
    };
  },
  methods: {
    // onSubmit() {};
  },
};
</script>
