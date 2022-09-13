import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState} from 'react'

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';

const saveFile = async () => {
  const options = {quality: 0.5};
        try {
            let fileUri = FileSystem.documentDirectory + "text_nieuw_vandaag.jpg";
            await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
            const { uri } = await Camera.takePictureAsync(options);
            const asset = await MediaLibrary.createAssetAsync(uri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
            await MediaLibrary.saveToLibraryAsync(photo);
          } catch (error) {
          console.error(error)
        }
    }

    
    const takePicture = async () => {
      if (ref) {
          console.log(ref.current)
          const options = {
              quality: 1,
              base64: true
          }
          const picture = await ref.current.takePictureAsync(options)
          console.log(picture.uri)
      }
  }

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [permission, requestCameraPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [images, setImages] = React.useState("")

  const _ask_permission = async () => {
    await requestPermission()
    await requestCameraPermission()
  }




  const _create_photo = async () => {
    let photo = await cameraRef.takePictureAsync();
    console.log('photo', photo);
    await MediaLibrary.saveToLibraryAsync(photo);
  }

  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }
  
  return (
    <View style={styles.container}>
      <Image style={{height: 100, width: 100}}  source={images} />
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Permission status {JSON.stringify(status)}</Text>
      <Button title='Ask permission' onPress={() => _ask_permission()} />
      
      <Button title='Ask image' onPress={() => _get_photos()} />
      <Button title='Create image' onPress={() => saveFile()} />
      <StatusBar style="auto" />
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    height: 300,
    width: 300
  }
});
