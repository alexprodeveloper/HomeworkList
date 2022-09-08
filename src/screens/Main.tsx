import React, {FC, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import type {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {changeIsCreateModalVisible} from '../redux/app/app';
import MyModal from '../components/MyModal';
import HomeworkItem from '../components/HomeworkItem';
import {HomeworkTypes} from '../interfaces/Homework';
import ActionSheet from 'react-native-action-sheet';
import {changeHomeworkType} from '../redux/homework/homework';
interface MainProps {}
const Main: FC<MainProps> = ({}) => {
  const homework = useSelector((state: RootState) => state.homework.homework);
  const homeworkType = useSelector(
    (state: RootState) => state.homework.homeworkType,
  );
  const dispatch = useDispatch();
  const renderItem = ({item}) => {
    return <HomeworkItem item={item} key={item.id} />;
  };
  const [height, setHeight] = useState(0);
  const homeworkForRender = useMemo(() => {
    switch (homeworkType) {
      case HomeworkTypes.ALL:
        return homework;
      case HomeworkTypes.FINISHED:
        return homework.filter(work => work.isFinished);
      case HomeworkTypes.NOT_FINISHED:
        return homework.filter(work => !work.isFinished);
    }
  }, [homework, homeworkType]);
  const showActionSheet = () => {
    const options: string[] = [
      HomeworkTypes.ALL,
      HomeworkTypes.FINISHED,
      HomeworkTypes.NOT_FINISHED,
    ];
    let CANCEL_INDEX = 2;
    if (Platform.OS === 'ios') {
      options.push('Отмена');
    }

    ActionSheet.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: CANCEL_INDEX,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          dispatch(changeHomeworkType(HomeworkTypes.ALL));
        } else if (buttonIndex === 1) {
          dispatch(changeHomeworkType(HomeworkTypes.FINISHED));
        } else if (buttonIndex === 2) {
          dispatch(changeHomeworkType(HomeworkTypes.NOT_FINISHED));
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <MyModal />
      <TouchableWithoutFeedback onPress={showActionSheet}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{homeworkType}</Text>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={styles.flatListContainer}
        onLayout={event => setHeight(event.nativeEvent.layout.height)}>
        <FlatList
          data={homeworkForRender}
          renderItem={renderItem}
          style={{height}}
        />
      </View>
      <TouchableWithoutFeedback
        onPress={() => dispatch(changeIsCreateModalVisible())}>
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButtonText}>Добавить</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 46,
    paddingBottom: 30,
    maxHeight: Dimensions.get('screen').height,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3785CC',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.084,
    color: '#3785CC',
  },
  addButtonContainer: {
    paddingVertical: 15,
    backgroundColor: '#3785CC',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
  addButtonText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  flatListContainer: {
    flexGrow: 1,
    marginTop: 44,
  },
});
export default Main;
