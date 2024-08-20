import { LocalStoragePlotPlan, LocalStorageSitePlan, Vec2 } from "./types";
import L from "leaflet";

export function handleChecked(
    local_storage_key: string,
    key: string,
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const items: string[] = JSON.parse(localStorage.getItem(local_storage_key) ?? "[]") ?? [];

    if (!checked) {
        if (items.length > 0) {
            items.push(key);
            //console.log(items); debugging remnant?
            localStorage.setItem(local_storage_key, JSON.stringify(items));
        } else {
            localStorage.setItem(local_storage_key, JSON.stringify([key]));
        }
    } else {
        localStorage.setItem(
            local_storage_key,
            JSON.stringify(items.filter(item => item !== key))
        );
    }

    setChecked(!checked);
}

export function handlePlotPlanned(
    site: string,
    plot: number,
    plotPlan: LocalStoragePlotPlan
) {
    const items: LocalStorageSitePlan[] = JSON.parse(localStorage.getItem("planned_plots") ?? "[]") ?? [];

    const sitePlans = items.filter(item => item.site === site)
    if (sitePlans.length === 1) {
        sitePlans[0].plotPlans[plot] = plotPlan
    } else {
        const plotPlans = [];
        plotPlans[plot] = plotPlan;
        items.push({ site: site, plotPlans: plotPlans })
    }

    localStorage.setItem(
        "planned_plots",
        JSON.stringify(items)
    );
}

export function getStoredPlotPlans(): LocalStorageSitePlan[] {
    return JSON.parse(localStorage.getItem("planned_plots") ?? "[]") ?? [];
}

export function vecToLatLng(coord: Vec2): L.LatLngExpression {
    return [coord.x, coord.y];
}

