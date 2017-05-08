import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../Nav';
import moment from "moment";
import axios from "axios";
let now = moment().format("MMM Do");
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Expo, {
    Constants,
    ImagePicker,
    registerRootComponent,
} from 'expo';

class Camera extends React.Component {
    state = {
        image: {cancelled: true},
        upload: false,
        uploading: false,
        post_text: ``
    };

    render() {
        let { image } = this.state;

        return (

            <Nav>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Button
                        onPress={this._pickImage}
                        title="Pick an image"
                    />
                    <Button
                        onPress={this._takePhoto}
                        title="Take a photo"
                    />
                    { this._maybeRenderImage() }
                    { this._maybeRenderUploadingOverlay() }
                    <StatusBar barStyle="default" />
                </View>
            </Nav>

        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}]}>
                    <ActivityIndicator
                        color="#fff"
                        animating
                        size="large"
                    />
                </View>
            );
        }
    }

    _maybeRenderImage = () => {
        let { image, upload } = this.state;
        if (image.cancelled) {
            return;
        }
        else if (upload){
            return(
                <Text>Upload success!</Text>
            )
        }

        else return (
                <View style={{
                    marginTop: 30,
                    width: 250,
                    borderRadius: 3,
                    elevation: 2,
                    shadowColor: 'rgba(0,0,0,1)',
                    shadowOpacity: 0.2,
                    shadowOffset: {width: 4, height: 4},
                    shadowRadius: 5,
                }}>
                    <View>

                        <TextInput
                            onChangeText={(post_text)=> this.setState({post_text})}
                            value={this.state.post_text}
                        />
                        <Button title="Upload" onPress={this._handleImagePicked.bind(null, this.state.image)}/>
                    </View>
                    <View style={{borderTopRightRadius: 3, borderTopLeftRadius: 3, overflow: 'hidden'}}>
                        <Image
                            source={{uri: image.uri}}
                            style={{width: 250, height: 250}}
                        />
                    </View>
                </View>
            );
    };

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    }

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    }

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4,3]
        });
        this.setState({image: pickerResult});
        console.log(this.state)
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3]
        });
        this.setState({image: pickerResult});
    };

    _handleImagePicked = async (pickerResult) => {
        let uploadResponse, uploadResult;

        try {
            this.setState({uploading: true});

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();
                axios.post(`http://52.10.128.151:3005/api/users/post`, {
                    id: this.props.redux.profileReducer.profile.id,
                    timestamp:now,
                    imageUrl:uploadResult.location,
                    post_text: this.state.post_text
                }).then((res)=>{
                    console.log(res.data)
                });
                this.setState({upload: true});
            }
        } catch(e) {
            console.log({uploadResponse});
            console.log({uploadResult});
            console.log({e});
            alert('Upload failed, sorry');
        } finally {
            this.setState({uploading: false});
        }
    }
}

async function uploadImageAsync(uri) {
    let apiUrl = 'http://52.10.128.151:3005/upload';


    let uriParts = uri.split('.');
    let fileType = uri[uri.length - 1];

    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}
const styles = StyleSheet.create({

});

export default connect( state=>({
    redux: state
}), {
    // Imported Actions
})(Camera)