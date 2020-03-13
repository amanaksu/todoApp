import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends React.Component {
    state = {
        isEditing: false
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.circle}></View>
                </TouchableOpacity>
                <Text style={styles.text}>I'm ToDo!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"
    },  
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 15
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    }
})