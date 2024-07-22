export namespace NTodo {

    export interface TodosResponse {
        totalRecords: number;
        data: TodoData[]
    }

    export interface TodoResponse {
        totalRecords: number;
        data: TodoData
    }

    export interface TodoData {
        title:       string;
        description: string;
        status:      string;
        difficult:    number;
        hidden: boolean;
        id: number;
        deadLine: string;
        progress: number;
        color:       TodoConfig;
        class:       TodoConfig;
    }
    
    export interface TodoConfig {
        status:   string;
        difficult: string;
    }
    
    export enum difficult {
        HIGH = 1,
        MEDIUM = 2,
        LOW = 3
    }

    export enum Range {
        LOW = 30,
        MEDIUM = 60,
        HIGH = 100
    }

    export enum RangeText {
        LOW = 'low',
        MEDIUM = 'medium',
        HIGH = 'high'
    }
}