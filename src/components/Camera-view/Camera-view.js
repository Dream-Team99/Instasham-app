import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../Nav';
import { Ionicons } from '@expo/vector-icons'
import {Link} from  'react-router-native'
import moment from "moment";
import axios from "axios";
let now = moment().format();
import passHistory from '../../reducers/followingReducer';
import {
    TouchableOpacity,
    ActivityIndicator,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    TextInput,
    Text,
    View,
    Alert
} from 'react-native';
import Expo, {
    ImagePicker,
} from 'expo';

class Camera extends React.Component {
    state = {
        image: {cancelled: true},
        upload: true,
        uploading: false,
        post_text: ``,
        takenPhoto: false,
        photoid:0
    };
    cancelPhoto(){
        this.setState({
        image: {cancelled: true},
        upload: false,
        uploading: false,
        post_text: ``,
        takenPhoto: false,
            photoid:0
        })
    }

    render() {
        let { image } = this.state;
        return (

            <Nav>
                <View style={{flex: 1}}>
                    {this.state.takenPhoto === false &&
                        <View style={styles.outerNoFollowers}>
                            <TouchableOpacity style={styles.noFollowersView} onPress={this._pickImage}>
                                <Ionicons underlayColor="grey" name='ios-add-circle-outline' size={52} color='#262626'/>
                                <Text style={styles.noFollowerstext}>Pick a Photo</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {this.state.takenPhoto === false &&
                        <View style={styles.outerNoFollowers}>
                            <TouchableOpacity style={styles.noFollowersView} onPress={this._takePhoto}>
                                <Ionicons underlayColor="grey" name='ios-camera' size={52} color='#262626'/>
                                <Text style={styles.noFollowerstext}>Take a Photo</Text>
                            </TouchableOpacity>
                        </View>
                    }
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
            this.state.takenPhoto = false;
            return(
                <View style={styles.outerNoFollowers}>
                    <View style={styles.uploadViewS}>
                        <Link to={`/Post/${this.state.photoid}`}>
                            <Text style={styles.uploadS}>Upload success!</Text>
                        </Link>
                    </View>
                </View>
            )
        }

        else {
            this.state.takenPhoto = true;
            return (
                <View>
                        <TextInput
                            placeholder='Add a comment'
                            style={styles.input}
                            onChangeText={(post_text)=> this.setState({post_text})}
                            value={this.state.post_text}
                        />
                    <TouchableOpacity style={styles.upload} onPress={this._handleImagePicked.bind(null, this.state.image)}>
                        <Text style={{color: "grey", textAlign: 'center',}}>Upload</Text>
                    </TouchableOpacity>
                        <Image
                            source={{uri: image.uri}}
                            style={{height: 300}}
                        />
                    <TouchableOpacity style={styles.upload} onPress={this.cancelPhoto.bind(this)}>
                        <Text style={{color: "grey", textAlign: 'center',}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };


    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4,3]
        });
        this.setState({image: pickerResult});
        this.setState({upload: false});
        this.setState({post_text: ``});
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3]
        });
        this.setState({image: pickerResult});
        this.setState({upload: false});
        this.setState({post_text: ``});
    };

    _handleImagePicked = async (pickerResult) => {
        if(this.state.post_text.length < 3){
            alert('You need to add a comment');
            return
        }
        let uploadResponse, uploadResult;

        try {
            this.setState({uploading: true});

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();
                axios.post(`http://52.10.128.151:3005/api/users/post`, {
                    id: this.props.redux.profileReducer.profile.profile.id,
                    timestamp:now,
                    imageUrl:uploadResult.location,
                    post_text: this.state.post_text
                }).then((res)=>{
                    this.setState({photoid: res.data[0].id})
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
    input:{
        height: 40,
        paddingLeft:5,
        paddingRight:5,
        borderColor: 'gray',
        borderWidth: 1
    },
    upload:{
            backgroundColor:"#ffffff",
            paddingTop:10,
            paddingBottom:10,
            paddingLeft:17,
            paddingRight:17,
            borderRadius: 5,
            borderWidth:2,
            borderColor:"black",
    },
    uploadView:{
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 70,
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"white",
        height:100,
        width:200
    },
    uploadS:{
        backgroundColor:"#ffffff",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:17,
        paddingRight:17,
    },
    uploadViewS:{
        marginTop:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 70,
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"white",
        height:100,
        width:200
    },
    outerNoFollowers:{
        alignSelf:"center",
    },
    noFollowersView:{
        marginTop:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 70,
        borderWidth:2,
        borderColor:"black",
        backgroundColor:"white",
        height:150,
        width:200
    },
    noFollowerstext:{
        color:"grey",
        marginTop:5,
        padding:10,
        fontSize:15,
    }

});

export default connect( state=>({
    redux: state,
    follow: state.followingReducer
}), {
    passHistory
})(Camera)