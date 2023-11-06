/* eslint-disable react/jsx-no-bind */
import { View, Text, StyleSheet, TouchableOpacity, Modal as NaiveModal, ActivityIndicator, Image } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { Asset } from 'react-native-image-picker';

type Props = {
  title: string;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onRightButton?: (() => void) | (() => Promise<void>);
  onLeftButton?: (() => void) | (() => Promise<void>);
  color: string;
  rightButtonText: string;
  leftButtonText: string;
  icon?: JSX.Element;
  loading?: boolean;
  photo?: string;
  singleButton?: boolean;
  singleButtonText?: string;
  onSingleButton?: (() => Promise<void>) | (() => void);
  rightButtonDisable?: boolean;
  leftButtonDisable?: boolean;
  singleButtonDisable?: boolean;
  description?: string;
  setPhoto?: Dispatch<SetStateAction<Asset | undefined>>;
};

export const Modal = ({
  title,
  isVisible,
  setIsVisible,
  onRightButton,
  onLeftButton,
  rightButtonText,
  leftButtonText,
  color,
  icon,
  loading,
  photo,
  singleButton = false,
  singleButtonText,
  onSingleButton,
  rightButtonDisable,
  leftButtonDisable,
  singleButtonDisable,
  description,
  setPhoto,
  ...other
}: Props): JSX.Element => {
  return (
    <NaiveModal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={useCallback(() => {
        setIsVisible(false);
      }, [setIsVisible])}
      {...other}
    >
      <TouchableOpacity
        onPress={useCallback(() => {
          setIsVisible(!isVisible);
          const UNDEFINED = undefined;
          setPhoto && setPhoto(UNDEFINED);
        }, [isVisible, setIsVisible, setPhoto])}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={[styles.modalTitle, { color }]}>{title}</Text>
          {description && <Text style={[styles.modalDescription, { color }]}>{description}</Text>}
          {!photo && icon && icon}
          {loading && <ActivityIndicator />}
          {!loading && photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
          <View style={styles.modalButtonContainer}>
            {!loading && singleButton && (
              <TouchableOpacity
                disabled={singleButtonDisable}
                style={[styles.backButton, { borderColor: color }]}
                onPress={async () => {
                  onSingleButton && (await onSingleButton());
                }}
              >
                <Text style={[styles.contactText, { color }]}>{singleButtonText}</Text>
              </TouchableOpacity>
            )}
            {!singleButton && (
              <>

                <TouchableOpacity
                  disabled={rightButtonDisable}
                  style={[styles.backButton, { borderColor: color }]}
                  onPress={async () => {
                    onLeftButton && (await onLeftButton());
                  }}
                >
                  <Text style={[styles.contactText, { color }]}>{rightButtonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={leftButtonDisable}
                  style={[styles.nextButton, { backgroundColor: color }]}
                  onPress={async () => {
                    onRightButton && (await onRightButton());

                  }}
                >
                  <Text style={[styles.contactText, { color: 'white' }]}>{leftButtonText}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </NaiveModal>
  );
};

const styles = StyleSheet.create({
  backButton: {
    minHeight: 40,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    maxHeight: 48,
    flex: 1,
    marginHorizontal: 8,
  },
  nextButton: {
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    maxHeight: 48,
    flex: 1,
    marginHorizontal: 8,
  },
  contactText: {
    fontSize: 16,
    fontWeight: '600',
  },
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
  modalDescription: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
});
