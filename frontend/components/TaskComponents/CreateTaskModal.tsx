import { useState } from 'react';
import { Task } from '../src/Task';
import { Modal, TextInput } from '@mantine/core';

export const CreateTaskModal = ({
    isOpen,
    setIsTaskOpen,
}: {
    isOpen: boolean;
    setIsTaskOpen: (open: boolean) => void;
}) => {
    const [task, setTask] = useState<Task>(new Task({id: 0, title: '', tags: '', description: '', is_done: false, created_time: new Date(), updated_time: new Date()}));
    return (
        <Modal opened={isOpen} onClose={() => { setIsTaskOpen(false);}}>
            <Modal.Body>
                <TextInput label="Title" value={task.title} onChange={(event) => { task.title = event.currentTarget.value; }} />
            </Modal.Body>
        </Modal>
    );
}
