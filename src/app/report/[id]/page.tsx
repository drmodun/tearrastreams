"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { MapEventType } from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/common/button";

const Dashboard: React.FC = () => {
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
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
          alert("No se pueden establecer más de 4 puntos");
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Get your Environmental Evaluation Report
      </h1>
      <div className="flex">
        <div className="w-1/2">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span> 📍 coordinates </span>
              <span> 📅 date </span>
              <span> 📏 Area, sq.km </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-green-500">
              <div className="flex items-center space-x-2">
                <i className="fas fa-leaf"> </i>
                <span> Vegetation Health Data (NDVI Sentinel-2) </span>
              </div>
              <span> 0.70 </span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <i className="fas fa-tint"> </i>
                <span> Soil Moisture Levels </span>
              </div>
              <span> 0.25 </span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <i className="fas fa-water"> </i>
                <span>
                  {" "}
                  Water Pollution Levels (Chlorophyll-a Concentration) mg/m²{" "}
                </span>
              </div>
              <span> 25 </span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <i className="fas fa-smog"> </i>
                <span> Air Pollution Index (PM2.5), µg/m³ </span>
              </div>
              <span> 35 </span>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Final Risk Assessment Rating
            </h2>
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                medium
              </span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Deforestation Risk: Moderate vegetation loss, but still viable
                forest cover.
              </li>
              <li>
                Water and Air Pollution: Both show moderate signs of
                environmental degradation, but manageable with proper
                intervention.
              </li>
              <li>
                Soil Moisture: Soil condition is stable and supports the
                ecosystem&apos;s current health.
              </li>
            </ul>
          </div>
          <Link href={"/map"}>
            <Button className="mt-6 bg-purple-600 text-white px-4 py-2 rounded">
              Add new GeoData
            </Button>
          </Link>
        </div>
        <div className="w-1/2 pl-6">
          <div id="map" ref={mapContainer} className="h-full w-full"></div>
        </div>
      </div>
      <Script src="https://code.jq/apps/terraStream/uery.com/jquery-3.5.1.slim.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></Script>
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></Script>
      <Script
        src="https://kit.fontawesome.com/your-font-awesome-kit-id.js"
        crossOrigin="anonymous"
      ></Script>
      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></Script>
      <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.3/mapbox-gl-draw.js"></Script>
    </div>
  );
};

export default Dashboard;
