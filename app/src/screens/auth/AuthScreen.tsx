import React from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../../components'
import { NavigationRoutes } from '../../navigation/NavigationParameter'
import { Spacer } from '../../components/core'
import { MainLogo } from '../../assets'

export const AuthScreen = (): JSX.Element => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.center, styles.grow]}>
        <MainLogo />
      </View>
      <View style={styles.bottomButtons}>
        <Text style={styles.description}>
          Төлбөрийн цоо шинэ{'\n'}
          шийдэл- Khan pay
        </Text>
        <Spacer size={5} horizontal />
        <Button
          type="primary"
          onPress={() => {
            navigation.navigate(NavigationRoutes.LoginScreen)
          }}
        >
          Нэвтрэх
        </Button>
        <Spacer size={5} horizontal />
        <Button
          type="secondary"
          onPress={() => {
            navigation.navigate(NavigationRoutes.LoginScreen)
          }}
        >
          Бүртгүүлэх
        </Button>
      </View>
      <Spacer size={20} horizontal />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#66737F',
  },
  grow: {
    flex: 1,
  },
})
