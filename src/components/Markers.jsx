import { useMapEvents } from 'react-leaflet';

const Markers = (props) => {
  const { selectedIcon, setUserMarkers, userMarkers } = props;
  // Turn debug on by default when running locally.
  const debug = process.env.NODE_ENV !== 'production';

  useMapEvents({
    click(e) {
      if (debug) {
        console.log(e.latlng.lat, e.latlng.lng);
      }

      if (selectedIcon) {
        setUserMarkers([...userMarkers, {
          icon: selectedIcon,
          position: [
            e.latlng.lat,
            e.latlng.lng,
          ],
        }]);
      }
    },
  });

  return null
}

export default Markers;
