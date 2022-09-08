import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {
  ChangeIsFinished,
  Homework,
  HomeworkTypes,
} from '../../interfaces/Homework';

interface State {
  homework: Homework[];
  homeworkType: HomeworkTypes;
}

const initialState: State = {
  homework: [],
  homeworkType: HomeworkTypes.ALL,
};

export const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Homework>) => {
      state.homework.push(action.payload);
    },
    changeIsFinished: (state, action: PayloadAction<ChangeIsFinished>) => {
      state.homework = state.homework.map(work => {
        if (work.id === action.payload.id) {
          work.isFinished = action.payload.value;
        }
        return work;
      });
    },
    deleteHomework: (state, action: PayloadAction<string>) => {
      state.homework = state.homework.filter(
        work => work.id !== action.payload,
      );
    },
    changeHomeworkType: (state, action: PayloadAction<HomeworkTypes>) => {
      state.homeworkType = action.payload;
    },
  },
});

export const {add, changeIsFinished, deleteHomework, changeHomeworkType} =
  homeworkSlice.actions;
