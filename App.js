/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  CameraRoll,
  Image,
  FlatList
} from "react-native";



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      index: 0
    };
    this.hit = this.hit.bind(this);
    //  this.setIndex=this.setIndex.bind(this)
  }
  componentWillMount() {
    this.hit();
  }
  componentDidUpdate() {
    const data = new FormData();
    data.append("photo", {
      uri: this.state.photos[this.state.index - 1].node.image.uri,
      type: "image/*", 
      name: "abhishekdusra.jpg"
    });
    fetch("http://192.168.43.235:5000/register/", {
      method: "post",
      body: data
    })
  }
  hit() {
    CameraRoll.getPhotos({
      first: 1,
      assetType: "All"
    }).then(r => this.setState({ photos: r.edges }));
  }
  render() {
    const { photos } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {photos.map((p, i) => {
            this.state.index++;
            return (
              <View key={i}>
                <Image
                  style={{
                    width: 245,
                    height: 245
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              </View>
            );
          })}
          <Text style={{marginTop:30}}>{this.state.index}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
