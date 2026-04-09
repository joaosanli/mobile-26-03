import { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  const updateMode = (_id: string, taskText: string, taskCompleted?: boolean, taskDueDate?: string) => {
    setIsUpdating(true);
    setText(taskText);
    setTaskId(_id);
    setCompleted(taskCompleted ?? false);
    setDueDate(taskDueDate ? new Date(taskDueDate) : null);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    const dueDateStr = dueDate ? dueDate.toISOString() : '';
    if (isUpdating) {
      void updateTask(taskId, text, completed, dueDateStr, setTasks, setText, setIsUpdating);
    } else {
      void addTask(text, completed, dueDateStr, setText, setTasks);
    }
    setModalVisible(false);
    setCompleted(false);
    setDueDate(null);
    setShowDatePicker(false);
  };

  const handleClearAll = () => {
    void clearAllTasks(tasks, setTasks, setText, setIsUpdating);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setIsUpdating(false);
    setTaskId('');
    setText('');
    setCompleted(false);
    setDueDate(null);
    setShowDatePicker(false);
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
        </View>

        <View style={styles.topActionsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.newTaskButton,
              pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.newTaskButtonText}>+ Nova Tarefa</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.clearButton,
              pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
            ]}
            onPress={handleClearAll}
          >
            <Text style={styles.clearButtonText}>Excluir tudo</Text>
          </Pressable>
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            contentContainerStyle={styles.modalScrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>
                {isUpdating ? 'Editar Tarefa' : 'Nova Tarefa'}
              </Text>

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

              <View style={styles.checkboxRow}>
                <Checkbox
                  value={completed}
                  onValueChange={setCompleted}
                  color={completed ? '#111827' : undefined}
                />
                <Text style={styles.checkboxLabel}>Marcar como concluída</Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.dateButton,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {dueDate
                    ? `📅 Vencimento: ${dueDate.toLocaleDateString('pt-BR')}`
                    : '📅 Definir data de vencimento'}
                </Text>
              </Pressable>

              {dueDate && (
                <Pressable onPress={() => setDueDate(null)}>
                  <Text style={styles.clearDateText}>✕ Remover data</Text>
                </Pressable>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={dueDate ?? new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(_event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDueDate(selectedDate);
                    }
                  }}
                />
              )}

              <View style={styles.modalActions}>
                <Pressable
                  style={({ pressed }) => [
                    styles.saveButton,
                    pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
                  ]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.saveButtonText}>
                    {isUpdating ? 'Salvar alteração' : 'Adicionar tarefa'}
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.cancelButton,
                    pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
                  ]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

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
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  topActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  newTaskButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  newTaskButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  clearButton: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  clearButtonText: {
    color: '#dc2626',
    fontSize: 15,
    fontWeight: '700',
  },
  listWrapper: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
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
    marginTop: 6,
    marginBottom: 14,
    textAlign: 'right',
    fontSize: 12,
    color: '#6b7280',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#f9fafb',
    marginBottom: 8,
  },
  dateButtonText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  clearDateText: {
    fontSize: 13,
    color: '#dc2626',
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
  },
});
