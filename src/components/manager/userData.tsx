import { FaFileExport, FaFileImport, FaTrashCan } from "react-icons/fa6";
import { Found, FoundContext } from "../../FoundContext";
import { LocalStoragePin, LocalStorageSitePlan, Pin } from "../../types";
import {
    gordo_ls_key,
    locked_door_ls_key,
    map_node_ls_key,
    research_drone_ls_key,
    shadow_door_ls_key,
    stabilizing_gate_ls_key,
    treasure_pod_ls_key
} from "../../globals";
import { CurrentMapContext } from "../../CurrentMapContext";
import { getStoredPlotPlans } from "../../util";
import { useContext } from "react";
import { useMapEvents } from "react-leaflet";

/* --- Constants --- */
const PLOT_KEY = "planned_plots";
const PINS_KEY = "user_pins";
const FOUND_KEYS = [
    gordo_ls_key,
    locked_door_ls_key,
    map_node_ls_key,
    research_drone_ls_key,
    treasure_pod_ls_key,
    stabilizing_gate_ls_key,
    shadow_door_ls_key,
] as const;

export enum DataSet {
    Plots = "plots",
    Pins = "pins",
    Found = "found",
}

type DataType = { [key in DataSet]: LocalStoragePin[] | LocalStorageSitePlan[] | Record<string, unknown> | null };

/* --- Helpers --- */
function downloadJSON(filename: string, data: DataType) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/* --- Export functions --- */

function exportFilter(filter: DataSet[]) {
    const all: DataType = {
        plots: filter.includes(DataSet.Plots) ? getStoredPlotPlans() : [],
        pins: filter.includes(DataSet.Pins) ? JSON.parse(localStorage.getItem(PINS_KEY) ?? "[]") : null,
        found: filter.includes(DataSet.Found) ? FOUND_KEYS.reduce((acc: Record<string, unknown>, k) => {
            acc[k] = JSON.parse(localStorage.getItem(k) ?? "[]");
            return acc;
        }, {}) : null,
    };
    downloadJSON("sr2_interactivemap_backup.json", all);
}

/* --- Import validators --- */
function isValidPlotExport(obj: unknown): obj is LocalStorageSitePlan[] {
    return Array.isArray(obj) && obj.every(item => item && typeof item.site === "string" && Array.isArray(item.plotPlans));
}

function isValidPinsExport(obj: unknown): obj is LocalStoragePin[] {
    return Array.isArray(obj) && obj.every(p => p && typeof p.icon === "string" && p.pos && typeof p.pos.x === "number" && typeof p.pos.y === "number");
}

function isValidFoundExport(obj: unknown): obj is Record<string, unknown> {
    if (!obj || typeof obj !== "object") return false;
    const keys = Object.keys(obj);
    const foundKeyStrings = (FOUND_KEYS as readonly string[]);
    return keys.some(k => foundKeyStrings.includes(k)) || keys.length === FOUND_KEYS.length;
}

/* --- Import functions --- */
async function importFilter(file: File, dataset: DataSet[]) {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (parsed.plots && dataset.includes(DataSet.Plots) && isValidPlotExport(parsed.plots)) localStorage.setItem(PLOT_KEY, JSON.stringify(parsed.plots));
    if (parsed.pins && dataset.includes(DataSet.Pins) && isValidPinsExport(parsed.pins)) localStorage.setItem(PINS_KEY, JSON.stringify(parsed.pins));
    if (parsed.found && dataset.includes(DataSet.Found) && isValidFoundExport(parsed.found)) {
        for (const k of FOUND_KEYS) if (parsed.found[k]) localStorage.setItem(k, JSON.stringify(parsed.found[k]));
    }
    window.location.reload();
}

/* --- Clear functions --- */
function clearPlots(setPlotData?: React.Dispatch<React.SetStateAction<LocalStorageSitePlan[]>>) {
    localStorage.setItem(PLOT_KEY, JSON.stringify([]));
    if (typeof setPlotData === "function") setPlotData([]);
    else window.location.reload();
}

