import { Timestamp } from "firebase/firestore";

interface habit {
    endDate: Timestamp;
    freq: number;
    startDate: Timestamp;
    description: string;
    name: string;
    eval: number;
    category: string;
}
interface task {
    category: string;
    endDate: Timestamp;
    freq: number;
    name: string;
    startDate: Timestamp;

}

export interface responseUser {
    categories: string[];
    habits: habit[];
    tasks: task[];
    uid: string;
}