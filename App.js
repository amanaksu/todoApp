import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, TouchableNativeFeedback} from 'react-native';
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import "react-native-get-random-values" ; 
import { v4 as uuidv4 } from "uuid" ; 
import { seed } from "./uuidSeed" ; 


const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} 
                     placeholder={"New To Do"} 
                     value={newToDo} 
                     onChangeText={this._controlNewToDo} 
                     placeholderTextColor={"#999"} 
                     returnKeyType={"done"} 
                     autoCorrect={false}
                     onSubmitEditing={this._addToDo} />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <ToDo key={toDo.id} {...toDo} 
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
              />))}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    })
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv4({ random : seed () });
        const newToDoObject = {
          [ID] : {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    } 
  };

  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      return { ...newState };
    })
  };

  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      }
      return { ...newState }
    });
  };

  _completeToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      }
      return { ...newState }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
