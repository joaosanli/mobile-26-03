import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskItem from './TaskItem';
import { TaskItem as TaskData } from '../utils/handle-api';

interface TaskListProps {
  tasks: TaskData[];
  onEditTask: (id: string, text: string, completed?: boolean, dueDate?: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem
          item={item}
          onEdit={() => onEditTask(item._id, item.text, item.completed, item.dueDate)}
          onDelete={() => onDeleteTask(item._id)}
        />
      )}
      contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhuma tarefa cadastrada</Text>
          <Text style={styles.emptyText}>Adicione sua primeira tarefa clicando em Nova Tarefa.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 32,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 32,
  },
  emptyState: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default TaskList;
