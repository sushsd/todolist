import { useState } from 'react';
import { Task } from '../src/Task';
import { Card, Checkbox, Flex, ActionIcon, TextInput, Textarea, Transition, Text} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

export const TaskCard = ({
    task,
    selectedTaskId,
    prevSelectedTaskId,
    setSelectedTask,
    updateSelectedTask,
    activateEditTaskModal,
}: {
    task: Task;
    selectedTaskId: number;
    prevSelectedTaskId: number;
    setSelectedTask: (task: Task) => void;
    updateSelectedTask: () => void;
    activateEditTaskModal: () => void;
}) => {
    const incHeight = {
        in: { height: 500 },
        out: { height: 60},
        common: { transformOrigin: 'top' },
        transitionProperty: 'height',
    };
    const decHeight = {
        in: { height: 60 },
        out: { height: 500},
        common: { transformOrigin: 'top' },
        transitionProperty: 'height',
    };

    return (
        <Transition
            mounted={task.id === selectedTaskId || task.id === prevSelectedTaskId}
            transition={task.id === selectedTaskId ? incHeight : decHeight}
            duration={600}
            timingFunction="ease-in-out"
            keepMounted
        >
            {(transitionStyles) => (
                <Card
                    key={task.id}
                    padding="md"
                    shadow="xs"
                    style={{ width: '100%', marginBottom: 10, height: task.id === selectedTaskId ? 60 : 60, ...(task.id === selectedTaskId || task.id === prevSelectedTaskId ? {} : {}) }}
                    onClick={() => {
                        updateSelectedTask();
                        setSelectedTask(task);
                    }}
                >
                    <Flex justify="space-between" gap="md" direction="column">
                        <Flex justify="space-between" gap="md" align="center">
                            <Flex gap="md" align='center'>
                                <Checkbox checked={task.is_done} onChange={() => { }} />
                                <Text>{task.title}</Text>
                            </Flex>
                            <ActionIcon onClick={(event) => {
                                activateEditTaskModal();
                            }} color="blue" title="Edit Task">
                                <IconPencil />
                            </ActionIcon>
                        </Flex>
                        <Text>{task.description}</Text>
                    </Flex>
                </Card>
            )}
        </Transition>
    );
}
