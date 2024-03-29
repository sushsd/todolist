import { useState } from 'react';
import { Task } from '../src/Task';
import { Button, Group, Modal, Space, TextInput, Textarea } from '@mantine/core';

export const EditTaskModal = ({
    isOpen,
    setIsOpen,
    fetchTasks,
    task,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    fetchTasks: () => void;
    task: Task;
}) => {
    if (!task) {
        return null;
    }

    const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
    const [editedTaskDescription, setEditedTaskDescription] = useState(task.description);

    async function updateTask() {
        const response = await fetch('api/modify_task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id: task.id,
                    title: editedTaskTitle,
                    description: editedTaskDescription,
                    done: task.is_done,
                }
            ),
        });
        const data = await response.json();
        if (data.message === 'success') {
            fetchTasks();
        }
    }

    function discardChanges() {
        setEditedTaskTitle(task.title);
        setEditedTaskDescription(task.description);
    }

    return (
        <Modal opened={isOpen} size="1000px" onClose={() => { setIsOpen(false); }} withCloseButton={false}>

            <Group justify='space-between'>
                <TextInput value={editedTaskTitle} onChange={(event) => { setEditedTaskTitle(event.currentTarget.value); }} />
                <Group>
                    <Button color='green' onClick={() => { updateTask(); setIsOpen(false); }}>Save</Button>
                    <Button color='red' onClick={() => { discardChanges(); setIsOpen(false); }}>Discard</Button>
                </Group>
            </Group>
            <Space h="lg" />
            <Textarea label="Description" value={editedTaskDescription} autosize onChange={(event) => { setEditedTaskDescription(event.currentTarget.value); }} />
        </Modal>
    );
}
