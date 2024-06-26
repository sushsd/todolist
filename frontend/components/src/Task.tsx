export class Task {
    id: number;
    title: string;
    tags: string;
    description: string;
    is_done: boolean;
    created_time: Date;
    updated_time: Date;

    constructor(task: any) {
        this.id = task.id;
        this.title = task.title;
        this.tags = task.tags;
        this.description = task.description;
        this.is_done = task.done;
        this.created_time = new Date(task.created_time);
        this.updated_time = new Date(task.updated_time);
    }
}
