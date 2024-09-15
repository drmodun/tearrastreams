"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { MapEventType } from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Link from "next/link";
import { Button } from "@/components/ui/common/button";
import Script from "next/script";

const Dashboard: React.FC = () => {
  const [coordinates, setCoordinates] = useState<[number, number][]>([
    [2.3505089979081504, 41.560252961344816],
    [2.3505089979081504, 41.560252961344816],
    [2.3505089979081504, 41.560252961344816],
    [2.3505089979081504, 41.560252961344816],
  ]);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const handleSubmit = () => {
    console.log("submitting coordinates", coordinates);
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoid29uZGVyZmVlbCIsImEiOiJjbTEyZmdnajkwdmU3MmtzOHlvYXYyZHJvIn0.2PlXKgkiDN0s5P908aGSNQ"; // Replace with your actual Mapbox access token

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.3505089979081504, 41.560252961344816],
      zoom: 5,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });

    mapRef.current.addControl(draw);

    function updateArea() {
      const data = draw.getAll();
      console.log(data);
      if (data.features.length > 0) {
        //eslint-disable-next-line
        // @ts-ignore
        const coords = data.features[0].geometry.coordinates[0] as [
          number,
          number
        ][];
        console.log(coords);

        if (coords.length !== 5) {
          alert("No more than 4 points");
          draw.deleteAll();
          setCoordinates([]);
          return;
        }
        setCoordinates(coords || []);
      }
    }

    mapRef.current.on("draw.create" as MapEventType, updateArea);
    mapRef.current.on("draw.delete" as MapEventType, updateArea);
    mapRef.current.on("draw.update" as MapEventType, updateArea);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          mapRef.current?.setCenter([
            position.coords.longitude,
            position.coords.latitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <main className="flex h-[50vw] w-full justify-center item-center flex-col">
      <div className="container w-full justify-between mx-auto">
        <section className="section w-full justify-between">
          <div className="flex  justify-between w-full gap-x-[5vw]">
            <div className="w-full md:w-6/12 lg:w-6/12">
              <div id="map" ref={mapContainer} className="h-[20vw]"></div>
            </div>
            <div className=" md:w-6/12 lg:w-6/12">
              <h2 className="text-2xl font-bold">Add Your GeoData</h2>
              <p className="text-base">
                Place the cursor on the map and click. After you finish, click
                Enter.
              </p>
              <form className="form" id="coordinates" onSubmit={handleSubmit}>
                {coordinates.map((coord, index) => (
                  <input
                    key={index}
                    type="text"
                    className="input-field w-[25vw] py-2 px-4 border border-gray-300 rounded mt-2"
                    disabled
                    id={`coordinate${index + 1}`}
                    value={`${coord[0]}, ${coord[1]}`}
                    readOnly
                  />
                ))}
                <Link href="/report">
                  <Button
                    type="submit"
                    className="button  text-white py-2 px-4 rounded mt-2"
                  >
                    Get info
                  </Button>
                </Link>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></Script>
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></Script>
      <Script
        src="https://kit.fontawesome.com/your-font-awesome-kit-id.js"
        crossOrigin="anonymous"
      ></Script>
      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></Script>
      <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.3/mapbox-gl-draw.js"></Script>
    </main>
  );
};

export default Dashboard;
