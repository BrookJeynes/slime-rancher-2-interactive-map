import { Marker, Tooltip, } from 'react-leaflet';
import L from 'leaflet';
import transparentIcon from '../../assets/icons/transparentIcon.png';

const Region = (props) => {
  const key = props.key_;
  const regions = props.data;
  const region = regions[key];

  return (
    <Marker
      position={region.position}
      keyboard={false}
      icon={new L.icon({
        iconUrl: transparentIcon,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      })}
    >
      <Tooltip
        className="region-tooltip"
        direction="center"
        offset={[0, 0]}
        opacity={1}
        permanent
      >
        {region.name}
      </Tooltip>
    </Marker>
  );
}

export default Region;
