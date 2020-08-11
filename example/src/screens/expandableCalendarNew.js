import _ from 'lodash';
import React, {useState, useEffect} from 'react';
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
    title: '2020-08-10',
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
    title: '2020-08-11',
    data: [{}],
  },
  {
    title: '2020-08-12',
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
  // {
  //   title: dates[3],
  //   data: [
  //     {
  //       hour: '12am',
  //       duration: '1h',
  //       title: 'Ashtanga Yoga',
  //       services: ['Маникюр'],
  //     },
  //   ],
  // },
  // {title: dates[4], data: [{}]},
  // {
  //   title: dates[5],
  //   data: [
  //     {
  //       hour: '9pm',
  //       duration: '1h',
  //       title: 'Middle Yoga',
  //       services: ['Маникюр'],
  //     },
  //     {hour: '10pm', duration: '1h', title: 'Ashtanga', services: ['Маникюр']},
  //     {hour: '11pm', duration: '1h', title: 'TRX', services: ['Маникюр']},
  //     {hour: '11pm', duration: '1h', title: 'Break', services: []},
  //     {
  //       hour: '12pm',
  //       duration: '1h',
  //       title: 'Running Group',
  //       services: ['Маникюр'],
  //     },
  //   ],
  // },
  // {
  //   title: dates[6],
  //   data: [
  //     {
  //       hour: '12am',
  //       duration: '1h',
  //       title: 'Ashtanga Yoga',
  //       services: ['Маникюр'],
  //     },
  //   ],
  // },
  // {title: dates[7], data: [{}]},
  // {
  //   title: dates[8],
  //   data: [
  //     {
  //       hour: '9pm',
  //       duration: '1h',
  //       title: 'Pilates Reformer',
  //       services: ['Маникюр'],
  //     },
  //     {hour: '10pm', duration: '1h', title: 'Ashtanga', services: ['Маникюр']},
  //     {hour: '11pm', duration: '1h', title: 'TRX', services: ['Маникюр']},
  //     {
  //       hour: '12pm',
  //       duration: '1h',
  //       title: 'Running Group',
  //       services: ['Маникюр'],
  //     },
  //   ],
  // },
  // {
  //   title: dates[9],
  //   data: [
  //     {
  //       hour: '1pm',
  //       duration: '1h',
  //       title: 'Ashtanga Yoga',
  //       services: ['Педикюр'],
  //     },
  //     {
  //       hour: '2pm',
  //       duration: '1h',
  //       title: 'Deep Streches',
  //       services: ['Педикюр'],
  //     },
  //     {
  //       hour: '3pm',
  //       duration: '1h',
  //       title: 'Private Yoga',
  //       services: ['Педикюр'],
  //     },
  //   ],
  // },
  // {
  //   title: dates[10],
  //   data: [
  //     {hour: '12am', duration: '1h', title: 'Last Yoga', services: ['Педикюр']},
  //   ],
  // },
];

const bookings = [
  {
    customerName: 'Test',
    customerPhoneNumber: '+99823 414',
    end: 1597017600000,
    serviceName: 'Test 2',
    start: 1597017600000,
  },
  {
    customerName: 'Test',
    customerPhoneNumber: '+99823 414',
    end: 1597017600000,
    serviceName: 'Test 2',
    start: 1597021200000,
  },
];

const ExpandableCalendarScreen = (props) => {
  const [currentDate, setCurrentDate] = useState({
    dateString: '2020-08-11',
    day: 10,
    month: 8,
    timestamp: 1597017600000,
    year: 2020,
  });
  const [days, setDays] = useState([]);
  useEffect(() => {
    loadItems(currentDate);
    return () => {};
  }, [currentDate]);

  // loadItems - Method loops through 14 back and fourth and tries to find booking and fills appropriately
  const loadItems = (day) => {
    let tempSectionsArr = [];
    for (let i = -14; i < 14; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      // 1. This date is not yet filled -> check whether bookings exist and fill appropriately
      if (!days.some((day) => day.title === strTime)) {
        let tempDaySection = {
          title: strTime,
          data: [{}],
        };
        if (bookings.length > 0) {
          bookings.map((booking) => {
            //2. If bookings exist -> check whether booking.start matches current date
            if (
              new Date(booking.start).toISOString().split('T')[0] === strTime
            ) {
              //3. Remove empty object if bookings are found for this day. Empty objects are used to mark empty dates and render them
              if (_.isEmpty(tempDaySection.data[0])) {
                tempDaySection.data.shift();
              }
              // 4. Add booking info to sections data
              tempDaySection.data.push(booking);
            }
          });
        }
        tempSectionsArr.push(tempDaySection);
      }
    }
    setDays((days) => [...days, ...tempSectionsArr]);
  };

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  const onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  function buttonPressed() {
    Alert.alert('show more');
  }

  function itemPressed(id) {
    Alert.alert(id);
  }

  function renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>Записей нет</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return renderEmptyItem();
    }
    if (item.title !== 'Break') {
      return (
        <TouchableOpacity
          onPress={() => this.itemPressed(item.customerName)}
          style={styles.item}>
          <View>
            <Text style={styles.itemTitleText}>{item.customerName}</Text>
            <Text style={styles.itemServiceText}>{item.serviceName}</Text>
          </View>
          <View />
          <View>
            <Text style={styles.itemStartDateText}>{item.start}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.breakItem}>
          <Text style={styles.breakItemTitle}>Перерыв</Text>
          <Text style={styles.breakItemDate}>{item.end}</Text>
        </View>
      );
    }
  };

  const getMarkedDates = () => {
    const marked = {};
    days.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
  };

  const getTheme = () => {
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
  console.log('daysHook', days);
  return (
    <CalendarProvider
      date={'2020-08-11'}
      onDateChanged={onDateChanged()}
      onMonthChange={onMonthChange()}
      showTodayButton
      disabledOpacity={0.6}
      // theme={{
      //   todayButtonTextColor: themeColor
      // }}
      // todayBottomMargin={16}
    >
      {props.weekView ? (
        <WeekCalendar firstDay={1} markedDates={() => getMarkedDates()} />
      ) : (
        <ExpandableCalendar
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
          markedDates={getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          leftArrowImageSource={require('../img/previous.png')}
          rightArrowImageSource={require('../img/next.png')}
        />
      )}
      <AgendaList
        sections={days}
        // extraData={this.state}
        renderItem={(item) => renderItem(item)}
        // sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

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
    borderWidth: 0.9,
    borderColor: '#C7C7C7',
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

export default ExpandableCalendarScreen;
