<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        class="text-white font-bold text-center p-4 rounded mb-4"
        :class="alert_variant"
      >
        {{ alert_msg }}
      </div>
      <vee-form :validation-schema="songSchema" :intial-values="song" @submit="upadateSong">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            :value="song.modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="changeUnsavedFormFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            :value="song.genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="changeUnsavedFormFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="form_in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="form_in_submission"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollenction, storage } from '@/includes/firebase'

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    editSong: {
      type: Function,
      required: true
    },
    i: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    changeUnsavedFormFlag: {
      type: Function
    }
  },
  data() {
    return {
      showForm: false,
      songSchema: {
        modified_name: 'required',
        genre: 'alpha_spaces'
      },
      form_in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_msg: 'Please wait! We are updating information.'
    }
  },
  methods: {
    async upadateSong(values) {
      this.show_alert = true
      this.form_in_submission = true
      this.alert_variant = 'bg-blue-500'
      this.alert_msg = 'Please wait! We are updating information.'

      try {
        await songsCollenction.doc(this.song.docID).update(values)
      } catch (error) {
        this.form_in_submission = false
        this.alert_variant = 'bg-red-500'
        this.alert_msg = 'Something went wrong!'
        console.log(error)
        return
      }

      this.form_in_submission = false
      this.alert_variant = 'bg-green-500'
      this.alert_msg = 'Success!'
      this.editSong(this.i, values)

      this.changeUnsavedFormFlag(false)
    },
    async deleteSong() {
      console.log('delete song')
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)

      await songRef.delete()

      await songsCollenction.doc(this.song.docID).delete()

      this.removeSong(this.i)
    }
  }
}
</script>
