import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

export const _fileTest = async (fileName: string) => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        return; 
    }

    const base64Data = 'my base 64 data';
    let s= new Date().toLocaleString();

    try {
        console.log('base path: permissions.directoryUri')
        await StorageAccessFramework.createFileAsync(permissions.directoryUri , fileName.replace('.', s + '.'), 'application/jpg')
            .then(async(uri) => {
                await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch((e) => {
                console.log(e);
            });
    } catch (e) {
        throw new Error(e);
    }
}