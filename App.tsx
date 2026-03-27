import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TaskList from './src/components/TaskList';
import {
  addTask,
  clearAllTasks,
  deleteTask,
  getAllTasks,
  TaskItem,
  updateTask,
} from './src/utils/handle-api';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  const updateMode = (_id: string, taskText: string) => {
    setIsUpdating(true);
    setText(taskText);
    setTaskId(_id);
  };

  const handleSubmit = () => {
    if (isUpdating) {
      void updateTask(taskId, text, setTasks, setText, setIsUpdating);
      return;
    }

    void addTask(text, setText, setTasks);
  };

  const handleClearAll = () => {
    void clearAllTasks(tasks, setTasks, setText, setIsUpdating);
  };

  const handleCancelEdit = () => {
    setIsUpdating(false);
    setTaskId('');
    setText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('./assets/task-app-banner.png')}
          style={styles.banner}
          resizeMode="contain"
          accessibilityLabel="Imagem de cabeçalho do aplicativo de tarefas"
        />

        <Text style={styles.header}>Minhas tarefas</Text>
        <Text style={styles.subtitle}>Organize seu dia de forma simples e prática.</Text>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Total de tarefas: {tasks.length}</Text>
          <Text style={styles.counterHint}>
            {isUpdating ? 'Modo edição ativado' : 'Modo criação ativado'}
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Descrição da tarefa</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Estudar React Native hoje à noite"
            placeholderTextColor="#9ca3af"
            value={text}
            onChangeText={(val) => setText(val)}
            maxLength={80}
            autoCapitalize="sentences"
            returnKeyType="done"
          />

          <Text style={styles.characterCount}>{text.length}/80 caracteres</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>
                {isUpdating ? 'Salvar alteração' : 'Adicionar tarefa'}
              </Text>
            </TouchableOpacity>

            {isUpdating && (
              <TouchableOpacity style={styles.secondaryButton} onPress={handleCancelEdit}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.nativeButtonContainer}>
          <Button title="Excluir todas as tarefas" onPress={handleClearAll} />
        </View>

        <View style={styles.listWrapper}>
          <TaskList
            tasks={tasks}
            onEditTask={updateMode}
            onDeleteTask={(id) => {
              void deleteTask(id, setTasks);
            }}
          />
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  banner: {
    width: '100%',
    height: 140,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 15,
    color: '#6b7280',
  },
  counterContainer: {
    backgroundColor: '#e0ecff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  counterHint: {
    marginTop: 4,
    fontSize: 13,
    color: '#1e40af',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 14,
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#111827',
  },
  characterCount: {
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'right',
    fontSize: 12,
    color: '#6b7280',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
  },
  nativeButtonContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 8,
    marginBottom: 12,
  },
  listWrapper: {
    flex: 1,
  },
});
