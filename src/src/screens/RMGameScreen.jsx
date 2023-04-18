import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";

export default function RMGameScreen() {
  const [personagem, setPersonagem] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [totalPersonagens, setTotalPersonagens] = useState(1);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((json) => {
        setTotalPersonagens(json.info.count);
      });
  }, []);

  useEffect(() => {
    buscarPersonagem();
  }, [totalPersonagens]);

  function buscarPersonagem() {
    fetch("https://rickandmortyapi.com/api/character/" + returnRandomNumber())
      .then((response) => response.json())
      .then((json) => {
        setPersonagem(json);
      });
  }

  async function handlePersonagemVivoOuMorto(resposta) {
    const isAlive = personagem.status === "Alive";
    if (resposta === isAlive) {
      alert("Você acertou!");
    } else {
      alert("Você errou!");
    }
    buscarPersonagem();
  }

  const returnRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * totalPersonagens) + 1;

    // canoot return 0
    if (randomNumber === 0) {
      return 1;
    }
    return randomNumber;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          border: "2px solid black",
          alignItems: "Center",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={styles.title}>Rick and Morty Game</Text>
        <Text style={styles.subtitle}>
          Você sabe se o personagem está vivo?
        </Text>
        {personagem && (
          <View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Image
                source={{ uri: personagem.image }}
                style={{ width: 200, height: 200, marginTop: 20 }}
              />
            </View>
            <Text
              style={{ fontSize: 25, textAlign: "center", marginVertical: 20 }}
            >
              O/a personagem {personagem.name} está vivo/a/e?
            </Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <View style={{ alignItems: "center", marginRight: 20 }}>
                <Button
                  mode="contained"
                  onPress={() => handlePersonagemVivoOuMorto(true)}
                >
                  SIM
                </Button>
              </View>
              <Button
                mode="contained"
                onPress={() => handlePersonagemVivoOuMorto(false)}
              >
                NÃO
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
