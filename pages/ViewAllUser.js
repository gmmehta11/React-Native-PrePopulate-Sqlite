//Screen to view all the user
import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

const ViewAllUser = () => {
  let [flatListItems, setFlatListIems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, result) => {
        var temp = [];
        for (let i = 0; i < reseults.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListIems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  let listItemView = (item) => {
    return (
      <View key={item.user_id} style={{backgroundColor: 'white', padding: 20}}>
        <Text>Id : {item.user_id}</Text>
        <Text>Name : {item.user_name}</Text>
        <Text>Contact : {item.user_contact}</Text>
        <Text>Address : {item.user_address}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Flatlist
            data={flatListItems}
            ItemseparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          Example of SQLite Database in React Native
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          Gaurav
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;