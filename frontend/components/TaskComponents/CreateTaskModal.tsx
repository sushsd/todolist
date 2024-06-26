import { useState } from 'react';
import { Modal, TextInput, Textarea, Button, Stack, Space } from '@mantine/core';

export const CreateTaskModal = ({
    isOpen,
    setIsOpen,
    onTaskCreated,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onTaskCreated: () => void;
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskTags, setNewTaskTags] = useState<string>("");

    const onCreateTask = async () => {
        const response = await fetch('api/create_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newTaskTitle, newTaskDescription, newTaskTags}),
        });
        const data = await response.json();
        onTaskCreated();
    }

    return (
        <Modal title='Create New Task' size='1000px' opened={isOpen} onClose={() => { setIsOpen(false); }}>
            <Modal.Body>
                <Stack gap='lg'>
                    <TextInput label="Title" onChange={(event) => { setNewTaskTitle(event.target.value) }} />
                    <Textarea autosize minRows={3} label="Description" onChange={(event) => { setNewTaskDescription(event.target.value) }} />
                    <Button onClick={() => {
                        onCreateTask();
                        setIsOpen(false);
                    }}>
                        Create Task
                    </Button>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}
