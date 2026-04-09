import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TaskItem as TaskData } from '../utils/handle-api';

interface TaskItemProps {
  item: TaskData;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <View style={[styles.card, item.completed && styles.completedCard]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Tarefa</Text>
        <Text style={[styles.text, item.completed && styles.completedText]}>
          {item.text}
        </Text>
        {item.dueDate && (
          <Text style={styles.dueDate}>
            📅 Vence em: {new Date(item.dueDate).toLocaleDateString('pt-BR')}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && { transform: [{ scale: 0.95 }], elevation: 1 },
          ]}
          onPress={onEdit}
        >
          <Feather name="edit-2" size={18} color="#ffffff" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.deleteButton,
            pressed && { transform: [{ scale: 0.95 }], elevation: 1 },
          ]}
          onPress={onDelete}
        >
          <AntDesign name="delete" size={18} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
  completedCard: {
    backgroundColor: '#374151',
    opacity: 0.85,
  },
  textContainer: {
    flex: 1,
    paddingRight: 14,
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  dueDate: {
    marginTop: 6,
    fontSize: 12,
    color: '#fbbf24',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
});

export default TaskItem;
