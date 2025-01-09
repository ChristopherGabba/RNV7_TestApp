import { SafeAreaView, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { useVideoPlayer, VideoView } from "expo-video"
import { Video } from "react-native-compressor"
import { useNavigation } from "@react-navigation/native"
import { uploadData } from "aws-amplify/storage"

export const UploadScreen = () => {
  const [videoResult, setVideoResult] = useState<ImagePicker.ImagePickerAsset>()
  const [uploading, setUploading] = useState(false)
  const navigation = useNavigation()

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

  const compressVideoAndUploadToS3 = async () => {
    if (!videoResult) return
    const inputFilePath = videoResult.uri
    setUploading(true)
    try {
      const compressedFilePath = await Video.compress(inputFilePath, {
        compressionMethod: "auto",
        // bitrate: 1600000,
        progressDivider: 10,
        downloadProgress: (percent) => {
          console.log("Download progress for compressor", percent)
        },
      })

      const response = await fetch(compressedFilePath)
      const data = await response.blob()

      const output = await uploadData({
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
        2. On the WatchAndDelete Screen, try to view the videos uploaded by streaming them straight
        from S3.
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

      {videoResult && (
        <TouchableOpacity style={$genericButton} onPress={compressVideoAndUploadToS3}>
          <Text style={{ color: "white", textAlign: "center" }}>Compress And Upload Video To S3</Text>
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
