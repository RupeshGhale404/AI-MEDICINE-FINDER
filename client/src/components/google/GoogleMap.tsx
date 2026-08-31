interface GoogleMapProps {
  address: string;
}

function GoogleMap({ address }: GoogleMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
    address
  )}`;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <iframe
        title="Google Maps"
        src={mapUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default GoogleMap;