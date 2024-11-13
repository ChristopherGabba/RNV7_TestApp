import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { useAuth } from "@/models/AuthContext"

export const DemoShowroomScreen = () => {
  const { logout } = useAuth()

  const isFocused = useIsFocused()

  useEffect(() => {
    ;(async function checkIfWeAreFocused() {
      console.log("IS FOCUSED?", isFocused)
      if (isFocused) {
        console.log("FOCUSED SCREEN")
      }
    })()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          marginTop: 50,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          width: 200,
          height: 50,
        }}
        onPress={() => logout()}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

// @demo remove-file
