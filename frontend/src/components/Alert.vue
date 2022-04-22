<template>
  <q-dialog>
    <q-card class="bg-negative text-cyan-1">

      <!-- Alert title -->
      <q-card-section>
        <q-icon id="warning_icon" name="warning" />
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <!-- Delete task alert dialog -->
      <span v-if="taskId && showDeleteTaskAlert">
        <!-- Message for delete task  -->
        <q-card-section class="q-pt-none">
          {{ message }}
          <span id="current_task_span">{{ taskId }}</span> ?
        </q-card-section>
        <!-- Yes/No section for delete task -->
        <q-card-actions v-if="yes_no_section" align="right">
          <q-btn flat class="text-weight-bold" label="Yes" color="warning" @click="$emit('confirmDeletingTask')"
            v-close-popup />
          <q-btn class="text-weight-bold" flat label="No" v-close-popup />
        </q-card-actions>
      </span>

      <!-- Delete user alert dialog -->
      <span v-if="userId && showDeleteUserAlert">
        <!-- Message for delete user  -->
        <q-card-section class="q-pt-none">
          {{ message }}
          <span id="current_user_span">{{ userId }}</span> ?
        </q-card-section>
        <!-- Yes/No section for delete user -->
        <q-card-actions v-if="yes_no_section" align="right">
          <q-btn flat class="text-weight-bold" label="Yes" color="warning" @click="$emit('confirmDeletingUser')"
            v-close-popup />
          <q-btn class="text-weight-bold" flat label="No" v-close-popup />
        </q-card-actions>
      </span>

      <!-- File size alert dialog -->
      <span v-if="showFileSizeAlert">
        <!-- Message for file exceeded file size limit -->
        <q-card-section class="q-pt-none">
          {{ message }} <span id="file_size_span">{{ fileSize }} MB !</span>
        </q-card-section>
      </span>

    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    yes_no_section: {
      type: Boolean,
      required: false
    },
    showDeleteTaskAlert: {
      type: Boolean,
      required: false
    },
    showFileSizeAlert: {
      type: Boolean,
      required: false
    },
    showDeleteUserAlert: {
      type: Boolean,
      required: false
    },
    taskId: {
      type: String,
      required: false
    },
    userId: {
      type: String,
      required: false
    },
    fileSize: {
      type: Number,
      required: false
    }
  },
}
</script>

<style scoped>
#current_task_span,
#current_user_span,
#file_size_span {
  display: inline-block;
  margin-left: 3px;
  margin-right: 3px;
}

#current_task_span,
#current_user_span,
#file_size_span {
  font-weight: bold;
}

#current_task_span,
#current_user_span {
  text-decoration: underline;
}

#warning_icon {
  font-size: 26px;
  margin-right: 10px;
  color: #d4db0a;
}

.q-card__section {
  display: flex;
}
</style>
