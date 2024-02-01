import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngTuple, Icon } from 'leaflet';
import './map.css';
import "leaflet/dist/leaflet.css";
import api from '../api';

function MapClickHandler({ onClick }: { onClick: (e: any) => void }) {
    useMapEvents({
        click: onClick,
    });

    return null;
}

type MarkerType = {
    geocode: [number, number];
    popUp: string;
};

const MapComponent: React.FC = () => {

    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [clickMarkers, setClickMarkers] = useState<MarkerType[]>([]);
    const [startMarker, setStartMarker] = useState<MarkerType | null>(null);
    const [endMarker, setEndMarker] = useState<MarkerType | null>(null);
    const [activeMarker, setActiveMarker] = useState<'start' | 'end' | null>(null);

    const [updateFrequency, setUpdateFrequency] = useState('1');

    useEffect(() => {
        let url = 'ws://localhost:8000/ws/socket-server/';
        const chatSocket = new WebSocket(url);

        chatSocket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            console.log('Data: ', data);

            if (data.coordinates) {
                let newMarker = {
                    geocode: data.coordinates,
                    popUp: 'Current position'
                };
                console.log(newMarker)
                setMarkers([newMarker]);
            } else {
                console.error('Coordinates are undefined');
            }
        };

        chatSocket.onopen = function (e) {
            console.log('WebSocket is open');
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

    const handleStartDeliveryClick = async () => {
        try {
            if (startMarker && endMarker) 
            {
                const start_coordinates = startMarker.geocode;
                const end_coordinates = endMarker.geocode;
                const response = await api.post(`locationsim/coordinates/`,
                { 
                    updateFrequency, 
                    start_coordinates, 
                    end_coordinates 
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Response: ', response);
            }
            
        } catch (error) {
            console.error('Error asking for coordinates: ', error);
            throw error;
        }
    };

    const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUpdateFrequency(event.target.value);
    };

    const addMarker = (e: any) => {
        const newMarker: MarkerType = {
            geocode: [e.latlng.lat, e.latlng.lng],
            popUp: activeMarker === 'start' ? 'Start location' : 'End location'
        };

        if (activeMarker === 'start') {
            setStartMarker(newMarker);
            setActiveMarker(null);
        } else if (activeMarker === 'end') {
            setEndMarker(newMarker);
            setActiveMarker(null);
        }
    };

    const handleStartClick = () => {
        setActiveMarker('start');
    };

    const handleEndClick = () => {
        setActiveMarker('end');
    };

    return (
        <div className="parent-div">
            <div className="buttons-div">
                <button onClick={handleStartClick} disabled={activeMarker === 'end'} className='marker-button'>Add start marker</button>
                <button onClick={handleStartDeliveryClick} className='start-button'>Start delivery</button>
                <button onClick={handleEndClick} disabled={activeMarker === 'start'} className='marker-button'>Add end marker</button>
            </div>
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
            <MapContainer center={[45.261891, 19.831375]} zoom={13} className="map-container">
                <MapClickHandler onClick={addMarker} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {startMarker && <Marker position={startMarker.geocode} icon={markerIcon}><Popup>{startMarker.popUp}</Popup></Marker>}
                {endMarker && <Marker position={endMarker.geocode} icon={markerIcon}><Popup>{endMarker.popUp}</Popup></Marker>}
                {markers.map(marker => (
                    <Marker position={marker.geocode as LatLngTuple} icon={truckIcon}>
                        <Popup>
                            <p style={{ fontSize: '1.3em' }}>{marker.popUp}</p>
                        </Popup>
                    </Marker>
                ))}
                {clickMarkers.map((marker, index) => (
                    <Marker key={index} position={marker.geocode as LatLngTuple} icon={markerIcon}>
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