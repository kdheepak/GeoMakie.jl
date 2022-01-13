var documenterSearchIndex = {"docs":
[{"location":"#GeoMakie.jl","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"GeoMakie.jl is a Julia package for plotting geospatial data on a given map projection. It is based on the Makie.jl plotting ecosystem.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"The package ClimateBase.jl builds upon GeoMakie.jl to create a seamless workflow between analyzing/manipulating climate data, and plotting them.","category":"page"},{"location":"#Installation","page":"GeoMakie.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"This package is in development and may break, although we are currently working on a long-term stable interface. ","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"You can install it from the REPL like so:","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"]add GeoMakie","category":"page"},{"location":"#GeoAxis","page":"GeoMakie.jl","title":"GeoAxis","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"Using GeoMakie.jl is straightforward, although it does assume basic knowledge of the Makie.jl ecosystem. ","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"GeoMakie.jl provides an axis for plotting geospatial data, GeoAxis, and also the function geo2basic that converts an output of GeoJSON to a polygon appropriate for plotting. Both are showcased in the examples below.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"GeoAxis\ngeo2basic","category":"page"},{"location":"#GeoMakie.GeoAxis","page":"GeoMakie.jl","title":"GeoMakie.GeoAxis","text":"GeoAxis(args...; kwargs...) → ax\n\nCreate a new axis instance ax that is a modified Axis of the Makie.jl ecosystem. All Makie.jl plotting functions work directly on GeoAxis, e.g., scatter!(ax, x, y).\n\nGeoAxis is appropriate for geospatial plotting because it automatically transforms all plotted data given a user-defined map projection. See keyword arguments below and examples in the online documentation. Longitude and latitude values in GeoMakie.jl are always assumed to be in degrees.\n\nIn the call signature, args... is a standard figure location, e.g., fig[1,1] as given in Axis. The keyword arguments decide the geospatial projection:\n\nsource = \"+proj=longlat +datum=WGS84\", dest = \"+proj=eqearth\": These two keywords configure the map projection to be used for the given field using Proj4.jl. See also online the section Changing central longitude for data that may not span the (expected by default) longitude range from -180 to 180.\ntransformation = Proj4.Transformation(source, dest, always_xy=true): Instead of source, dest you can directly use the Proj4.jl package to define the projection. lines!(ax, GeoMakie.coastlines(); coastkwargs...)\nlonticks = -180:60:180, latticks = -90:30:90 ticks for the longitude and latitude dimensions. The grid lines of the axis are also spanning these tick values.\nhidespines = true Hide the axis spines (rectangle surrounding the axis).\ncoastlines = false draw coastlines\ncoastline_attributes = (;) named tuple that gets passed to the lines call drawing the coastline\n\nExample\n\nusing GeoMakie, GLMakie\n\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\n# Plot coastlines\ncoastplot = lines!(ax, GeoMakie.coastlines(); color = :black, overdraw = true, coastkwargs...)\ntranslate!(coastplot, 0, 0, 99) # ensure they are on top of other plotted elements\n\n# Surface example\nfig = Figure()\nax = GeoAxis(fig[1,1])\nsurface!(ax, lons, lats, field)\ndisplay(fig)\n\n# Scatter example\nslons = rand(lons, 2000)\nslats = rand(lats, 2000)\nsfield = [exp(cosd(l)) + 3(y/90) for (l,y) in zip(slons, slats)]\n\nfig = Figure()\nax = GeoAxis(fig[1,1])\nel = scatter!(slons, slats; color = sfield)\ndisplay(fig)\n\n\n\n\n\n","category":"function"},{"location":"#GeoMakie.geo2basic","page":"GeoMakie.jl","title":"GeoMakie.geo2basic","text":"geo2basic(obj::GeoInterface)\n\nConverts any GeoInterface object to the equivalent GeometryBasics, which can be plotted by Makie.\n\n\n\n\n\n","category":"function"},{"location":"#Examples","page":"GeoMakie.jl","title":"Examples","text":"","category":"section"},{"location":"#Surface-example","page":"GeoMakie.jl","title":"Surface example","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure()\nax = GeoAxis(fig[1,1])\nsurface!(ax, lons, lats, field; shading = false)\nfig","category":"page"},{"location":"#Scatter-example","page":"GeoMakie.jl","title":"Scatter example","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\nlons = -180:180\nlats = -90:90\nslons = rand(lons, 2000)\nslats = rand(lats, 2000)\nsfield = [exp(cosd(l)) + 3(y/90) for (l,y) in zip(slons, slats)]\n\nfig = Figure()\nax = GeoAxis(fig[1,1])\nscatter!(slons, slats; color = sfield)\nfig","category":"page"},{"location":"#Map-projections","page":"GeoMakie.jl","title":"Map projections","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"The default projection is given by the arguments source = \"+proj=longlat +datum=WGS84\", dest = \"+proj=eqearth\", so that if a different one is needed, for example a wintri projection one can do it as follows:","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure()\nax = GeoAxis(fig[1,1]; dest = \"+proj=wintri\")\nsurface!(ax, lons, lats, field; shading = false)\nfig","category":"page"},{"location":"#Changing-central-longitude","page":"GeoMakie.jl","title":"Changing central longitude","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"Be careful! Each data point is transformed individually. However, when using surface or contour plots this can lead to errors when the longitudinal dimension \"wraps\" around the planet.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"E.g., if the data have the dimensions","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"lons = 0.5:359.5\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats];","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"a surface! plot with the default arguments will lead to artifacts if the data along longitude 179 and 180 have significantly different values. To fix this, there are two approaches: (1) to change the central longitude of the map transformation, by changing the projection destination used like so:","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"ax = GeoAxis(fig[1,1]; dest = \"+proj=eqearth +lon_0=180\")","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"or (2), circshift your data appropriately so that the central longitude you want coincides with the center of the longitude dimension of the data.","category":"page"},{"location":"#Countries-loaded-with-GeoJSON","page":"GeoMakie.jl","title":"Countries loaded with GeoJSON","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\n# First, make a surface plot\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure()\nax = GeoAxis(fig[1,1])\nsf = surface!(ax, lons, lats, field; shading = false)\ncb1 = Colorbar(fig[1,2], sf; label = \"field\", height = Relative(0.65))\n\nusing Downloads, GeoJSON\nDownloads.download(\"https://datahub.io/core/geo-countries/r/countries.geojson\", \"countries.geojson\")\ncountries = GeoJSON.read(read(\"countries.geojson\"))\n\nn = length(GeoInterface.features(countries))\nhm = poly!(ax, countries; color= 1:n, colormap = :dense, \n    strokecolor = :black, strokewidth = 0.5, overdraw = true, \n)\n\n# cb2 = Colorbar(fig[1,3], hm; label = \"countries index\", height = Relative(0.65))\n\nfig","category":"page"}]
}
