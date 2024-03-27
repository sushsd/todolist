'use client';

import { EditTaskModal } from '@/components/TaskComponents/EditTaskModal';
import { TaskCard } from '@/components/TaskComponents/TaskCard';
import { Task } from '@/components/src/Task';
import { AppShell, Burger, Stack, Pagination, px } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function TaskOverview() {
    const tasks: Task[] = [
        { id: 1, title: "Do Homework", tags: 'school', description: 'Math homework, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec turpis aliquam, aliquet neque sit amet, molestie tellus. Curabitur interdum dignissim lorem sed feugiat. Praesent tristique sed dolor euismod eleifend. Cras a arcu malesuada, porta enim quis, imperdiet libero. Praesent vel ex vitae lorem mollis lobortis id ut metus. Morbi at tincidunt erat. Cras finibus tortor id justo pretium, at congue erat dignissim. Nunc sodales erat mollis sodales luctus. Suspendisse accumsan, dui a egestas accumsan, orci mauris ultrices erat, porttitor laoreet eros felis ac tortor. Duis eleifend, ligula vel semper aliquam, elit magna posuere turpis, quis tincidunt mauris erat nec dui. Aliquam vitae tempor augue. Interdum et malesuada fames ac ante ipsum primis in faucibus.', is_done: false, created_time: new Date(), updated_time: new Date() },
        { id: 2, title: "Grocery Shopping", tags: 'home', description: 'Coffee, Salt, Majo', is_done: false, created_time: new Date(), updated_time: new Date() },
        { id: 3, title: "Workout", tags: 'health', description: 'Run 5km', is_done: false, created_time: new Date(), updated_time: new Date() },
    ];

    const [opened, { toggle }] = useDisclosure();
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
    const [prevSelectedTask, setPrevSelectedTask] = useState<Task>(tasks[0]);

    const headerHeight = 60;
    const padding = 10;
    const mainHeight = `calc(100vh - ${px(headerHeight + padding * 2)}px)`;

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
                <EditTaskModal isOpen={isEditTaskModalOpen} setIsOpen={setIsEditTaskModalOpen} task={selectedTask} />
                <Stack justify='space-between' align='center' style={{ height: mainHeight }}>
                    <Stack gap='0px'>
                        {tasks.map((element) => (
                        <TaskCard
                            task={element}
                            selectedTaskId={selectedTask.id}
                            prevSelectedTaskId={prevSelectedTask.id}
                            setSelectedTask={setSelectedTask}
                            updateSelectedTask={() => { setPrevSelectedTask(selectedTask); }}
                            activateEditTaskModal={() => { setIsEditTaskModalOpen(true); }}
                        />
                        ))}
                    </Stack>
                    <Pagination total={20} siblings={3} />
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
