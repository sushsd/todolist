import { useState } from 'react';
import { Task } from '../src/Task';
import { Center, Modal, TextInput, Textarea } from '@mantine/core';

export const EditTaskModal = ({
    isOpen,
    setIsOpen,
    task,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    task: Task;
}) => {
    if (!task) {
        return null;
    }
    return (
        <Modal.Root opened={isOpen} size="100%" onClose={() => { setIsOpen(false); }}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <TextInput value={task.title} onChange={(event) => { task.title = event.currentTarget.value; }} />
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Textarea label="Description" value={task.description} autosize onChange={(event) => { task.description = event.currentTarget.value; }} />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
}
