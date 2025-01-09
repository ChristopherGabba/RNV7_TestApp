import { SafeAreaView, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { useVideoPlayer, VideoView } from "expo-video"
import { Video } from "react-native-compressor"
import { uploadData } from "aws-amplify/storage"

export const UploadScreen = () => {
  const [videoResult, setVideoResult] = useState<ImagePicker.ImagePickerAsset>()
  const [uploading, setUploading] = useState(false)
  const [compressionEnabled, setCompressionEnabled] = useState(true)

  const openImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      preferredAssetRepresentationMode:
        ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Current,
    })

    if (!result.canceled) {
      setVideoResult(result.assets[0])
    }
  }

  const uploadWithoutCompression = async () => {
    if (!videoResult) return
    const inputFilePath = videoResult.uri
    setUploading(true)
    try {
      const response = await fetch(inputFilePath)
      const data = await response.blob()

      await uploadData({
        path: `public/testVideo.mp4`,
        data,
        options: {
          contentType: "video/mp4",
        },
      }).result

      setVideoResult(undefined)
      alert("Upload successful")
    } catch (error) {
      alert("Upload failed because:" + JSON.stringify(error, null, 4))
    }
    setUploading(false)
  }

  const compressVideoAndUploadToS3 = async () => {
    if (!videoResult) return
    const inputFilePath = videoResult.uri
    setUploading(true)
    try {
      const compressedFilePath = await Video.compress(inputFilePath, {
        compressionMethod: "auto",
        progressDivider: 10,
        downloadProgress: (percent) => {
          console.log("Download progress for compressor", percent)
        },
      })

      const response = await fetch(compressedFilePath)
      const data = await response.blob()

      await uploadData({
        path: `public/testVideo.mp4`,
        data,
        options: {
          contentType: "video/mp4",
        },
      }).result

      setVideoResult(undefined)
      alert("Upload successful!")
    } catch (error) {
      alert("Upload failed because:" + JSON.stringify(error, null, 4))
    }
    setUploading(false)
  }

  const player = useVideoPlayer(videoResult?.uri ?? "", (player) => {
    player.loop, player.play()
  })

  return (
    <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ textAlign: "center" }}>Instructions:</Text>
      <Text style={{ textAlign: "left", paddingHorizontal: 30 }}>
        1. On Android Phone, select a video and hit upload.
      </Text>
      <Text style={{ textAlign: "left", paddingHorizontal: 30 }}>
        2. On an iPhone, go to the WatchAndDelete Tab, try to view the videos uploaded by streaming
        them straight from S3.
      </Text>
      <Text style={{ textAlign: "left", paddingHorizontal: 30 }}>
        Note: As soon as you comment out the compression, and upload, videos play fine.
      </Text>
      {!videoResult && (
        <TouchableOpacity style={$genericButton} onPress={openImagePicker}>
          <Text style={{ color: "white", textAlign: "center" }}>Select video to uploadr</Text>
        </TouchableOpacity>
      )}
      {uploading && <Text>Uploading video!...</Text>}

      {!!videoResult && (
        <>
          <Text style={{ textAlign: "center" }}>Preview of Video</Text>
          <VideoView player={player} style={$videoPreview} allowsFullscreen={false} />
        </>
      )}
      <Text style={{ textAlign: "center" }}>
        Compression Status: {compressionEnabled ? "Enabled" : "Disabled"}
      </Text>
      <TouchableOpacity
        style={$genericButton}
        onPress={() => setCompressionEnabled((prev) => !prev)}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Toggle Compression</Text>
      </TouchableOpacity>
      {videoResult && (
        <TouchableOpacity
          style={$genericButton}
          onPress={compressionEnabled ? compressVideoAndUploadToS3 : uploadWithoutCompression}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Initiate Upload to S3</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const $genericButton: TextStyle = {
  width: 200,
  height: 75,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "blue",
  borderRadius: 10,
}

const $videoPreview: ViewStyle = {
  width: 400,
  height: 300,
}
// @demo remove-file
