'use client';

import { useLoadScript, GoogleMap, type Libraries } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';

export default function Map() {
  const [location, setLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => location, [location]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? '',
    libraries: libraries as Libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='border rounded p-6 bg-white/10'>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '800px', height: '800px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      />
    </div>
  );
};