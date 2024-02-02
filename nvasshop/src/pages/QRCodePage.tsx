import React, { useEffect, useState } from 'react';
import api from '../api';

const QRCodePage = () => {
    const [urls, setUrls] = useState<string[]>([]);

    // Fetch URLs from backend
    useEffect(() => {
        fetchUrlsFromBackend().then(setUrls);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {urls.map((url, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <img src={"http://localhost:8000/" + url} alt={`QR code ${index + 1}`} style={{width: "100px",}} />
                    <div>{url.split('.')[0].substring(7)}</div>
                </div>
            ))}
        </div>
    );
};

async function fetchUrlsFromBackend(): Promise<string[]> {
    const response = await api.get('/company/qrcodes/', 
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );
    console.log(response.data.urls);
    return response.data.qr_code;
}

export default QRCodePage;