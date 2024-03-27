'use client';

import { CreateTaskModal } from '@/components/TaskComponents/CreateTaskModal';
import { EditTaskModal } from '@/components/TaskComponents/EditTaskModal';
import { TaskCard } from '@/components/TaskComponents/TaskCard';
import { Task } from '@/components/src/Task';
import { AppShell, Burger, Stack, Pagination, px, Card, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export default function TaskOverview() {
//    const tasks: Task[] = [
//        { id: 1, title: "Do Homework", tags: 'school', description: 'Math homework, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec turpis aliquam, aliquet neque sit amet, molestie tellus. Curabitur interdum dignissim lorem sed feugiat. Praesent tristique sed dolor euismod eleifend. Cras a arcu malesuada, porta enim quis, imperdiet libero. Praesent vel ex vitae lorem mollis lobortis id ut metus. Morbi at tincidunt erat. Cras finibus tortor id justo pretium, at congue erat dignissim. Nunc sodales erat mollis sodales luctus. Suspendisse accumsan, dui a egestas accumsan, orci mauris ultrices erat, porttitor laoreet eros felis ac tortor. Duis eleifend, ligula vel semper aliquam, elit magna posuere turpis, quis tincidunt mauris erat nec dui. Aliquam vitae tempor augue. Interdum et malesuada fames ac ante ipsum primis in faucibus.', is_done: false, created_time: new Date(), updated_time: new Date() },
//        { id: 2, title: "Grocery Shopping", tags: 'home', description: 'Coffee, Salt, Majo', is_done: false, created_time: new Date(), updated_time: new Date() },
//        { id: 3, title: "Workout", tags: 'health', description: 'Run 5km', is_done: false, created_time: new Date(), updated_time: new Date() },
//    ];

    const [opened, { toggle }] = useDisclosure();
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [prevSelectedTask, setPrevSelectedTask] = useState<Task | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const headerHeight = 60;
    const padding = 10;
    const mainHeight = `calc(100vh - ${px(headerHeight + padding * 2)}px)`;

    const fetchTasks = async (page: number) => {
        const response = await fetch('api/task_overview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page: page, per_page: 10}),
        });
        const data = await response.json();
        setTasks(data.tasks.map((task: any) => new Task(task)));
        setTotalPages(data.total_pages);
    }

    useEffect(() => {
        fetchTasks(page);
    }, []);

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
                <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                <div>Logo</div>
            </AppShell.Header>
            <AppShell.Navbar p='md'>Navbar</AppShell.Navbar>
            <AppShell.Main>
                <EditTaskModal isOpen={isEditTaskModalOpen} setIsOpen={setIsEditTaskModalOpen} task={selectedTask!} />
                <CreateTaskModal isOpen={isCreateTaskModalOpen} setIsOpen={setIsCreateTaskModalOpen} onTaskCreated={fetchTasks}/>
                <Stack justify='space-between' align='stretch' style={{ height: mainHeight }}>
                    <Stack gap='0px'>
                        {tasks.map((element) => (
                        <TaskCard
                            task={element}
                            selectedTaskId={selectedTask != null ? selectedTask.id : null}
                            prevSelectedTaskId={prevSelectedTask != null ? prevSelectedTask.id : null}
                            setSelectedTask={setSelectedTask}
                            updateSelectedTask={() => { setPrevSelectedTask(selectedTask); }}
                            activateEditTaskModal={() => { setIsEditTaskModalOpen(true); }}
                        />
                        ))}
                        <Button 
                            style={{ width: '100%' }} 
                            onClick={() => {
                                setIsCreateTaskModalOpen(true);
                            }}>
                            Add New Task
                        </Button>
                    </Stack>
                    <Pagination 
                        total={totalPages} 
                        value={page} 
                        onChange={(event) => {
                            setPage(event);
                            fetchTasks(event);
                        }}/>
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
