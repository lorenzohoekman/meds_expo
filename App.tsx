import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

import * as FileSystem from 'expo-file-system';
import {_fileTest} from './src/FileTest';

export const App = () => {

    return (
        <View>
            <Text>hi</Text>
            <Button title='test' onPress={() => _fileTest('test.jpg')} />
        </View>
    )
}


export default App