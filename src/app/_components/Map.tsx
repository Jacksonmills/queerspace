"use client";

import {
  useLoadScript,
  type Libraries,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { getDetails, getGeocode, getLatLng } from "use-places-autocomplete";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Combobox } from "./Combobox";
import CreatePlace from "./CreatePlace";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Map() {
  const [location, setLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

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
      <Card>
        <CardHeader>
          <Input disabled />
        </CardHeader>
        <CardContent>
          <Button className="w-full" disabled>Loading...</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-baseline justify-between">
        <Combobox
          onAddressSelect={async (address) => {
            await getGeocode({ address: address }).then(async (results) => {
              if (!results[0]) return console.error("No results found");
              const { lat, lng } = getLatLng(results[0]);
              const details = await getDetails({ placeId: results[0].place_id });
              if (typeof details === 'string') return console.error("No details found");
              const { name, formatted_address } = details;
              if (!name || !formatted_address) return console.error("No details found");
              setLocation({ lat, lng });
              setName(name);
              setAddress(formatted_address);
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
      <CardContent>
        <CreatePlace name={name} address={address} />
        {/* <GoogleMap
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
        </GoogleMap> */}
      </CardContent>
    </Card>
  );
}
