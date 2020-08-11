import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';

const testIDs = require('../testIDs');

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

const ITEMS = [
  {
    title: dates[0],
    data: [
      {
        hour: '12am',
        duration: '1h',
        title: 'Asalya Yuldasheva',
        services: ['Шилак'],
      },
    ],
  },
  {
    title: dates[1],
    data: [
      {hour: '4pm', duration: '1h', title: 'Diana', services: ['Шилак']},
      {hour: '5pm', duration: '1h', title: 'Malika', services: ['Педикюр']},
      {hour: '11pm', duration: '1h', title: 'Break', services: []},
    ],
  },
  {
    title: dates[2],
    data: [
      {hour: '1pm', duration: '1.5h', title: 'Asalya', services: ['Маникюр']},
      {hour: '2pm', duration: '1h', title: 'Deep', services: ['Маникюр']},
      {
        hour: '3pm',
        duration: '1h',
        title: 'Private Yoga',
        services: ['Маникюр'],
      },
    ],
  },
  {
    title: dates[3],
    data: [
      {
        hour: '12am',
        duration: '1h',
        title: 'Ashtanga Yoga',
        services: ['Маникюр'],
      },
    ],
  },
  {title: dates[4], data: [{}]},
  {
    title: dates[5],
    data: [
      {
        hour: '9pm',
        duration: '1h',
        title: 'Middle Yoga',
        services: ['Маникюр'],
      },
      {hour: '10pm', duration: '1h', title: 'Ashtanga', services: ['Маникюр']},
      {hour: '11pm', duration: '1h', title: 'TRX', services: ['Маникюр']},
      {hour: '11pm', duration: '1h', title: 'Break', services: []},
      {
        hour: '12pm',
        duration: '1h',
        title: 'Running Group',
        services: ['Маникюр'],
      },
    ],
  },
  {
    title: dates[6],
    data: [
      {
        hour: '12am',
        duration: '1h',
        title: 'Ashtanga Yoga',
        services: ['Маникюр'],
      },
    ],
  },
  {title: dates[7], data: [{}]},
  {
    title: dates[8],
    data: [
      {
        hour: '9pm',
        duration: '1h',
        title: 'Pilates Reformer',
        services: ['Маникюр'],
      },
      {hour: '10pm', duration: '1h', title: 'Ashtanga', services: ['Маникюр']},
      {hour: '11pm', duration: '1h', title: 'TRX', services: ['Маникюр']},
      {
        hour: '12pm',
        duration: '1h',
        title: 'Running Group',
        services: ['Маникюр'],
      },
    ],
  },
  {
    title: dates[9],
    data: [
      {
        hour: '1pm',
        duration: '1h',
        title: 'Ashtanga Yoga',
        services: ['Педикюр'],
      },
      {
        hour: '2pm',
        duration: '1h',
        title: 'Deep Streches',
        services: ['Педикюр'],
      },
      {
        hour: '3pm',
        duration: '1h',
        title: 'Private Yoga',
        services: ['Педикюр'],
      },
    ],
  },
  {
    title: dates[10],
    data: [
      {hour: '12am', duration: '1h', title: 'Last Yoga', services: ['Педикюр']},
    ],
  },
];

export default class ExpandableCalendarScreen extends Component {
  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>Выходной</Text>
      </View>
    );
  }

  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }
    if (item.title !== 'Break') {
      return (
        <TouchableOpacity
          onPress={() => this.itemPressed(item.title)}
          style={styles.item}>
          <View>
            <Text style={styles.itemTitleText}>{item.title}</Text>
            <Text style={styles.itemServiceText}>{item.services[0]}</Text>
          </View>
          <View />
          <View>
            <Text style={styles.itemStartDateText}>{item.hour}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.breakItem}>
          <Text style={styles.breakItemTitle}>Перерыв</Text>
          <Text style={styles.breakItemDate}>{item.hour}</Text>
        </View>
      );
    }
  };

  getMarkedDates = () => {
    const marked = {};
    ITEMS.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
  };

  getTheme = () => {
    const disabledColor = 'grey';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: {padding: 0},
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2},
    };
  };

  render() {
    return (
      <CalendarProvider
        date={ITEMS[0].title}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // theme={{
        //   todayButtonTextColor: themeColor
        // }}
        // todayBottomMargin={16}
      >
        {this.props.weekView ? (
          <WeekCalendar
            testID={testIDs.weekCalendar.CONTAINER}
            firstDay={1}
            markedDates={this.getMarkedDates()}
          />
        ) : (
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.calendar} // for horizontal only
            // disableWeekScroll
            // theme={this.getTheme()}
            disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
            leftArrowImageSource={require('../img/previous.png')}
            rightArrowImageSource={require('../img/next.png')}
          />
        )}
        <AgendaList
          sections={ITEMS}
          extraData={this.state}
          renderItem={this.renderItem}
          // sectionStyle={styles.section}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  item: {
    marginLeft: 72,
    paddingHorizontal: 20,
    marginRight: 20,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgrey',
    backgroundColor: '#FED985',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
  },
  itemServiceText: {
    color: 'black',
    opacity: 0.8,
    lineHeight: 20,
  },
  itemStartDateText: {
    color: 'black',
    fontSize: 14,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    marginLeft: 72,
    paddingHorizontal: 20,
    marginRight: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    flexDirection: 'row',
  },
  emptyItemText: {
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
  },
  breakItem: {
    marginLeft: 72,
    paddingHorizontal: 20,
    marginRight: 20,
    paddingVertical: 10,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    flexDirection: 'row',
  },
  breakItemTitle: {
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
  },
  breakItemDate: {
    color: 'black',
    fontSize: 14,
    lineHeight: 24,
  },
});
