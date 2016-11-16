## Using Seneca to split RackHD into micro-services that do not depend on `on-core`.

```
+--------+                +------------+
| RackHD |                |   Lookups  |
|  http  | <-- Seneca --> | findByTerm |
+--------+                +------------+
```

In `on-http` the route `GET /api/*/lookups` is handled by calling `waterline.lookups.findByTerm(term)`.

This example shows how this behavior can be turned into a new micro-service. See [`~/lookups/index.js#L18`](https://github.com/rolandpoulter/rackhd-seneca/blob/master/lookups/index.js#L18)

The `waterline.lookups.findByTerm(term)` can be changed to use this `lookups` micro-service. See patch for [`on-core/lib/models/lookup.js#L47`](https://github.com/RackHD/on-core/commit/477be18d4dfa00ccd5cd8c74fcf7956b2010f900#diff-3d6fb4b9c8b9cd924c12b1e4e2066f35R47)

The `~/lookups` service in this example should be expanded to include more behaviors relevant to lookups.
And we could break apart `on-core` and `on-http` into new modules that do not rely on `on-core`.

#### Running this example:

```
> ./scripts/up.bash   # Install and run `~/api` and `~/lookups`
```

* `~/api` -- In this case acts as a service discovery for other seneca services and an API gateway.

```
> curl -GET http://localhost:8000/lookups/*
[]
```
