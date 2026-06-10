import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { MapPin, ShieldAlert, AlertCircle, Loader2 } from 'lucide-react';

export const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

export const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim() !== '';

// Subcomponent that handles smooth panning when map center changes
export function MapHandler({ center, zoom }: { center?: { lat: number; lng: number }; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);

  useEffect(() => {
    if (map && zoom !== undefined) {
      map.setZoom(zoom);
    }
  }, [map, zoom]);

  return null;
}

interface GoogleMapContainerProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  height?: string;
  zoom?: number;
  center?: { lat: number; lng: number };
  onLocationDetected?: (coords: { lat: number; lng: number }) => void;
}

export default function GoogleMapContainer({
  id = 'google-map',
  className = '',
  children,
  height = '400px',
  zoom = 12,
  center,
  onLocationDetected,
}: GoogleMapContainerProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationStatus, setLocationStatus] = useState<'pending' | 'success' | 'denied' | 'error'>('pending');

  // Standard defaults for Bangalore location
  const defaultLocation = { lat: 12.9716, lng: 77.5946 };

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation(defaultLocation);
      setLoadingLocation(false);
      setLocationStatus('error');
      if (onLocationDetected) onLocationDetected(defaultLocation);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setLoadingLocation(false);
        setLocationStatus('success');
        if (onLocationDetected) onLocationDetected(coords);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setUserLocation(defaultLocation);
        setLoadingLocation(false);
        setLocationStatus(error.code === error.PERMISSION_DENIED ? 'denied' : 'error');
        if (onLocationDetected) onLocationDetected(defaultLocation);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  if (!hasValidKey) {
    return (
      <div 
        id={id} 
        className={`bg-slate-50 rounded-xl border border-dashed border-slate-350 p-6 flex flex-col items-center justify-center text-center ${className}`}
        style={{ minHeight: height }}
      >
        <div className="max-w-md space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-3xs">
            <MapPin className="w-6 h-6 animate-bounce" />
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-sm font-extrabold text-slate-850 tracking-tight">Real Google Maps Integration</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To view real-time road coordinates, contractor boundaries, and citizen safety hazards on Google Maps, please provide an API Key.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-150 text-left text-[11px] space-y-2.5 shadow-3xs">
            <p className="font-bold text-slate-700 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-500" /> API Activation Instructions:
            </p>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600 leading-relaxed font-medium">
              <li>
                <a 
                  href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Get a Google Maps API Key
                </a>
              </li>
              <li>Wait for the <strong>"Enter your environment variable to continue"</strong> popup, or:</li>
              <li>
                Open <strong>Settings</strong> (⚙️ gear icon, top-right) → <strong>Secrets</strong>
              </li>
              <li>
                Type <code>GOOGLE_MAPS_PLATFORM_KEY</code>, paste your key, and press Enter.
              </li>
            </ol>
          </div>
          
          <p className="text-[10px] text-slate-400 font-medium">
            The application will rebuild automatically after saving. No browser refresh is required!
          </p>
        </div>
      </div>
    );
  }

  if (loadingLocation) {
    return (
      <div 
        className={`bg-slate-50 border border-slate-150 rounded-xl flex flex-col items-center justify-center text-slate-500 gap-3 ${className}`}
        style={{ height }}
      >
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <span className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">Detecting User Location...</span>
      </div>
    );
  }

  const mapCenter = center || userLocation || defaultLocation;

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className={`relative rounded-xl overflow-hidden shadow-xs border border-slate-200 ${className}`} style={{ height }}>
        <Map
          id={`${id}-gmap`}
          defaultCenter={mapCenter}
          center={mapCenter}
          defaultZoom={zoom}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          gestureHandling="cooperative"
          disableDefaultUI={false}
        >
          <MapHandler center={mapCenter} zoom={zoom} />
          {children}
        </Map>

        
      </div>
    </APIProvider>
  );
}
