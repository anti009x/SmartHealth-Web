<template>
  <div class="container-fluid">
    <div class="row">
      <div style="padding-top: 70px" class="camera-box">
        <div class="analisis" v-if="!isCameraOpen">
          <img src="../../assets/images/face-detection.png" alt="face-detection" />
          <h5><b>Skin Analyzer</b></h5>
          <p>
            Gejala stroke salah satunya ditandai dengan ketidaksimetrisan pada wajah. Analisa
            sekarang untuk mengenali tanda!
          </p>
          <h6>
            <b><u>Disclaimer</u></b> <br />
            <span>
              <i class="fa-solid fa-circle-exclamation"></i> Test ini bukan bertujuan untuk
              mendiagnosis secara klinik atau memberikan anjuran medis.
            </span>
          </h6>
        </div>

        <div style="display: flex">
          <div v-if="!isCameraOpen" class="d-grid gap-2 col-6 mx-auto">
            <button type="button" class="btn btn-primary" style="border: 0px" @click="toggleCamera">
              <span>ASESMEN <i class="fa-solid fa-camera"></i></span>
            </button>
          </div>
          <div
            v-if="isCameraOpen"
            class="btn-group mx-auto"
            role="group"
            aria-label="Basic example"
          >
            <button type="button" class="btn btn-warning">
              <span><i class="fa-solid fa-camera" v-if="isCameraOpen" @click="capture"></i></span>
            </button>
            <button type="button" class="btn btn-danger" @click="toggleCamera">
              <span v-if="isCameraOpen"><i class="fa-solid fa-circle-xmark"></i></span>
            </button>
          </div>
        </div>
        <div
          style="display: flex; height: auto; justify-content: center"
          class="camera-canvas m-3 p-3"
        >
          <div v-if="isCameraOpen">
            <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
            <canvas
              id="photoTaken"
              ref="canvas"
              :width="canvasWidth"
              :height="canvasHeight"
            ></canvas>
            <!-- <img
              src="../../assets/images/facial-paralyse.jpg"
              style="width: 430px; height: 320px"
            />
            <p>Deskripsi : Terindikasi Stroke</p>
            <p>Kecenderungan : 96%</p> -->

            <pre v-if="result !== null && percentage !== null">
              Deskripsi: {{ result }}
              Kecenderungan: {{ percentage }}%
            </pre>
            <!-- Display the captured image -->
            <!-- <img v-if="isPhotoTaken" :src="capturedImage" alt="Captured Image" /> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <img v-if="isPhotoTaken" :src="capturedImage" alt="Captured Image" /> -->
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
  // eslint-disable-next-line vue/multi-word-component-names
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
        let response = await axios.post('http://127.0.0.1:8000/api/send-stroke-face', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response.status === 200) {
          // Handle the successful response
          // console.log(JSON.parse(response.data.response))

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

        // console.log(self.capturedImage)

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
  width: 100%;
  min-height: 300px;
}
.analisis {
  padding-top: 30px;
}

img {
  width: 197px;
  height: 197px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
h5,
h6,
p {
  text-align: center;
  padding-right: 10px;
}
.fa-circle-check {
  font-size: initial;
  text-transform: none;
}
span {
  font-size: x-small;
}
.center {
  margin: 0;
  position: relative;
  left: 50%;
}
</style>
