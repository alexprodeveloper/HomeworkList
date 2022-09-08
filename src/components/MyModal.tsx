import React, {FC, useMemo} from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {v4 as uuidv4} from 'uuid';
import {
  changeIsCreateModalVisible,
  changeHomeworkHeading,
  changeHomeworkTask,
  clearHeadingAndTask,
} from '../redux/app/app';
import {add} from '../redux/homework/homework';
interface MyModalProps {}
const MyModal: FC<MyModalProps> = ({}) => {
  const isCreateModalVisible = useSelector(
    (state: RootState) => state.app.isCreateModalVisible,
  );
  const homeworkHeading = useSelector(
    (state: RootState) => state.app.homeworkHeading,
  );
  const homeworkTask = useSelector(
    (state: RootState) => state.app.homeworkTask,
  );
  const isCreateButtonDisabled: boolean = useMemo(() => {
    return !homeworkTask || !homeworkHeading;
  }, [homeworkTask, homeworkHeading]);
  const dispatch = useDispatch();

  const createHomeworkTask = () => {
    const id = uuidv4();
    dispatch(
      add({
        heading: homeworkHeading,
        task: homeworkTask,
        isFinished: false,
        id,
      }),
    );
    dispatch(clearHeadingAndTask());
    dispatch(changeIsCreateModalVisible());
  };
  return (
    <Modal
      isVisible={isCreateModalVisible}
      backdropColor={'rgba(249, 249, 249, 0.94)'}
      onBackButtonPress={() => dispatch(changeIsCreateModalVisible())}
      onBackdropPress={() => dispatch(changeIsCreateModalVisible())}
      style={styles.modal}>
      <View style={styles.content}>
        <Text style={styles.heading}>Добавить предмет</Text>
        <Text style={styles.text}>Укажите заголовок и задание</Text>
        <TextInput
          onChangeText={text => dispatch(changeHomeworkHeading(text))}
          value={homeworkHeading}
          style={styles.input}
          placeholder={'Заголовок'}
          placeholderTextColor={'rgba(60, 60, 67, 0.3)'}
          multiline={false}
        />
        <TextInput
          onChangeText={text => dispatch(changeHomeworkTask(text))}
          value={homeworkTask}
          style={styles.input}
          placeholder={'Задание'}
          placeholderTextColor={'rgba(60, 60, 67, 0.3)'}
          multiline={false}
        />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableWithoutFeedback>
              <Text
                style={[styles.buttonText, styles.buttonCancel]}
                onPress={() => dispatch(changeIsCreateModalVisible())}>
                Отмена
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.button}>
            <TouchableWithoutFeedback disabled={isCreateButtonDisabled}>
              <Text
                style={[
                  styles.buttonText,
                  isCreateButtonDisabled && {opacity: 0.5},
                ]}
                onPress={() => createHomeworkTask()}>
                Сохранить
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    borderRadius: 14,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    backgroundColor: 'rgb(230,230,230)', //226,226,226
    borderRadius: 14,
  },
  heading: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 22,
    color: '#3B3B3B',
  },
  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#737A82',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(60, 60, 67, 0.3)',
    borderRadius: 7,
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 6,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#3B3B3B',
    height: 32,
    justifyContent: 'center',
    paddingVertical: 0,
    backgroundColor: '#FFF',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 17,
    justifyContent: 'space-between',
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    paddingTop: 12,
    paddingBottom: 10,
    fontStyle: 'normal',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    color: '#3784CC',
  },
  buttonCancel: {
    color: '#C3C3C5',
  },
});
export default MyModal;
