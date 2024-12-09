import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { supabase } from '../../src/supabaseClient'; // Importa o cliente do Supabase
import Icon from 'react-native-vector-icons/Ionicons'; // Ícone para o menu e botão reset
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

type Message = {
  id: number;
  content: string;
  author: string;
};

// Função para buscar uma mensagem aleatória do Supabase
const getRandomMessage = async (): Promise<Message> => {
  try {
    const { data, error } = await supabase
      .from('Mensagens')
      .select('*');

    if (error) throw error;

    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      return {
        id: data[randomIndex].id,
        content: data[randomIndex].mensagem,
        author: data[randomIndex].ref,
      };
    } else {
      return {
        id: 0,
        content: 'Nenhuma mensagem disponível no momento.',
        author: 'Sistema',
      };
    }
  } catch (error) {
    console.error('Erro ao buscar mensagem:', error);
    return {
      id: 0,
      content: 'Erro ao carregar mensagem.',
      author: 'Sistema',
    };
  }
};


export default function IndexScreen() {
  const [message, setMessage] = useState<Message | null>(null);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  // Função para buscar e atualizar uma mensagem aleatória
  const fetchRandomMessage = async () => {
    const randomMessage = await getRandomMessage();
    setMessage(randomMessage);
  };

  // Carrega uma mensagem ao iniciar a página
  useEffect(() => {
    fetchRandomMessage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Menu */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Mensagem Motivacional */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          {message ? message.content : 'Carregando...'}
        </Text>
        <Text style={styles.authorText}>
          {message ? message.author || 'Autor desconhecido' : ''}
        </Text>
      </View>

      {/* Botão de Reset */}
      <TouchableOpacity style={styles.resetButton} onPress={fetchRandomMessage}>
        <Icon name="refresh-outline" size={30} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  authorText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555555',
  },
  resetButton: {
    marginTop: 20,
  },
});