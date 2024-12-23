import * as helpers from "@turf/helpers";
import L from "leaflet";
import { Polyline } from "react-leaflet";
import { TeleportLine } from "../types";
import { default as bezierSpline } from "@turf/bezier-spline";
import { teleport_lines } from "../data/teleport_lines";

export function TeleportLineIcon({ teleport_line }: { teleport_line: TeleportLine }) {
    const path_options: L.PathOptions = {
        color: "white",
        weight: 4,
        dashArray: "1, 8",
        dashOffset: "0",
    };

    const position_1 = teleport_line.positions[0];
    const position_2 = teleport_line.positions[1];
    const line = helpers.lineString([
        [position_1.x, position_1.y],
        [teleport_line.midpoint.x, teleport_line.midpoint.y],
        [position_2.x, position_2.y]
    ]);

    return (
        <Polyline
            key={teleport_line.name}
            pathOptions={path_options}
            positions={bezierSpline(line).geometry.coordinates.map(pos => {
                return {
                    lat: pos[0],
                    lng: pos[1],
                };
            })}
        ></Polyline>
    );
}

export const TeleportLineIcons = Object.values(teleport_lines).map((teleport_line: TeleportLine) => {
    return <TeleportLineIcon key={teleport_line.name} teleport_line={teleport_line} />;
});
