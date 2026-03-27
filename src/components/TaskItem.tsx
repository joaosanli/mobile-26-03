import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TaskItem as TaskData } from '../utils/handle-api';

interface TaskItemProps {
  item: TaskData;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Tarefa</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Feather name="edit-2" size={18} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
          <AntDesign name="delete" size={18} color="#ffffff" />
        </TouchableOpacity>
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
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
});

export default TaskItem;
