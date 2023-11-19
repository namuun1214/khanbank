import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './authentication'
import { RootStack } from './navigation'
import { PermissionProvider, UserProvider } from './providers'
import { View, PanResponder, NativeModules } from 'react-native'

// const DevMenuTrigger = ({ children }) => {
//   const { DevMenu } = NativeModules
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: (evt, gestureState) => {
//       if (gestureState.numberActiveTouches === 3) {
//         DevMenu.show()
//       }
//     },
//   })
//   return (
//     <View style={{ flex: 1 }} {...panResponder.panHandlers}>
//       {children}
//     </View>
//   )
// }

const App: FC = () => (
  // <DevMenuTrigger>
  <NavigationContainer>
    <PermissionProvider>
      <AuthProvider>
        <UserProvider>
          <RootStack />
        </UserProvider>
      </AuthProvider>
    </PermissionProvider>
  </NavigationContainer>
  // </DevMenuTrigger>
)

export default App
