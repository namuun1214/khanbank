export enum NavigationRoutes {
  CreateRoom = 'Өрөө үүсгэх',
  ScanBillScreen = 'Баримт оруулах',
  RoomDetails = 'Өрөө',
  HomeScreen = 'Нүүр',
  ProfileScreen = 'Профайл',
  BottomTabNavigator = 'BottomTabNavigator',
  AuthStack = 'AuthStack',
  AuthScreen = 'AuthScreen',
  LoginScreen = 'Нэвтрэх',
  BillScreen = 'Дүн баталгаажуулах',
  NotificationScreen = 'Мэдэгдэл',
  SplitOptionScreen = 'Хуваах',
  ShakeScreen = 'Сэгсрэх',
  PayScreen = 'Төлбөрөө төлөх',
}
export interface NavigationPayload<T> {
  props: T
}
export type NavigatorParameterList = {
  [NavigationRoutes.BillScreen]: NavigationPayload<any>
  [NavigationRoutes.CreateRoom]: NavigationPayload<any>
  [NavigationRoutes.ScanBillScreen]: NavigationPayload<any>
  [NavigationRoutes.HomeScreen]: NavigationPayload<any>
  [NavigationRoutes.BottomTabNavigator]: NavigationPayload<any>
  [NavigationRoutes.ShakeScreen]: NavigationPayload<any>
  [NavigationRoutes.AuthStack]: NavigationPayload<any>
  [NavigationRoutes.AuthScreen]: NavigationPayload<any>
  [NavigationRoutes.LoginScreen]: NavigationPayload<any>
  [NavigationRoutes.RoomDetails]: NavigationPayload<any>
  [NavigationRoutes.NotificationScreen]: NavigationPayload<any>
  [NavigationRoutes.SplitOptionScreen]: NavigationPayload<any>
  [NavigationRoutes.ProfileScreen]: NavigationPayload<any>
  [NavigationRoutes.PayScreen]: NavigationPayload<any>
}
