# Procedure for updating data

The new assets (e.g. images) can be extracted from the game using a 
tool like [AssetRipper](https://github.com/AssetRipper/AssetRipper).

The custom CSV files will be dumped from the game by the custom
SR2 data dumping plugin.

> Note: Plugin not yet posted on GitHub. Contact the author
> [rodriguezrrp](https://github.com/rodriguezrrp) (is a member of
> the SR2 Interactive Map's Discord) for details on the plugin.

## Prerequisite environment setup

Before running the following scripts, first setup the Node environment:

### Node

1. Install a recent release of the [Node JS runtime](https://nodejs.org/).

2. Install dependencies:
    ```bash
    npm ci
    ```

### Python with GDAL (only required for map tiling script)

The map tiling script utilizes [gdal2tiles-leaflet](), and needs Python installed with the GDAL module.

1. Download the git submodule gdal2tiles-leaflet:
    ```bash
    git submodule update --init --recursive
    ```

1. Install Python 3.

2. Install GDAL for Python:

    - **Windows:**

      ```bash
      pip install gdal
      ```

      `pip install gdal` may fail with an error like
      "Microsoft Visual C++ 14.0 or greater is required".
      If you encounter this, and installing the build tools is not feasible:
      
      - Try downloading a prebuilt wheel (recent ones available at
      https://github.com/cgohlke/geospatial-wheels/releases/.
      take note of the release assets beginning with "GDAL")
      
      - ```bash
        pip install path/to/wheel/file.whl
        ```

    - **Mac:**

      TODO instructions

    - **Linux:**

      TODO instructions

## Updating the map's images
When new islands are added, or existing islands are changed,
an update to the map is needed.

> The map island images can be extracted from the game using a tool like
> https://github.com/AssetRipper/AssetRipper.

1. Place the new island images into `map_assets/`.
   
   > The island images are expected to be like `Map_islandnamehere.png`.
   > If the filename format has changed, then this project likely needs updated.

2. Run the game with the plugin and open the map while in-game. This will dump
    the necessary info.

2. Place the new dump csv files from the plugin into `dumps/`:
    1. `sr2plugin_dump_map_info.csv`
    2. `sr2plugin_dump_map_texture_locations.csv`

4. Run the command:
    ```bash
    npm run stitch
    ```
    This will update the `map.png`.
    This may take several seconds — the map is large with a high resolution.

5. After updating the `map.png` you should [regenerate the map tiles](#regenerating-the-map-tiles).

6. Depending on what changed, may need to edit the manually-specified position
    offsets defined in the interactive map's `data/manual_island_offsets.ts` file.
    
    It exists because some islands' dumped positions are currently offset from where they should be, with no precise explanation or fix yet found.

## Regenerating the map tiles
The SR2 Interactive Map uses a tile-based map for performance.
After updating the map image (see [Updating the map's assets](#updating-the-maps-assets)), the map tiles need to be regenerated. 

> Note: the map tiles are intentionally ignored in `.gitignore`.
>
> **For contribution and development**, the map tiles should be
> regenerated before starting the dev server for the first time,
> or after updating the map assets.

1. Ensure you have Python installed with the GDAL module.
    (see [Prerequisite environment setup](#prerequisite-environment-setup))
2. Run the command:
    ```bash
    npm run tile
    ```

## Updating or adding new markers (treasure pods, research drones, gordos, etc.)

> When using the plugin: Visit all islands at least once
> (in the same game session) to get a full dump.
> Otherwise, the dump will only contain data from the islands visited.

1. Place the new dump csv files from the plugin into `dumps/`.
    - Treasure pods: `sr2plugin_dump_pods.csv`
    - Plort receptacles: `sr2plugin_dump_puzzleslots.csv`
    - Map markers: `sr2plugin_dump_mapnodes.csv`
    - Gordos: `sr2plugin_dump_gordos.csv`
    - Research drones: `sr2plugin_dump_drones.csv`

2. Run the command:
    ```bash
    npm run apply
    ```

3. Depending on what changed, may need to edit the manually-specified position
    offsets defined in the interactive map's `data/island_position_offsets.ts` file.
    
    It exists because some islands' dumped positions are currently offset from where they should be, with no precise explanation or fix yet found.