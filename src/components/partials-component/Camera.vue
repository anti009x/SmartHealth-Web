<template>
  <div class="container-fluid">
    <div class="row">
      <div class="camera-box">
        <div style="display: flex; justify-content: center; background-color: rgb(210, 209, 212)">
          <i :class="'text-success ' + icon" v-if="isCameraOpen" @click="capture"></i>

          <div class="camera-button">
            <button
              type="button"
              class="button is-rounded cam-button"
              style="margin-left: 5%; background-color: rgb(241, 241, 241); border: 0px"
              @click="toggleCamera"
            >
              <span v-if="!isCameraOpen"
                >Open Camera <br /><i :class="'text-success ' + icon"></i
              ></span>
              <span v-else><i class="fa-solid fa-circle-xmark"></i></span>
            </button>
          </div>
        </div>
        <div style="display: flex; height: 600px; justify-content: center">
          <div v-if="isCameraOpen" class="camera-canvas">
            <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
            <canvas
              id="photoTaken"
              ref="canvas"
              :width="canvasWidth"
              :height="canvasHeight"
            ></canvas>
              <pre v-if="result && percentage">
    Hasil: {{ result }}
    Persentase: {{ percentage }}%
  </pre
              >
            

            <!-- Display the captured image -->
            <!-- <img v-if="isPhotoTaken" :src="capturedImage" alt="Captured Image" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import izitoast from 'izitoast'
export default {
  props: {
    icon: {
      type: String
    }
  },
  name: 'Camera',

  data() {
    return {
      isCameraOpen: false,
      canvasHeight: 320,
      canvasWidth: 430,
      isPhotoTaken: false,
      capturedImage: null,
      items: [],
      result: null,
      percentage: null
    }
  },
  methods: {
    async uploadPhoto(dataURL) {
      // this.result = null
      // this.percentage = null

      try {
        let uniquePictureName = this.generateUniquePictureName()
        let capturedPhotoFile = this.dataURLtoFile(dataURL, uniquePictureName + '.jpg')
        let formData = new FormData()
        formData.append('file', capturedPhotoFile)

        // Make the POST request using Axios
        let response = await axios.post(
          'https://api.rafliseptiannn25.web.ti.polindra.ac.id/smarthealth_api/public/api/send-stroke-face ',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        if (response.status === 200) {
          // Handle the successful response
          console.log(JSON.parse(response.data.response))

          let data = JSON.parse(response.data.response)

          this.result = data.message
          this.percentage = data.percentage

          izitoast.success({
            icon: 'success',
            title: 'Berhasil upload foto',
            position: 'topRight'
          })
        } else {
          // Handle any errors
          console.error('File upload failed:', response.status, response.data)
          izitoast.error({
            icon: 'error',
            title: 'Gagal upload foto',
            position: 'topRight'
          })
        }
      } catch (error) {
        console.error('An error occurred while uploading the file:', error)
        izitoast.error({
          icon: 'error',
          title: 'Gagal upload foto',
          position: 'topRight'
        })
      }
    },

    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.startCameraStream()
      }
    },
    startCameraStream() {
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream
        })
        .catch((error) => {
          alert("Browser doesn't support or there is some errors" + error)
        })
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
    },
    capture() {
      const FLASH_TIMEOUT = 50
      let self = this
      setTimeout(() => {
        const context = self.$refs.canvas.getContext('2d')
        context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight)
        const dataUrl = self.$refs.canvas.toDataURL('image/jpeg')
        // .replace('image/jpeg', 'image/octet-stream')

        self.addToPhotoGallery(dataUrl)
        self.uploadPhoto(dataUrl)

        // izitoast.success({
        //   icon: 'success',
        //   title: 'berhasil upload foto',
        //   position: 'topRight'
        // })

        // Display the captured image
        self.isPhotoTaken = true
        self.capturedImage = dataUrl

        console.log(self.capturedImage)

        self.isCameraOpen = true
        self.startCameraStream()
      }, FLASH_TIMEOUT)
    },

    addToPhotoGallery(dataURI) {
      this.items.push({
        src: dataURI,
        thumbnail: dataURI,
        w: this.canvasWidth,
        h: this.canvasHeight,
        alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
      })
    },
    uploadPicture(dataUrl) {
      let name = this.generateUniquePictureName()
      let capturedFile = this.dataUrlToFile(dataUrl, name)
      let formData = new FormData()
      formData.append('file', capturedFile)

      console.log('File : ', capturedFile)
    },
    generateUniquePictureName() {
      return Math.random().toString(36).substring(2, 15)
    },
    dataURLtoFile(dataUrl, filename) {
      // Split the dataURL into parts
      const parts = dataUrl.split(',')

      // Check if there are at least two parts (MIME type and data)
      if (parts.length >= 2) {
        const mimePart = parts[0]

        // Use a regular expression to extract the MIME type
        const match = mimePart.match(/data:([^;]+)/)

        if (match) {
          const mime = match[1]
          const bstr = atob(parts[1])
          const n = bstr.length
          const u8arr = new Uint8Array(n)

          for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i)
          }

          // Create a File object with the extracted MIME type
          return new File([u8arr], filename, { type: mime })
        }
      }

      // Handle the case where there is no valid MIME type
      console.error('No valid MIME type found in dataURL:', dataUrl)
      return null // or throw an error, depending on your use case
    }
  }
}
</script>

<style scoped>
.camera-box {
  border: 1px dashed #d6d6d6;
  border-radius: 4px;
  padding: 2px;
  width: 80%;
  min-height: 300px;
}
</style>
