import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';
import menu from '../assets/Menu.png';
import home from '../assets/home.png';
import SpotList from '../components/SpotList'

export default function List({ navigation }){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.110:8080', {
                query: { user_id }
            })
            
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            
            setTechs(techsArray);
        })
    }, []);

    function handleList(){
        navigation.navigate('List');
    }
    function handleBooks(){
        navigation.navigate('Books');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
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
        marginTop: 20,
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16, 
    },
    footer: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0
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