function clearPins(setUserPins?: React.Dispatch<React.SetStateAction<LocalStoragePin[]>>) {
    localStorage.setItem(PINS_KEY, JSON.stringify([]));
    if (typeof setUserPins === "function") setUserPins([]);
    else window.location.reload();
}

function clearFound() {
    const { setFound } = useContext(FoundContext);
    for (const k of FOUND_KEYS) localStorage.setItem(k, JSON.stringify([]));
    setFound((prev: Found) => ({
        ...(prev ?? {}),
        found_gordos: [],
        found_locked_doors: [],
        found_map_nodes: [],
        found_research_drones: [],
        found_treasure_pods: [],
        found_stabilizing_gates: [],
        found_shadow_doors: [],
    }));
}

function clearFilter(filter: DataSet[]) {
    if (filter.includes(DataSet.Plots)) clearPlots();
    if (filter.includes(DataSet.Pins)) clearPins();
    if (filter.includes(DataSet.Found)) clearFound();
}

export function MapUserPins({
    selected_pin,
    user_pins,
    setUserPins,
}: {
    selected_pin: Pin,
    user_pins: LocalStoragePin[],
    setUserPins: React.Dispatch<React.SetStateAction<LocalStoragePin[]>>,
}) {
    const { current_map } = useContext(CurrentMapContext);

    useMapEvents({
        click(e) {

            const new_pins = [
                ...user_pins,
                {
                    icon: selected_pin.icon,
                    pos: { x: e.latlng.lat, y: e.latlng.lng },
                    dimension: current_map,
                } as LocalStoragePin,
            ];

            setUserPins(new_pins);
            localStorage.setItem("user_pins", JSON.stringify(new_pins));
        },
    });

    return null;
}

function actionToIcon(action: "export" | "import" | "clear") {
    switch (action) {
        case "export":
            return <FaFileImport />;
        case "import":
            return <FaFileExport />;
        case "clear":
            return <FaTrashCan />;
    }
}

function datasetToString(dataset: DataSet[]): string {
    if (dataset.length === 0) return "";
    if (dataset.length === 1) return dataset[0].charAt(0).toUpperCase() + dataset[0].slice(1);
    return dataset.slice(0, -1).map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")
        + " and " + dataset.slice(-1).map(d => d.charAt(0).toUpperCase() + d.slice(1)).join("");
}

export function GenericDataButton({
    dataset,
    action,
    label
}: {
    dataset: DataSet[],
    action: "export" | "import" | "clear",
    label?: string
}) {
    const text = (<span className="flex flex-row gap-2 content-center">{actionToIcon(action)} {label ?? `${action.toUpperCase()}`}</span>);

    if (action === "import") {
        return (
            <label className="flex justify-center items-center w-full cursor-pointer bg-btn outline outline-1 p-1 text-center">
                <span>{text}</span>
                <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={async (e) => {
                        const file = (e.target.files ?? [])[0];
                        if (!file) return;
                        try {
                            if (!window.confirm(`This will overwrite current ${dataset}. Continue?`)) return;
                            importFilter(file, dataset);
                        } catch (err) {
                            console.error("Import failed:", err);
                            window.alert("Import failed. Check console for details.");
                        }
                    }}
                />
            </label>
        );
    }

    if (action === "export") return (
        <button
            disabled={dataset.length === 0}
            className="bg-btn w-full outline outline-1 p-1"
            onClick={() => {
                if (action === "export")
                    exportFilter(dataset);
            }}
        >
            {text}
        </button>
    );

    return (
        <button
            disabled={dataset.length === 0}
            className="bg-btn btn-red w-full outline outline-1 p-1"
            onClick={() => {
                if (window.confirm(`Are you sure you want to clear ${datasetToString(dataset)}? This cannot be undone.`))
                    clearFilter(dataset);
            }}
        >
            {text}
        </button>
    );
}