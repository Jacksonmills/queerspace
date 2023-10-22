"use client";

import {
  useLoadScript,
  GoogleMap,
  type Libraries,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import RotatingEmoji from "./RotatingEmoji";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Combobox } from "./Combobox";

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

  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => location, [location]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    [],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries as Libraries,
  });

  if (!isLoaded) {
    return (
      <div className="grid h-full w-full place-content-center">
        <RotatingEmoji emoji={["🌎", "🌍", "🌏"]} />
      </div>
    );
  }

  return (
    <div className="">
      <div></div>
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-baseline justify-between p-2">
          <Combobox
            onAddressSelect={async (address) => {
              await getGeocode({ address: address }).then((results) => {
                if (!results[0]) return console.error("No results found");
                const { lat, lng } = getLatLng(results[0]);
                setLocation({ lat, lng });
              });
            }}
          />
          {/* <div className='flex gap-2'>
            <Button variant={'ghost'}>Food</Button>
            <Button variant={'ghost'}>Gas/EV</Button>
            <Button variant={'ghost'}>Restroom</Button>
            <Button variant={'ghost'}>Shelter</Button>
            <Button variant={'ghost'}>Other</Button>
          </div> */}
        </CardHeader>
        <CardContent className="p-2">
          <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{
              width: "100%",
              height: "50vh",
              borderRadius: "0.5rem",
            }}
            onLoad={() => console.log("Map Component Loaded...")}
          >
            <MarkerF
              position={mapCenter}
              onLoad={() => console.log("Marker Loaded")}
            />
          </GoogleMap>
        </CardContent>
      </Card>
    </div>
  );
}
