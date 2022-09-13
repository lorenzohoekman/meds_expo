import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

import * as FileSystem from 'expo-file-system';



export default App = () => {
    const [image, setImage] = React.useState()

    const get_image = async () => {
        try {
            const imageUrl = "https://i.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU";


            const response = await fetch(imageUrl)
            const imageBlob = await response.blob()
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
                const base64data = reader.result;
                console.log(base64data);
                let bbase64Code = base64data.split("data:application/octet-stream;base64,")[1];
                setImage(bbase64Code)
            }

            //let fileUri = FileSystem.documentDirectory + "text_nieuw_vandaag.jpg";
            //await FileSystem.writeAsStringAsync(fileUri, base64data, { encoding: FileSystem.EncodingType.Base64 });
            /* const asset = await MediaLibrary.createAssetAsync(image);
            const album = await MediaLibrary.getAlbumAsync('Download');

            if (album == null) {
                await MediaLibrary.createAlbumAsync('Download', asset, false);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            } */
        }
        catch (e) {
            handleError(e);
        }
    }

    const save_image = async () => {
        try {
            let name =  + "/jowww.png";
            let fileUri = FileSystem.documentDirectory;
            let fileName= fileUri + name

            await FileSystem.writeAsStringAsync(fileName, image, {
                encoding: FileSystem.EncodingType.Base64,
            });
            console.log('path: ', fileUri)
            //const localuri = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + filename)
            const mediaResult = await MediaLibrary.saveToLibraryAsync(fileName);
            
            console.log('wrote image')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text style={{ marginTop: 200 }} >hi</Text>
            <Button title='Get picture' onPress={() => get_image()} />
            <Button title='Save picture on the disk' onPress={() => save_image()} />
            <Image style={{ height: 400, width: 400 }} source={{ uri: 'data:application/octet-stream;base64,' + image }} />
        </View>
    )
}