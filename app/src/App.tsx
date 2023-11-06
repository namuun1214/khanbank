import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./authentication";
import { RootStack } from "./navigation";
import { PermissionProvider, UserProvider } from "./providers";

const App: FC = () => (
  <NavigationContainer>
    <PermissionProvider>
      <AuthProvider>
        <UserProvider>
          <RootStack />
        </UserProvider>
      </AuthProvider>
    </PermissionProvider>
  </NavigationContainer>
);

export default App;
