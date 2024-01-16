import React, { use } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Divider,
    Checkbox,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";
import { HiPencil, HiX, HiCheck } from "react-icons/hi";
import { TaskOverviewContext } from "app/dashboard/page";
import { on } from "events";

export function TaskCard({ task }: { task: any }) {
    const { isEditing, setIsEditing } = React.useContext(TaskOverviewContext);
    const { editingTaskId, setEditingTaskId } =
        React.useContext(TaskOverviewContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const setDone = async (done: boolean) => {
        const response = await fetch("/api/set_done", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: task.id, done: done }),
        });

        if (response.ok) {
            const message = await response.text();
        } else {
        }
    };

    async function onStartEditing() {
        setEditingTaskId(task.id);
        setIsEditing(true);
        console.log("start editing");
    }

    async function onConfirmEdit() {
        setEditingTaskId(-1);
        setIsEditing(false);
        console.log("confirm edit");
    }

    async function onCancelEdit() {
        setEditingTaskId(-1);
        setIsEditing(false);
        console.log("cancel edit");
    }

    async function onExpand() {}

    let button_row;
    if (isEditing && editingTaskId === task.id) {
        button_row = (
            <div className="flex gap-3">
                {/*Confirm Edit Button*/}
                <Button
                    isIconOnly
                    color="success"
                    variant="solid"
                    radius="full"
                    size="sm"
                    onClick={onConfirmEdit}
                    className="text-white"
                >
                    <HiCheck className="size-6" />
                </Button>

                {/*Cancel Edit Button*/}
                <Button
                    isIconOnly
                    color="danger"
                    variant="solid"
                    radius="full"
                    size="sm"
                    onClick={onCancelEdit}
                >
                    <HiX className="size-6" />
                </Button>
            </div>
        );
    } else {
        button_row = (
            <Button
                isIconOnly
                color="primary"
                variant="solid"
                radius="full"
                size="sm"
                isDisabled={isEditing}
                onClick={onStartEditing}
            >
                <HiPencil className="size-6" />
            </Button>
        );
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                size="5xl"
                className="w-full h-full"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col justify-between gap-1 pb-6 pt-8">
                        <div className="flex justify-between items-center pr-6">
                            <h1>{task.title}</h1>
                            {button_row}
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <p>{task.description}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Card
                isHoverable
                isPressable
                onPress={onOpen}
                className="w-full"
            >
                <CardHeader>
                    <div className="flex gap-3">
                        <Checkbox
                            color="primary"
                            checked={task.done}
                            onChange={(e) => setDone(e.target.checked)}
                        ></Checkbox>
                        <p>{task.title}</p>
                    </div>
                </CardHeader>
            </Card>
        </>
    );
}
