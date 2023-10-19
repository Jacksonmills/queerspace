'use client';

import { useLoadScript, GoogleMap, type Libraries } from '@react-google-maps/api';
import { useMemo } from 'react';

export default function Map() {
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(
    () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: libraries as Libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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