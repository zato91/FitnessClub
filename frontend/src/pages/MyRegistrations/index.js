import React, {useState, useEffect} from 'react';
import "./style.css";
import api from '../../services/api'

export default function Myregistrations(){
    const [myEvents, setMyEvents] = useState([])
    const user = localStorage.getItem('user')

    useEffect(()=>{
        getMyEvents();
    },[])

    const getMyEvents = async () => {
        try {
            const response = await api.get('/registration', {headers: {user}})
            console.log(response)
        } catch (error) {
            
        }
    }
    

    return(
        <div>
            My registration component
        </div>
    )
} 