import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [searchList, setSearchList] = useState();
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const SearchTitle = (e) => {
    console.log(e)
    const searchListValue = todoList.filter((data) => data?.title == e);
    console.log("Search List Value" , searchListValue)
    setSearchList([searchListValue]);
  };
  const handleChange = (e, setState) => {
    setState(e);
  };

  const handlerSubmit = async () => {
    if ((description && title) !== "") {
      let newTodoItems = [
        ...todoList,
        { title: title, description: description, status: false },
      ];
      setTodoList(newTodoItems);
      await AsyncStorage.setItem('List', newTodoItems)
    }
  };

  const DeleteData = (item) => {
    const deleteTodo = todoList.filter((data, index) => index != item);
    setTodoList(deleteTodo);
  };

  const ChangeStatus = (item) => {
    const previsousData = {
      description: item?.item?.description,
      title: item?.item?.title,
      status: !item?.item?.status,
    };
    const doneTask = todoList.filter((data, index) => index != item?.index);
    let newTodoItems = [...doneTask, previsousData];
    setTodoList(newTodoItems);
  };
 
  const TodoData = (item) => {
    console.log("ITEM" , item)
    return (
      <>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            backgroundColor: "#F6F7F9",
            marginVertical: 10,
            alignItems: "center",
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Checkbox
              status={item?.item?.status ? "checked" : "unchecked"}
              onPress={() => {
                ChangeStatus(item);
              }}
            />
          </View>
          <View>
            <Text>{item?.item?.title}</Text>
            <Text>{item?.item?.description}</Text>
          </View>
          <TouchableOpacity onPress={() => DeleteData(item?.index)}>
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text>TODO APP</Text>
        </View>
        <View
          style={{
            borderWidth: 1.5,
            borderColor: "gray",
            borderRadius: 5,
            backgroundColor: "#F6F7F9",
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
        >
          <TextInput
            placeholder="Enter Title:"
            onChangeText={(e) => handleChange(e, setTitle)}
          />
          <TextInput
            placeholder="Enter Description:"
            onChangeText={(e) => handleChange(e, setDescription)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="SUBMIT" onPress={handlerSubmit} />
        </View>
        <View
          style={{
            borderWidth: 1.5,
            borderColor: "gray",
            borderRadius: 5,
            backgroundColor: "#F6F7F9",
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginTop: 6,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Search Title"
            onChangeText={(e) => SearchTitle(e)}
          />
        </View>
        {searchList?.length != 0  ? (
          <FlatList
            renderItem={TodoData}
            data={searchList}
          />
        ) : (
          <FlatList
            extraData={todoList}
            renderItem={TodoData}
            data={todoList}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
});