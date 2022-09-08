import React, {FC} from 'react';
import {Homework} from '../interfaces/Homework';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {changeIsFinished, deleteHomework} from '../redux/homework/homework';
import TrashIcon from './TrashIcon';
interface HomeworkItemProps {
  item: Homework;
}
const HomeworkItem: FC<HomeworkItemProps> = ({item}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <CheckBox
        value={item.isFinished}
        onValueChange={value =>
          dispatch(changeIsFinished({id: item.id, value}))
        }
      />
      <View style={styles.homeworkInfo}>
        <View style={styles.textWrap}>
          <Text style={[styles.text, styles.textHeading]}>{item.heading}</Text>
          <Text style={[styles.text]}>{item.task}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => dispatch(deleteHomework(item.id))}>
        <View style={styles.deleteIcon}>
          <TrashIcon />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 27,
    paddingBottom: 11,
    borderTopWidth: 1,
    borderTopColor: '#EEF8FD',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    maxWidth: '100%',
  },
  homeworkInfo: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 17,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    color: '#3B3B3B',
  },
  textWrap: {
    flexShrink: 1,
    flexGrow: 0,
  },
  deleteIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 26,
  },
});
export default HomeworkItem;
