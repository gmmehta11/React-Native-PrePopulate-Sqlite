//Delete the user
import react, {useState} from 'react';
import {Button, Text, View, Alert, SafeAreaView} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

const DeleteUser = ({navigation}) => {
  let [inputUserid, setInputUserId] = useState('');
  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_user WHERE user_id=?',
        [inputUserid],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={(inputuserId) => setInputUserId(inputUserId)}
            style={{padding: 10}}
          />
          <Mybutton title="Delete User" customClick={deleteuser} />
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
