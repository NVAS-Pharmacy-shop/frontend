import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngTuple, Icon } from 'leaflet';
import './map.css';
import "leaflet/dist/leaflet.css";
import api from '../api';

const MapComponent: React.FC = () => {

    type MarkerType = {
        geocode: [number, number];
        popUp: string;
    };

    const [startEndMarkers, setStartEndMarkers] = useState<MarkerType[]>([]);
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [updateFrequency, setUpdateFrequency] = useState('1');

    useEffect(() => {
        let url = 'ws://localhost:8000/ws/socket-server/';
        const chatSocket = new WebSocket(url);

        chatSocket.onmessage = function (e) {
            let data = JSON.parse(e.data);

            if (data.coordinates) {
                let newMarker = {
                    geocode: data.coordinates,
                    popUp: 'Current position'
                };
                setMarkers([newMarker]);
            } else {
                console.error('Coordinates are undefined');
            }
        };

        chatSocket.onopen = function (e) {
        };

        chatSocket.onerror = function (error) {
            console.log('WebSocket Error: ', error);
        };

        return () => {
            chatSocket.close();
        };
    }, []);

    const markerIcon = new Icon({
        iconUrl: process.env.PUBLIC_URL + '/locationMarker.png',
        iconSize: [42, 42]
    })

    const truckIcon = new Icon({
        iconUrl: process.env.PUBLIC_URL + '/truckMarker.png',
        iconSize: [38, 38]
    })

    const handleButtonClick = async () => {
        try {
            const response = await api.post(`locationsim/coordinates/`, {updateFrequency}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { start_coordinates, end_coordinates } = response.data;
            setStartEndMarkers([
                { geocode: start_coordinates, popUp: 'Start point' },
                { geocode: end_coordinates, popUp: 'End point' }
            ]);
        } catch (error) {
            console.error('Error asking for coordinates: ', error);
            throw error;
        }
    };

    const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUpdateFrequency(event.target.value);
    };

    return (
        <div className="parent-div">
            <button onClick={handleButtonClick} className='start-button'>Start delivery</button>
            <div className="frequency-div">
                Update frequency:
                <select className="frequency-select" value={updateFrequency} onChange={handleFrequencyChange}>
                    <option value="1">1s</option>
                    <option value="3">3s</option>
                    <option value="5">5s</option>
                    <option value="10">10s</option>
                    <option value="30">30s</option>
                    <option value="60">1min</option>
                </select>
            </div>
            <MapContainer center={[45.261891, 19.831375]} zoom={13} className="map-container" >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {startEndMarkers.map(marker => (
                    <Marker position={marker.geocode as LatLngTuple} icon={markerIcon}>
                        <Popup>
                            <p style={{ fontSize: '1.3em' }}>{marker.popUp}</p>
                        </Popup>
                    </Marker>
                ))}
                {markers.map(marker => (
                    <Marker position={marker.geocode as LatLngTuple} icon={truckIcon}>
                        <Popup>
                            <p style={{ fontSize: '1.3em' }}>{marker.popUp}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapComponent;