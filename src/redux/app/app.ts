import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
//import {Homework, HomeworkTypes} from '../../interfaces/Homework';

interface State {
  isCreateModalVisible: boolean;
  homeworkHeading: string;
  homeworkTask: string;
}

const initialState: State = {
  isCreateModalVisible: false,
  homeworkHeading: '',
  homeworkTask: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeIsCreateModalVisible: state => {
      state.isCreateModalVisible = !state.isCreateModalVisible;
    },
    changeHomeworkHeading: (state, action: PayloadAction<string>) => {
      state.homeworkHeading = action.payload;
    },
    changeHomeworkTask: (state, action: PayloadAction<string>) => {
      state.homeworkTask = action.payload;
    },
    clearHeadingAndTask: state => {
      state.homeworkHeading = '';
      state.homeworkTask = '';
    },
  },
});

export const {
  changeIsCreateModalVisible,
  changeHomeworkHeading,
  changeHomeworkTask,
  clearHeadingAndTask,
} = appSlice.actions;
