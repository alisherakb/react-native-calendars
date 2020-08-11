import React, {Component, useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';

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

const AgendaScreen = () => {
  const [days, setDays] = useState([]);
  useEffect(() => {
    loadItems({
      dateString: '2020-08-10',
      day: 10,
      month: 8,
      timestamp: 1597017600000,
      year: 2020,
    });
    return () => {};
  }, []);

  const loadItems = (day) => {
    for (let i = -14; i < 14; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      // 1. This date is not yet filled -> check whether bookings exist on this date and fill appropriately,
      if (!days.some((day) => day.title === strTime)) {
        const tempDay = {
          title: strTime,
          data: [],
        };
        if (bookings.length > 0) {
          //2. If bookings exist -> check whether it matches current i
          bookings.map((booking) => {
            if (
              new Date(booking.start).toISOString().split('T')[0] === strTime
            ) {
              var tempData = Object.assign({}, booking);
              tempDay.data.push(tempData);
            }
          });
        }
        setDays((days) => [...days, tempDay]);
      }
    }
    console.log(days);
  };

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  return <View />;
};

export default AgendaScreen;

// export default class AgendaScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       items: {},
//     };
//   }

//   componentDidMount() {
//     this.loadItems({
//       dateString: '2020-08-10',
//       day: 10,
//       month: 8,
//       timestamp: 1597017600000,
//       year: 2020,
//     });
//   }

//   render() {
//     console.log('items', this.state.items);
//     return (
//       <View />
//       // <Agenda
//       //   testID={testIDs.agenda.CONTAINER}
//       //   items={this.state.items}
//       //   loadItemsForMonth={this.loadItems.bind(this)}
//       //   selected={Date()}
//       //   renderItem={this.renderItem.bind(this)}
//       //   renderEmptyDate={this.renderEmptyDate.bind(this)}
//       //   rowHasChanged={this.rowHasChanged.bind(this)}
//       //   pastScrollRange={50}
//       //   // markingType={'period'}
//       //   // markedDates={{
//       //   //    '2017-05-08': {textColor: '#43515c'},
//       //   //    '2017-05-09': {textColor: '#43515c'},
//       //   //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//       //   //    '2017-05-21': {startingDay: true, color: 'blue'},
//       //   //    '2017-05-22': {endingDay: true, color: 'gray'},
//       //   //    '2017-05-24': {startingDay: true, color: 'gray'},
//       //   //    '2017-05-25': {color: 'gray'},
//       //   //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//       //   // monthFormat={'yyyy'}
//       //   // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//       //   //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//       //   // hideExtraDays={false}
//       // />
//     );
//   }

//   loadItems(day) {
//     console.log('day', day);
//     const days = [
//       {
//         title: '2020-08-10',
//         data: [
//           {
//             customerName: 'Test',
//             customerPhoneNumber: '+99823414',
//             end: 1597145400000,
//             serviceName: 'Test2',
//             start: 1597141800000,
//           },
//         ],
//       },
//     ];
//     setTimeout(() => {
//       for (let i = -1; i < 2; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         if (!days.length) {
//         }
//         if (!days.includes(strTime)) {
//           console.log('bookings', strTime);
//           // this.state.items[strTime] = [];
//           // const numItems = Math.floor(Math.random() * 3 + 1);
//           // for (let j = 0; j < numItems; j++) {
//           //   this.state.items[strTime].push({
//           //     name: 'Item for ' + strTime + ' #' + j,
//           //     height: Math.max(50, Math.floor(Math.random() * 150)),
//           //   });
//           // }
//         } else {
//           console.log('noBook', strTime);
//         }
//       }
//       // const newItems = {};
//       // Object.keys(this.state.items).forEach((key) => {
//       //   newItems[key] = this.state.items[key];
//       // });
//       // this.setState({
//       //   items: [newItems],
//       // });
//     }, 1000);
//   }

//   renderItem(item) {
//     return (
//       <TouchableOpacity
//         testID={testIDs.agenda.ITEM}
//         style={[styles.item, {height: item.height}]}
//         onPress={() => Alert.alert(item.name)}>
//         <Text>{item.name}</Text>
//       </TouchableOpacity>
//     );
//   }

//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }
// }

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
