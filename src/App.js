import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {

  const [repository, setRepository] = useState([]);

  async function getRepositories() {
    const response = await api.get('/repositories')
    setRepository(response.data)
  }
  
  useState(() => {
    getRepositories()
  }, [])

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`)

    const repoUpdate = repository.map((repo) => {
      if (repo.id === id) {
        return response.data
      } else {
        return repo;
      }
    }
    );
    
    setRepository(repoUpdate);
  
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
          <FlatList
            data={repository}
            keyExtractor={repository => repository.id}
            renderItem={({ item: repository }) => (
        <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <View style={styles.techsContainer}>
                  
                    <Text style={styles.tech}>
                    {repository.techs}
                  </Text>
                 
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes} curtidas
      </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
              
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
        </View>
            )}
          />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
