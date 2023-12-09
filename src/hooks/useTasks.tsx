import { DragEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces';

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
  
  const isDragging = useTaskStore( state => !!state.draggingTaskId )
  const onTaskDrop = useTaskStore( state => state.onTaskDrop )
  const addTask = useTaskStore( state => state.addTask )
  // const changeTaskStatus = useTaskStore( state => state.changeTaskStatus )
  // const draggingTaskId = useTaskStore( state => state.draggingTaskId )

  const [onDragOver, setonDragOver] = useState(false);

  const handleAddTask = async () => {
    // Structure of Swal.fire --> isConfirmed, isDenied, isDismissed, value, dismiss
    const { isConfirmed, value } = await Swal.fire({
      title: 'New Task',
      input: 'text',
      inputLabel: 'Task Title',
      inputPlaceholder: 'Enter the task title',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    });

    if (!isConfirmed) return;
    addTask(value, status = 'open');
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setonDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setonDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setonDragOver(false);
    onTaskDrop(status)
  };

  return {
    // Properties
    isDragging,

    // Methods
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}