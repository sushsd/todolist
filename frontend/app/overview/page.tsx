'use client';

import { CreateTaskModal } from '@/components/TaskComponents/CreateTaskModal';
import { EditTaskModal } from '@/components/TaskComponents/EditTaskModal';
import { TaskCard } from '@/components/TaskComponents/TaskCard';
import { Task } from '@/components/src/Task';
import { AppShell, Burger, Stack, Pagination, px, Text, Button, Group, Center, Flex, TextInput, ActionIcon } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { userName } from '@/components/src/Globals';
import { useRouter } from "next/navigation";

export default function TaskOverview() {
    const [opened, { toggle }] = useDisclosure();
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    const headerHeight = 60;
    const padding = 10;
    const mainHeight = `calc(100vh - ${px(headerHeight + padding * 2)}px)`;

    const logOut = async () => {
        const response = await fetch('api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        router.push('.');
    }

    const fetchTasks = async (page: number) => {
        const response = await fetch('api/task_overview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page: page, per_page: 10 }),
        });
        const data = await response.json();
        setTasks(data.tasks.map((task: any) => new Task(task)));
        setTotalPages(data.total_pages);
    }

    useEffect(() => {
        fetchTasks(page);
    }, []);

    const deleteTask = async (taskId: number) => {
        const response = await fetch('api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: taskId }),
        });

        const data = await response.json();
        console.log(data);
        if (data.message === 'success') {
            console.log('task deleted');
            fetchTasks(page);
        }
    }

    const setTaskDone = async (task: Task, isDone: boolean) => {
        const response = await fetch('api/modify_task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    done: isDone,
                }
            ),
        });
        const data = await response.json();
        if (data.message === 'success') {
            fetchTasks(page);
        }
    }

    const findTasks = async (searchTerm: string, page: number) => {
        const response = await fetch('api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    title: searchTerm,
                    page: page,
                    per_page: 10
                }
            ),
        });
        const data = await response.json();
        console.log(data);
        if (data.message === 'success') {
            setTasks(data.tasks.map((task: any) => new Task(task)));
            setTotalPages(data.total_pages);
        }
    }

    const searchIconButton = <ActionIcon variant='transparent' onClick={() => findTasks(searchTerm, 1)}><IconSearch /></ActionIcon>;

    return (
        <AppShell
            header={{ height: headerHeight }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding={padding}
        >
            <AppShell.Header>
                <Group justify='space-between' style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }} align='center'>
                    <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                    <Text>Task Overview</Text>
                    <Text>{userName}</Text>
                    <Button onClick={() => logOut()}>Logout</Button>
                    <TextInput placeholder='Search' value={searchTerm} onChange={(event) => setSearchTerm(event.currentTarget.value)} rightSection={searchIconButton} />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>Navbar</AppShell.Navbar>
            <AppShell.Main>
                <EditTaskModal isOpen={isEditTaskModalOpen} setIsOpen={setIsEditTaskModalOpen} fetchTasks={() => { fetchTasks(page) }} task={selectedTask!} />
                <CreateTaskModal isOpen={isCreateTaskModalOpen} setIsOpen={setIsCreateTaskModalOpen} onTaskCreated={() => { fetchTasks(page) }} />
                <Stack justify='space-between' align='stretch' style={{ height: mainHeight }}>
                    <Stack gap='0px' align='center'>
                        {tasks.map((element) => (
                            <TaskCard
                                task={element}
                                setSelectedTask={setSelectedTask}
                                activateEditTaskModal={() => { setIsEditTaskModalOpen(true); }}
                                deleteTask={() => { deleteTask(element.id); }}
                                setTaskDone={(isDone: boolean) => { setTaskDone(element, isDone); }}
                            />
                        ))}
                        <Button
                            style={{ width: '200px' }}
                            onClick={() => {
                                setIsCreateTaskModalOpen(true);
                            }}>
                            Add New Task
                        </Button>
                    </Stack>
                    <Center>
                        <Pagination
                            total={totalPages}
                            value={page}
                            onChange={(event) => {
                                setPage(event);
                                if (searchTerm === "") {
                                    fetchTasks(event);
                                }
                                else {
                                    findTasks(searchTerm, event);
                                }
                            }} />
                    </Center>
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
