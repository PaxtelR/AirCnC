import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { SafeAreaView, ScrollView, Image, StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import logo from '../assets/logo.png';
import menu from '../assets/Menu.png';
import home from '../assets/home.png';
import BookList from '../components/BookList'

export default function Books({ navigation }){
    
    async function handleLogout(){
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('techs');
        navigation.navigate('Login');
    }
    function handleList(){
        navigation.navigate('List');
    }
    function handleBooks(){
        navigation.navigate('Books');
    }

    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ScrollView>
                <BookList/>   
                <TouchableOpacity onPress={() => handleLogout()} style={styles.sairButton}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>             
            </ScrollView>            
            <SafeAreaView style={styles.menu}>
                <TouchableOpacity onPress={() => handleList()} style={styles.menuButton}>
                    <Image style={styles.logo} source={home}/>
                </TouchableOpacity>      
                <TouchableOpacity onPress={() => handleBooks()} style={styles.menuButton}>
                    <Image style={styles.logo} source={menu}/>
                </TouchableOpacity>                  
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        left: 0, 
        right: 0, 
        bottom: 0,
        marginTop: 20,
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sairButton: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16, 
    },
    menu: {
        flexDirection: 'row'
    },
    menuButton: {
        width: '50%',
        height: 42,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})