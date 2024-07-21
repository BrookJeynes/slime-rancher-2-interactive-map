

# How many tiles will there be?
The number of tiles produced for the tilemap can be calculated by the following formulas.

Given a maximal image dimension `s`, i.e. the longest side length, `s = max(mapimg.width, mapimg.height)`, 
and a tile size `t`, where in our case `t = 256`:

1. First, zoom levels:
    - the minimum zoom = `z_min = 0`
    - the maximum zoom = `z_max = ceil(log2(s / t))`.
2. The number of tiles for any zoom level, `tiles(z, s, z_max)`, will be:
    - `tiles(z, s, z_max) = ceil(s / (t * 2 ^ (z_max - z))) ^ 2`
3. To calculate total number of tiles, sum all values of `tiles(z, s, z_max)` for `z` from `0` to `z_max`.

For example: Given a map image with side lengths `25600`:
- Max zoom level `z_max = ceil(log2(25600 / 256)) = ceil(log2(100)) = 7`
- Largest tile count (z = max zoom level 7) = `ceil(25600 / (256 * 2 ^ (7 - 7))) ^ 2 = 10000`
- Total tiles count:
  - `tiles(0, 25600, 7) + tiles(1, 25600, 7) + ... + tiles(7, 25600, 7)`
  - = `1 + 4 + 16 + 49 + 169 + 625 + 2500 + 10000`
  - = `13364`
