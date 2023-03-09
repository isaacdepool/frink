import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View, TextInput } from 'react-native'
import useStateRef from 'react-usestateref';
import { bg_secondary, colorWhite } from '../../../style';

var s = require('../../../style');

export const AddUsers = () => {

    const [name, setName, nameRef] = useStateRef('');
    const [list, setList, listRef] = useStateRef([]);

    useEffect(() => {
        AsyncStorage.getItem('users').then(response => {
    
            if(response  != null) {  
            
                let data = JSON.parse(response);
                console.log('entro',data);
                setList(data);
            }
        }).catch( error =>{
            console.log('Error',error);
        })
    }, [])
    
    const handleChange = (type, value) =>{
        setName(value);
    }

    const addFriend = () =>{
        let copyData = listRef.current;
        const obj={
            id: listRef.current.length + 1,
            name: nameRef.current
        }
        copyData.unshift(obj);
        setList(copyData);
        setName('');

        saveUsers();
    }

    const saveUsers = () =>{

        AsyncStorage.setItem('users', JSON.stringify(listRef.current)).then().catch(error =>  console.log(error , "error users"));

    }

    const hadleDelete = () =>{

        AsyncStorage.removeItem('users')
            .then( _ =>{
                setList([]);
        }).catch(err => console.log('Error to delet users', err));
    }

  return (
    <>
        <View style={[s.contenedorFlexSpaceBetween, s.mx3]}>
            <Text style={[s.fontSize18]}>Lista de Amigo</Text>

            <TouchableOpacity onPress={hadleDelete}>
                <Text style={[s.colorRed, s.fontSize16]}>Delete All</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={[s.mb2]}>
            <View style={[s.mx3]}>
                
                <View>
                    <View style={[s.contenedorFlexSpaceBetween]}>
                        <View style={[s.mt3, s.contenedorFlex]}>
                            <TouchableOpacity style={[styles.avatar, s.bg_quarternary, s.mr2, nameRef.current !='' && bg_secondary]}
                            disabled={nameRef.current ==''}
                            onPress={addFriend}
                            >
                                <Text style={[s.Color_primary, s.fontSize18, nameRef.current !='' && colorWhite]}>{nameRef.current !='' ? 'add' : listRef.current.length +1}</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={[styles.inp, s.w80, s.fontSize16]}
                                placeholder='Insertar nombre'
                                value={nameRef.current}
                                onChangeText={(e) => handleChange('name',e.toString())}
                            />
                        </View>
                    </View>

                    {
                        listRef.current.length > 0&&
                        listRef.current.map((item, i) =>(

                            <View style={[s.mt3, s.contenedorFlex]}
                            key={i}
                            >
                                <View style={[styles.avatar, s.bg_quarternary, s.mr2]}>
                                    <Text style={[s.Color_primary, s.fontSize18]}>{item.id}</Text>
                                </View>
                                <Text>{item.name}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    inp:{
        height: 40
    },
    btnInp:{
        height: 40,
        width: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    add:{
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
  });