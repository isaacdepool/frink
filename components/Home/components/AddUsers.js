import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import useStateRef from 'react-usestateref';

import DeleteIcon from '../../../assets/icons/delete.svg';
import UserIcon from '../../../assets/icons/user-blanco.svg';
import CheckIcon from '../../../assets/icons/Icon-check.svg';

var s = require('../../../style');

export const AddUsers = () => {

    const [name, setName, nameRef] = useStateRef(''); // Value to input
    const [list, setList, listRef] = useStateRef([]); // List of user

    // Get data User 
    useEffect(() => {
        AsyncStorage.getItem('users').then(response => {
    
            if(response  != null) {  
            
                let data = JSON.parse(response);
                setList(data);
            }
        }).catch( error =>{
            console.log('Error',error);
        })
    }, [])
    
    // Add name to value input  
    const handleChange = (type, value) =>{
        setName(value);
    }

    // Add user to List 
    const addFriend = () =>{

        // ADD User 
        let copyData = listRef.current;
        const obj={
            name: nameRef.current
        }
        copyData.unshift(obj);
        setList(copyData);
        setName('');

        // Save user 
        saveUsers();
    }

    // Save user on storage
    const saveUsers = () =>{

        AsyncStorage.setItem('users', JSON.stringify(listRef.current)).then().catch(error =>  console.log(error , "error users"));

    }

    // Delete all users 
    const hadleDeleteAll = () =>{

        AsyncStorage.removeItem('users')
            .then( _ =>{
                setList([]);
        }).catch(err => console.log('Error to delet users', err));
    }

    // Delete only user selected 
    const hadleDelete = (id) =>{

        let listCopy = [...listRef.current]
        const index = listCopy.findIndex(item => item.id == id);
        if (index > -1) {
            listCopy.splice(index, 1);
        } 

        setList(listCopy);
        saveUsers();
    }

  return (
    <>
        <View style={[s.contenedorFlexSpaceBetween, s.mx3]}>
            <Text style={[s.fontSize18, s.fontFamily2, s.ColorPurple]}>ADD FRIEND</Text>

            {/* Delete users  */}
            <TouchableOpacity onPress={hadleDeleteAll}>
                <Text style={[s.colorRed, s.fontSize16]}>Delete All</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={[s.mb2]}>
            <View style={[s.mx3]}>
                
                <View>

                    {/* Add users  */}
                    <View style={[s.contenedorFlexSpaceBetween]}>
                        <View style={[s.mt3, s.contenedorFlex]}>
                            <TouchableOpacity style={[styles.avatar, s.bg_quarternary, s.mr2, nameRef.current !='' && {backgroundColor: '#fff'}]}
                            disabled={nameRef.current ==''}
                            onPress={addFriend}
                            >
                                {
                                    nameRef.current =='' 
                                    ?
                                    <UserIcon width={40} height={40} />
                                    :
                                    <CheckIcon width={50} height={50} />
                                }
                            </TouchableOpacity>
                            <TextInput
                                style={[styles.inp, s.w80, s.fontSize16]}
                                placeholder='Add name'
                                value={nameRef.current}
                                onChangeText={(e) => handleChange('name',e.toString())}
                                onSubmitEditing ={addFriend}
                                returnKeyType="done"
                            />
                        </View>
                    </View>

                    {/* List users  */}
                    {
                        listRef.current.length > 0&&
                        listRef.current.map((item, i) =>(

                            <View style={[s.contenedorFlexSpaceBetween]}>
                                <View style={[s.mt3, s.contenedorFlex]}
                                key={i}
                                >
                                    <View style={[styles.avatar, s.bg_quarternary, s.mr2]}>
                                        <Text style={[s.Color_primary, s.fontSize18]}>{listRef.current.length - (i)}</Text>
                                    </View>
                                    <Text>{item.name}</Text>
                                </View>

                                <TouchableOpacity style={[s.p2]}
                                onPress={() => hadleDelete(item.id)}
                                >
                                    <DeleteIcon width={20} height={20} />
                                </TouchableOpacity>
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