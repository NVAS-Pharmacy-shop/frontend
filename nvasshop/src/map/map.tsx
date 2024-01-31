import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple, Icon } from 'leaflet';
import './map.css'; // Import the CSS file
import "leaflet/dist/leaflet.css";
import api from '../api';

const MapComponent: React.FC = () => {

    useEffect(() => {
        let url = 'ws://localhost:8000/ws/socket-server/';
        const chatSocket = new WebSocket(url);
    
        chatSocket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            console.log('Data: ', data);
        }
    
        chatSocket.onopen = function(e) {
            console.log('WebSocket is open');
        };
        
        chatSocket.onerror = function(error) {
            console.log('WebSocket Error: ', error);
        };
    }, []);

    const markers = [
        {
            geocode: [48.86, 2.3522],
            popUp: "Hello, I am pop up 1"
        },
        {
            geocode: [48.85, 2.3522],
            popUp: "Hello, I am pop up 2"
        },
        {
            geocode: [48.855, 2.34],
            popUp: "Hello, I am pop up 3"
        }
    ]

    const customIcon = new Icon({
        iconUrl: process.env.PUBLIC_URL + '/mapMarker.png',
        iconSize: [65, 65]
    })

    const handleButtonClick = async() => {
        try{
            const response = await api.post(`locationsim/coordinates/`, {
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }catch(error){
            console.error('Error asking for coordinates: ', error);
            throw error;
        }
    };

    return (
        <div>
            <button style={{margin: '10px'}} onClick={handleButtonClick}>Click me</button>
            <MapContainer center={[48.8566, 2.3522]} zoom={13} className="map-container" >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map(marker => (
                    <Marker position={marker.geocode as LatLngTuple} icon={customIcon}>
                        <Popup>
                            <h4>{marker.popUp}</h4>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapComponent;