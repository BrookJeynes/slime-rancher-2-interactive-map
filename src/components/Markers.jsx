import {
  useMapEvents,
} from 'react-leaflet'

const Markers = (props) => {
  const { selectedIcon, setUserMarkers, userMarkers } = props;
  const debug = false;

  const map = useMapEvents({
    click(e) {
      if (debug) {
        console.log(e.latlng.lat, e.latlng.lng)
      }

      if (selectedIcon) {
        setUserMarkers([...userMarkers, {
          icon: selectedIcon,
          position: [e.latlng.lat, e.latlng.lng]
        }])
      }
    },
  })

  return null
}

export default Markers;
