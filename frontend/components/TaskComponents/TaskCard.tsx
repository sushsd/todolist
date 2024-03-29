import { Task } from '../src/Task';
import { Card, Checkbox, Flex, ActionIcon, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

export const TaskCard = ({
  task,
  setSelectedTask,
  activateEditTaskModal,
  deleteTask,
  setTaskDone,
}: {
  task: Task;
  setSelectedTask: (task: Task) => void;
  activateEditTaskModal: () => void;
  deleteTask: () => void;
  setTaskDone: (isDone: boolean) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [taskDone, tool] = useState(task.is_done);

  return (
    <Card
      key={task.id}
      padding="md"
      shadow="xs"
      bg={isHovered ? 'var(--mantine-color-default-hover)' : 'var(--mantine-color-default)'}
      style={{ width: '100%', marginBottom: 10 }}
      onClick={(event) => {
        if (event.target.type !== "checkbox") {
          setSelectedTask(task);
          activateEditTaskModal();
        }
      }}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Flex justify="space-between" gap="md" direction="column">
        <Flex justify="space-between" gap="md" align="center">
          <Flex gap="md" align="center">
            <Checkbox
              checked={taskDone}
              onChange={(event) => {
                event.stopPropagation();
                tool(!taskDone);
                setTaskDone(!task.is_done);
              }}
            />
            <Text>{task.title}</Text>
          </Flex>
          <ActionIcon
            onClick={(event) => {
              deleteTask();
              event.stopPropagation();
            }}
            color="red"
            title="Edit Task"
          >
            <IconX
              style={{
                width: '70%',
                height: '70%',
              }}
            />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};
