import { FC, useEffect } from "react"
import { Button, Screen, Text } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { $styles } from "@/theme"
import { useStores } from "@/models"
import { useIsFocused } from "@react-navigation/native"

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
    const { authenticationStore } = useStores()

    const isFocused = useIsFocused()

    useEffect(() => {
      ;(async function checkIfWeAreFocused() {
        console.log("IS FOCUSED?", isFocused)
        if(isFocused) {
          console.log("FOCUSED SCREEN")
        }
      })()
    }, [])

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
        <Button text={"Log out"} onPress={() => authenticationStore.logout()} />
      </Screen>
    )
  }

// @demo remove-file
