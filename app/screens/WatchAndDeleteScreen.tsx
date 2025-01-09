import { SafeAreaView, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { useEffect, useRef, useState } from "react"
import { useVideoPlayer, VideoView, } from "expo-video"
import { getUrl, list, remove } from "aws-amplify/storage"

export const WatchAndDeleteScreen = () => {
  const [s3Paths, setS3Paths] = useState<string[]>([])
  const [encodedUris, setEncodedUris] = useState<string[]>([])

  const currentIndex = useRef<number>(0)

  const player = useVideoPlayer("", (player) => {
    player.play()
    player.loop = true
  })

  async function fetchFilesFromS3() {
    const result = await list({
      path: "public",
    })

    if (!result.items) {
      alert("No files found in storage")
      return
    }

    const s3FilePaths = result.items.map((item) => item.path)
    const encodedUris: string[] = []

    for (const path of s3FilePaths) {
      const urlResponse = await getUrl({ path })
      encodedUris.push(urlResponse.url.toString())
    }

    setS3Paths(s3FilePaths)
    setEncodedUris(encodedUris)
  }

  const deleteVideo = async () => {
    console.log("Deleting video")
    try {
      const deleteTarget = s3Paths[currentIndex.current]
      await remove({ path: deleteTarget })
      setS3Paths((prevArray) => prevArray.filter((item) => item !== deleteTarget))
      setEncodedUris((prevArray) =>
        prevArray.filter((item) => item !== encodedUris[currentIndex.current]),
      )
      currentIndex.current = 0
    } catch (error) {
      console.log("Error deleting files")
    }
  }

  function goToNextFile() {
    const numOfFiles = encodedUris?.length
    if (!numOfFiles) return

    const onLastIndex = currentIndex.current === numOfFiles - 1
    currentIndex.current = onLastIndex ? 0 : currentIndex.current + 1
    player.replace(encodedUris[currentIndex.current])
  }

  useEffect(() => {
    const subscription = player.addListener("statusChange", ({ status, error }) => {
      if (status === "error" && !!encodedUris) {
        console.log("Video Player Error:" + JSON.stringify(error, null, 4))
        // alert("Video Player Error:" + JSON.stringify(error, null, 4))
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={$genericButton} onPress={fetchFilesFromS3}>
        <Text style={{ color: "white", textAlign: "center" }}>Fetch files from S3</Text>
      </TouchableOpacity>
      {!s3Paths ? (
        <Text style={{ color: "black", textAlign: "center" }}>No files detected in S3</Text>
      ) : (
        <VideoView player={player} style={$videoPreview} />
      )}

      <TouchableOpacity style={$genericButton} onPress={goToNextFile}>
        <Text style={{ color: "white", textAlign: "center" }}>Go To Next Video</Text>
      </TouchableOpacity>

      <TouchableOpacity style={$genericButton} onPress={deleteVideo}>
        <Text style={{ color: "white", textAlign: "center" }}>Delete Video</Text>
      </TouchableOpacity>
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
  backgroundColor: "gray",
}
// @demo remove-file
