import { NextResponse } from 'next/server';

export interface Task {
    id: number;
    title: string;
    description: string;
}

const tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1' },
    { id: 2, title: 'Task 2', description: 'Description 2' },
    { id: 3, title: 'Task 3', description: 'Description 3' },
];

export const GET = async () => {
    return NextResponse.json(tasks);
}

export const dynamic = 'force-dynamic';