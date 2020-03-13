import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends React.Component {
    state = {
        isEditing: false,
        isCompleted: false,
        todoValue: ""
    };

    render() {
        const { isEditing, isCompleted, todoValue } = this.state;
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}></View>
                    </TouchableOpacity>
                    { isEditing ? (
                        <TextInput style={[styles.input,  styles.text]} value={todoValue} multiline={true} onChangeText={this._controlInput} returnKeyType={"done"} onBlur={this._finishEditing} />
                    ) : (
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>{text}</Text>
                    )}

                </View>
                { isEditing ? (
                    // 수정할 때 
                    // - 수정 완료 ICON을 보여준다. 
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // 수정하지 않을 때 
                    // - 수정 ICON을 보여준다. 
                    // - 삭제 ICON을 보여준다. 
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };

    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            todoValue: text
        });
    };

    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };

    _controlInput = text => {
        this.setState({
            todoValue: text
        });
    };
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },  
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 15
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 20,
        marginHorizontal: 10
    },
    actionText: {

    },
    input: {
        marginVertical: 20,
        width: width / 2
    }
})