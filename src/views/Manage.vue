<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <app-upload ref="upload" :addSong="addSong" />
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <song-item
                v-for="(song, i) in songs"
                :key="song.docID"
                :song="song"
                :i="i"
                :editSong="editSong"
                :removeSong="removeSong"
                :changeUnsavedFormFlag="changeUnsavedFormFlag"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppUpload from '@/components/Upload.vue'
import SongItem from '@/components/CompositionItem.vue'
import { songsCollenction, auth } from '@/includes/firebase'

export default {
  name: 'Manage',
  data() {
    return {
      songs: [],
      unsavedFormFlag: false
    }
  },
  components: {
    AppUpload,
    SongItem
  },
  methods: {
    editSong(index, values) {
      this.songs[index].modified_name = values.modified_name
      this.songs[index].genre = values.genre
    },
    removeSong(index) {
      this.songs.splice(index, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id
      }

      this.songs.push(song)
    },
    changeUnsavedFormFlag(value) {
      this.unsavedFormFlag = value
    }
  },
  async created() {
    const snapshot = await songsCollenction.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach((document) => {
      this.addSong(document)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFormFlag) {
      next()
    } else {
      const leave = confirm('You have unsaved changes. Are you sure to leave the page?')
      next(leave)
    }
  }
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUpload()
  //   next()
  // }
  //   beforeRouteEnter(to, from, next) {
  //     console.log('beforeRouteEnter Guard')

  //     const store = useUserStore()

  //     if (store.userLoggedIn) {
  //       next()
  //     } else {
  //       next({ name: 'home' })
  //     }
  //   }
}
</script>
