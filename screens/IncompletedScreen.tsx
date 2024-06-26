import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { Text, View } from "../components/Themed";
import ToDoList from "../components/ToDoList";
import useColorScheme from "../hooks/useColorScheme";
import AddModal from "../utils/AddModal";
import EditModal from "../utils/EditModal";
import { ITodo } from "../types";
import { TodoContext } from "../provider/TodoProvider";

export default function IncompletedScreen() {
  const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [inpDescription, setInpDescription] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>(0);
  const colorScheme = useColorScheme();

  const toggleAddModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };

  const toggleEditModal = (index: number) => {
    setEditIndex(index);
    setEditModalVisible(!isEditModalVisible);
  };

  return (
    <TodoContext.Consumer>
      {({ todos, setTodos, addTodo, editTodo, setDone, removeTodo }) =>
        todos.filter((e: ITodo) => {
          return !e.done;
        }).length > 0 ? (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                toggleAddModal();
              }}
            >
              <MaterialIcons
                name="add-box"
                size={35}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <ToDoList
              todos={todos}
              setTodos={setTodos}
              toggleEditModal={toggleEditModal}
              screen="incompleted"
              setDone={setDone}
              removeTodo={removeTodo}
            />
            <Modal testID={"modal"} isVisible={isAddModalVisible}>
              <AddModal
                inpDescription={inpDescription}
                setInpDescription={setInpDescription}
                onPress={() => {
                  toggleAddModal();
                }}
                addTodo={addTodo}
              />
            </Modal>
            <Modal testID={"modal"} isVisible={isEditModalVisible}>
              <EditModal
                inpDescription={inpDescription}
                setInpDescription={setInpDescription}
                onPress={() => {
                  toggleEditModal(editIndex);
                }}
                editTodo={editTodo}
                editIndex={editIndex}
              />
            </Modal>
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                toggleAddModal();
              }}
            >
              <MaterialIcons
                name="add-box"
                size={35}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <View style={styles.container}>
              <Text style={{ bottom: 30 }}>
                Add some new Todos to see Todos here
              </Text>
            </View>
            <Modal testID={"modal"} isVisible={isAddModalVisible}>
              <AddModal
                inpDescription={inpDescription}
                setInpDescription={setInpDescription}
                onPress={() => {
                  toggleAddModal();
                }}
                addTodo={addTodo}
              />
            </Modal>
          </View>
        )
      }
    </TodoContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "green",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
  addButton: {
    padding: 15,
    // borderWidth:2,
    // borderColor:'blue'
  },
});
