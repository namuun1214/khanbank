import Contacts from 'react-native-contacts'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native'
import { Modal } from '../components/core/Modal'
import { NavigationRoutes } from '../navigation/NavigationParameter'
import { useTheme } from '../providers'
import { CloseIcon, CorrectIcon } from '../assets/HomeIcons'
import { useCollectionUtils, useDocumentUtils } from '../hooks'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import { Input } from '../components/Input'
import Contact from '../components/Contact'
import { Stack, Stack as StackLayout } from '../components/core/Stack'
import { useUserData } from '../providers/UserProvider'
import { Queue, Spacer } from '../components/core'
import _ from 'lodash'
import { Button } from '../components'
import { theme } from '../theme'
import { useUserUID } from '../authentication'
import QRCode from 'react-native-qrcode-svg'
import { ScrollView } from 'react-native-gesture-handler'
import ShakeIcon from '../assets/ShakeIcon'

export const CreateRoomScreen = (): JSX.Element => {
  const windowHeight = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width
  const { palette } = useTheme()
  const { navigate } = useNavigation()
  const [isDone, setIsDone] = useState(false)
  const [contacts, setContacts] = useState([])
  const [isVisibleModal, setVisibleModal] = useState(false)
  const [isVisibleQRModal, setVisibleQRModal] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [roomName, setRoomName] = useState('')
  const [isVisibleBankAccountModal, setVisibleBankAccountModal] = useState(
    false,
  )
  const { activeRoomMembers, setActiveRoomMembers, userData } = useUserData()
  const [bankName, setBankName] = useState(userData?.bankName)
  const [accountNumber, setAccountNumber] = useState(userData?.accountNumber)
  const [owner, setOwner] = useState(userData?.owner)

  const uid = useUserUID()
  const [roomId, setRoomId] = useState('')
  const ref = React.useRef(null)

  useEffect(() => {
    if (isDone) {
      navigate(NavigationRoutes.HomeScreen)
    }
  }, [isDone])

  useEffect(() => {
    Contacts.getAll().then((contacts) => {
      setContacts(contacts)
    })
  }, [userData, activeRoomMembers])
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString()
  }
  const renderItem = ({ item, index }) => {
    return <Contact contact={item} />
  }

  const handleNumberChange = (value: string) => {
    setInputValue(value)
    let searchedNumber: Array<string> = []
    Contacts.getAll().then((contacts) => {
      contacts.filter((item, index) => {
        item.phoneNumbers.map((number, index) => {
          if (_.includes(number.number, value) && number.label === 'mobile') {
            searchedNumber.push(item)
          }
        })
      })
      setContacts(searchedNumber)
    })
  }
  const handleRoomNameChange = (value: string) => {
    setRoomName(value)
  }
  const createRoom = async () => {
    if (!roomId) {
      const id = await useCollectionUtils({ path: `rooms` }).createDocument({
        adminUser: uid,
        adminUserPhoneNumber: userData?.phoneNumber,
        roomName: roomName,
        isActive: true,
        users: activeRoomMembers.map((item) => {
          return { phoneNumber: item }
        }),
      })
      setRoomId(id)
    }
  }

  const handleChangeOwner = (value: string) => {
    setOwner(value)
  }
  const handleChangeBankName = (value: string) => {
    setBankName(value)
  }
  const handleChangeAccountName = (value: string) => {
    setAccountNumber(value)
  }

  return (
    <>
      <ScrollView ref={ref}>
        <StackLayout size={1} width="100%">
          <View style={styles.stackItem}>
            <Queue
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Input
                autoCapitalize="none"
                placeholder="Өрөөний нэр"
                width="70%"
                role={palette.background.default}
                keyboardType="default"
                onChangeText={handleRoomNameChange}
                value={roomName}
              />
              <Pressable
                onPress={async () => {
                  await createRoom()
                  setVisibleQRModal(true)
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    borderColor: palette.primary.main,
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  <Text style={{ color: palette.primary.main }}>
                    QR код авах
                  </Text>
                </View>
              </Pressable>
            </Queue>
            <Spacer horizontal size={5} />
            <View
              style={{
                backgroundColor: palette.primary.light,
                width: '100%',
                height: 100,
                padding: 20,
              }}
            >
              <Queue justifyContent="space-between">
                <Stack alignItems="flex-start" justifyContent="center" size={3}>
                  <Text
                    style={{ color: 'white', fontSize: 16, fontWeight: '600' }}
                  >
                    Сэгсрэх
                  </Text>
                  <Text
                    style={{ color: 'white', fontSize: 16, fontWeight: '500' }}
                  >
                    Утсаа сэгсрээд төлбөрөө төл
                  </Text>
                </Stack>
                <ShakeIcon />
              </Queue>
            </View>
            <View style={styles.selectedMembers}>
              {activeRoomMembers?.map((member, index) => {
                return (
                  <View style={styles.memberLabel} key={index}>
                    <Text>{member}</Text>
                    <Spacer horizontal={false} size={3} />
                    <TouchableOpacity
                      onPress={() => {
                        setActiveRoomMembers((prev) =>
                          _.remove(prev, (number) => {
                            return number != member
                          }),
                        )
                      }}
                      style={{ padding: 5 }}
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            <Spacer size={5} horizontal={true} />
            <Queue alignItems="center">
              <Input
                autoCapitalize="none"
                placeholder="Гишүүд нэмэх"
                width="90%"
                role={palette.background.default}
                keyboardType="number-pad"
                onChangeText={handleNumberChange}
                value={inputValue}
              />
              <Pressable
                onPress={() => {
                  if (inputValue) {
                    setActiveRoomMembers((prev) => [...prev, inputValue])
                    setInputValue('')
                  }
                }}
              >
                <CorrectIcon />
              </Pressable>
            </Queue>
          </View>
          <View style={styles.divider}>
            <Text>Санал болгох хүмүүс</Text>
          </View>
          <View style={styles.stackItem}>
            <FlatList
              data={contacts}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={styles.list}
            />
          </View>
          <Modal
            color={palette.primary.main}
            rightButtonText="Үгүй"
            leftButtonText="Тийм"
            title="Та ийм өрөө үүсгэхдээ итгэлтэй байна уу?"
            setIsVisible={setVisibleModal}
            isVisible={isVisibleModal}
            onLeftButton={() => setVisibleModal(false)}
            onRightButton={async () => {
              await createRoom()
              setVisibleModal(false)
              setVisibleBankAccountModal(true)
            }}
          />
        </StackLayout>
        {isVisibleQRModal && (
          <View style={styles.popup}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => {
                setVisibleQRModal(false)
              }}
            >
              <CloseIcon color="#000" width={30} height={30} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: '#000', marginBottom: 20 }}>
              Өрөөнд нэвтрэх QR код
            </Text>
            <QRCode
              value={roomId}
              size={250}
              logoBackgroundColor="transparent"
            />
          </View>
        )}
        {isVisibleBankAccountModal && (
          <View
            style={[
              styles.popup,
              { height: windowHeight * 0.8, width: windowWidth },
            ]}
          >
            <Stack size={5} alignItems="center">
              <Text style={{ fontSize: 20, color: '#000', marginBottom: 20 }}>
                Дансны мэдээлэл явуулах
              </Text>

              <View style={styles.modalDivider}></View>

              <Input
                autoCapitalize="none"
                placeholder="Банкны нэр"
                width="80%"
                role={palette.background.secondary}
                keyboardType="default"
                value={bankName}
                onChangeText={handleChangeBankName}
              />
              <Input
                autoCapitalize="none"
                placeholder="Дансны дугаар"
                width="80%"
                role={palette.background.secondary}
                keyboardType="default"
                value={accountNumber}
                onChangeText={handleChangeAccountName}
              />
              <Input
                autoCapitalize="none"
                placeholder="Дансны нэр"
                width="80%"
                role={palette.background.secondary}
                keyboardType="default"
                value={owner}
                onChangeText={handleChangeOwner}
              />
              <Queue size={15}>
                <View style={{ width: 120 }}>
                  <Button
                    type="secondary"
                    onPress={() => void setVisibleBankAccountModal(false)}
                  >
                    Буцах
                  </Button>
                </View>
                <View style={{ width: 120 }}>
                  <Button
                    type="primary"
                    onPress={async () => {
                      await useDocumentUtils({
                        path: `users/${uid}`,
                      }).updateDocument({
                        owner,
                        bankName,
                        accountNumber,
                      })
                      navigate(NavigationRoutes.ScanBillScreen, {
                        roomId,
                      })
                    }}
                  >
                    {' '}
                    Хадгалах
                  </Button>
                </View>
              </Queue>
            </Stack>
          </View>
        )}
      </ScrollView>
      <View style={styles.stackItem}>
        <Button type="primary" onPress={() => setVisibleModal(true)}>
          Үргэлжлүүлэх
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    textAlign: 'center',
  },
  stackItem: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    // flex: 1,
  },
  modalDivider: {
    backgroundColor: theme.palette.primary.main,
    height: 5,
    width: '100%',
  },
  divider: {
    padding: 10,
    width: '100%',
    backgroundColor: '#E5E5E5',
    display: 'flex',
    justifyContent: 'center',
  },
  memberLabel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderColor: theme.palette.primary.light,

    borderWidth: 1,
    borderRadius: 5,
  },
  selectedMembers: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  popup: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    marginTop: 20,
  },
  closeIconContainer: {
    padding: 10,
    position: 'absolute',
    right: 5,
    top: 5,
  },
})
