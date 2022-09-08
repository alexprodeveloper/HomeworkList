export interface Homework {
  id: string;
  heading: string;
  task: string;
  isFinished: boolean;
}

export enum HomeworkTypes {
  ALL = 'Показывать все задания',
  FINISHED = 'Выполненные',
  NOT_FINISHED = 'Не выполненные',
}

export interface ChangeIsFinished {
  id: string;
  value: boolean;
}
