import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation'
import { Alert, View, Image, Text, StyleSheet, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';

import api from '../services/api'

function SpotList({ navigation }){
    const [books, setBooks] = useState([])

    useEffect(() => {
        async function loadBooks(){
            const user_id = await AsyncStorage.getItem('user')
            const response = await api.get(`/bookings/${user_id}`)

            setBooks(response.data);
        }
        loadBooks();
    }, [])

    function handleNavigate(item){
        Alert.alert(
            'Apagar reserva',
            `Deseja apagar a reserva em ${item.spot.company} no dia ${item.date}`,
            [
              {
                text: 'Sim',
                onPress: () => {
                    api.delete(`/bookings/delete/${item._id}`)
                    Alert.alert('Reserva cancelada')
                },
              },
              {
                text: 'Não', 
                onPress: () => console.log('Não Pressed')},
            ],
            {cancelable: false},
          );
    }    

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Suas reservas <Text style={styles.bold}>não respondidas</Text></Text>
            <FlatList
                style={styles.list}
                data={books}
                keyExtractor={books => books._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (item.approved == undefined ? 
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.spot.thumbnail_url }} />
                        <Text style={styles.company}>{item.spot.company}</Text>
                        <Text style={styles.date }>{item.date}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item)} style={styles.button}>
                            <Text style={styles.buttonText}>Cancelar reserva</Text>
                        </TouchableOpacity>
                    </View>
                    : <View></View>
                )}
            />
            <Text style={styles.title}>Suas reservas <Text style={styles.bold}>respondidas</Text></Text>
            <FlatList
                style={styles.list}
                data={books}
                keyExtractor={books => books._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={( { item }) => (item.approved != undefined ? 
                    <View style={styles.listItem}>
                        
                        <Image style={styles.thumbnail} source={{ uri: item.spot.thumbnail_url }} />
                        <Text style={styles.company}>{item.spot.company}</Text>
                        <Text style={styles.date }>{item.date}</Text>
                        
                        {item.approved ? <Text style={styles.accepted}>Aceito</Text> : <Text style={styles.declined}>Recusado</Text>}
                    </View>
                    : <View></View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 30,
    },
    accepted : {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
        color: '#84c870',
    },
    declined : {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
        color: '#e55e5e',
    },
    title: {
        fontSize: 20,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: "bold",
    },

    list: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: "cover",
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#333',
    },

    date: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15, 
    },
})

export default withNavigation(SpotList);