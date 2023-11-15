import React, { FC, useEffect, useState } from 'react'
import { Text, View, Image, Button, Pressable } from 'react-native'
import { Input } from '../components/Input'
import { CloseIcon } from '../assets'
import { Modal } from '../components/core'
import { useTheme } from '../providers'
import { useDocument, useDocumentUtils } from '../hooks'
import { useNavigation } from '@react-navigation/native'
import { NavigationRoutes } from '../navigation/NavigationParameter'
import { ScrollView } from 'react-native-gesture-handler'
import { Loading } from '../components/Loading'

const updateStateInObjectArray = (
  state: any,
  setState: any,
  indx: number,
  change: any,
) => {
  const newData = [...state]
  const obj = { ...newData[indx], ...change }
  newData[indx] = obj
  setState(newData)
}

const removeObjectInObjectArray = (state: any, setState: any, indx: number) => {
  const newData = [...state]
  newData.splice(indx, 1)
  setState(newData)
}

const calculateTotal = (data: any) => {
  let total = 0
  data.map((el: any) => {
    let res = el.price * el.quantity
    total += res
  })

  return total
}

export const BillScreen: FC = ({ route }) => {
  const { navigate } = useNavigation()
  const { palette } = useTheme()
  const roomId = route?.params?.roomId
  const { data: billData, loading }: any = useDocument({
    path: `rooms/${roomId}`,
  })
  console.log(billData)
  const [data, setData]: any = useState([])
  const [total, setTotal] = useState(0)
  const [onEdit, setOnEdit] = useState(false)
  const [isVisibleModal, setVisibleModal] = useState(false)
  const [selectedItem, setItem] = useState<number>(0)
  const { updateDocument } = useDocumentUtils({ path: `rooms/${roomId}` })
  useEffect(() => {
    if (billData) {
      setData(billData?.bills ? billData?.bills : [])
    }
  }, [billData])
  useEffect(() => {
    setTotal(calculateTotal(data))
  }, [data])

  const updateBill = async () => {
    await updateDocument({
      bills: data,
    })
    navigate(NavigationRoutes.SplitOptionScreen, {
      total: total,
      roomId: roomId,
    })
    console.log('updated')
  }

  if (loading) {
    return <Loading />
  }
  return (
    <ScrollView>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        {onEdit ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {data.map((bill, indx) => {
                return (
                  <View
                    key={indx}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        // borderColor: "#C3C1C1",
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '40%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Input
                        role="transparent"
                        placeholder=""
                        value={bill.name}
                        onChangeText={(e) => {
                          updateStateInObjectArray(data, setData, indx, {
                            name: e,
                          })
                        }}
                      />
                    </View>
                    <View
                      style={{
                        // borderColor: "#C3C1C1",
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '15%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Input
                        role="transparent"
                        placeholder=""
                        value={bill.quantity}
                        onChangeText={(e) => {
                          updateStateInObjectArray(data, setData, indx, {
                            quantity: e,
                          })
                        }}
                      />
                    </View>
                    <View
                      style={{
                        // borderColor: "#C3C1C1",
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '30%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Input
                        role="transparent"
                        placeholder=""
                        value={bill.price}
                        onChangeText={(e) => {
                          updateStateInObjectArray(data, setData, indx, {
                            price: e,
                          })
                        }}
                      />
                    </View>
                    <Pressable
                      onPress={() => {
                        setVisibleModal(true)
                        setItem(indx)
                      }}
                      style={{
                        height: 40,
                        width: '10%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CloseIcon />
                    </Pressable>
                  </View>
                )
              })}
            </View>
            <View
              style={{
                // backgroundColor: "#747474",
                borderRadius: 8,
                width: 300,
                height: 50,
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Button
                title={'Continue'}
                onPress={() => setOnEdit(false)}
                color="#027A48"
              />
            </View>
          </View>
        ) : (
          <View style={{ width: '100%', height: '100%' }}>
            <View
              style={{
                height: '60%',
                width: '100%',
                backgroundColor: 'white',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 3,
                  backgroundColor: 'white',
                  borderRadius: 7,
                  marginBottom: 50,
                }}
              ></View>
              <View
                style={{
                  width: '80%',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {data.map((bill: any, indx: number) => {
                  return (
                    <View
                      key={indx}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        marginBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#514F4F',
                        }}
                      >
                        {bill.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#514F4F',
                        }}
                      >
                        x{bill.quantity}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#514F4F',
                        }}
                      >
                        ₮{bill.price}
                      </Text>
                    </View>
                  )
                })}
              </View>
              <View style={{ marginTop: 50, width: '80%' }}>
                <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <View
                    style={{
                      width: 200,
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                      marginBottom: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#514F4F',
                      }}
                    >
                      Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#514F4F',
                      }}
                    >
                      ₮{total}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#027A48',
                      borderRadius: 8,
                      width: 150,
                      height: 60,
                      justifyContent: 'center',
                      display: 'flex',
                      marginRight: 20,
                    }}
                  >
                    <Button
                      title={'Edit'}
                      onPress={() => setOnEdit(true)}
                      color="white"
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: '#027A48',
                      borderRadius: 8,
                      width: 150,
                      height: 60,
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <Button
                      title={'Accept'}
                      onPress={updateBill}
                      color="white"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        <Modal
          color={palette.primary.main}
          rightButtonText="Үгүй"
          leftButtonText="Тийм"
          title="Та энэ бүтээгдхүүнийг хасахдаа итгэлтэй байна уу?"
          setIsVisible={setVisibleModal}
          isVisible={isVisibleModal}
          onLeftButton={() => setVisibleModal(false)}
          onRightButton={() => {
            removeObjectInObjectArray(data, setData, selectedItem)
            setVisibleModal(false)
          }}
        />
      </View>
    </ScrollView>
  )
}
