var documenterSearchIndex = {"docs":
[{"location":"examples/#Contourf","page":"Examples","title":"Contourf","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using GeoMakie, CairoMakie\n\nlons = -180:180\nlats = -90:90\n# Create some field of values across `lons` and `lats`\n# This grid can be of any density, but note that the\n# time it takes to plot scales with the grid size!\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\n# Surface example\nfig = Figure()\nax = GeoAxis(fig[1,1])\ncontourf!(ax, lons, lats, field; shading = false)\n\nfig","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Contourf)","category":"page"},{"location":"examples/#Axis-configuration","page":"Examples","title":"Axis configuration","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using Makie, CairoMakie, GeoMakie\n\nfig = Figure(resolution = (1000,1000))\n\naxs = [GeoAxis(fig[i, j]) for i in 1:2, j in 1:2]\n\n# axis 1 - I want an orthographic projection.\naxs[1, 1].scene.transformation.transform_func[] = Proj.Transformation(\"+proj=latlong\",\"+proj=ortho\")\nxlims!(axs[1, 1], -90, 90)\n\n# axis 2 - wacky spines\naxs[1, 2].topspinevisible = false\naxs[1, 2].rightspinecolor = :red\naxs[1, 2].spinewidth      = 5\n\n# axis 3 - messing with grids\naxs[2, 1].xgridcolor = :blue\naxs[2, 1].xgridstyle = :dashdot\naxs[2, 1].ygridcolor = (:orange, 0.5)\naxs[2, 1].ygridwidth = 2.0\n\n# axis 4 - customizing ticks\naxs[2, 2].xticks = -180:10:180\naxs[2, 2].xticklabelsvisible[] = false\nhidexdecorations!(axs[2, 2])\nfig","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Axis configuration)","category":"page"},{"location":"examples/#Italy's-states","page":"Examples","title":"Italy's states","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using CairoMakie, GeoMakie\nusing GeoMakie.GeoJSON\nusing Downloads\nusing GeometryBasics\nusing GeoInterface\n\n# Acquire data\nit_states = Downloads.download(\"https://github.com/openpolis/geojson-italy/raw/master/geojson/limits_IT_provinces.geojson\")\ngeo = GeoJSON.read(read(it_states, String))\n\nfig = Figure()\nga = GeoAxis(fig[1, 1]; dest = \"+proj=ortho +lon_0=12.5 +lat_0=42\", lonlims=(12, 13), latlims = (40, 44))\npoly!(ga, geo; strokecolor = :blue, strokewidth = 1, color = (:blue, 0.5), shading = false);\ndatalims!(ga)\n\nfig","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Italy's states)","category":"page"},{"location":"examples/#Projections","page":"Examples","title":"Projections","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using GeoMakie, CairoMakie, Makie\n\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y / 90) for l in lons, y in lats]\n\nfig = Figure()\nax1 = GeoAxis(fig[1, 1], dest = \"+proj=vitk1 +lat_1=45 +lat_2=55\",\n    coastlines = true, title = \"vitk1\")\nax2 = GeoAxis(fig[1, 2], dest = \"+proj=wintri\",\n    coastlines = true, title = \"wintri\")\n\nsurface!(ax1, lons, lats, field; shading = false, colormap = (:plasma, 0.45))\nsurface!(ax2, lons, lats, field; shading = false)\nhidedecorations!(ax1)\n\nfig","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Projections)","category":"page"},{"location":"examples/#Orthographic-projection","page":"Examples","title":"Orthographic projection","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using GeoMakie, CairoMakie\n\n# Limited-domain projections (like orthographic) must have\n# their limits correctly set!\n# If the limits are too large, you may get a blank figure.\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure()\nga = GeoAxis(\n    fig[1, 1],\n    dest=\"+proj=ortho\",\n    lonlims = automatic,\n    coastlines = true,\n    title = \"Orthographic projection with proper limits\"\n)\n# hidedecorations!(ga)\nsp = surface!(ga, lons, lats, field; shading = false, colormap = :rainbow_bgyrm_35_85_c69_n256)\ncb = Colorbar(fig[1, 2], sp)\n\nfig","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Orthographic projection)","category":"page"},{"location":"examples/#World-Population-centers","page":"Examples","title":"World Population centers","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"# This example was contributed by Martijn Visser (@visr)\nusing Makie, CairoMakie, GeoMakie\nusing GeoMakie.GeoJSON\nusing GeometryBasics\nusing Downloads\n\nsource = \"+proj=longlat +datum=WGS84\"\ndest = \"+proj=natearth2\"\n\nurl = \"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/\"\nland = Downloads.download(url * \"ne_110m_land.geojson\")\nland_geo = GeoJSON.read(read(land, String))\npop = Downloads.download(url * \"ne_10m_populated_places_simple.geojson\")\npop_geo = GeoJSON.read(read(pop, String))\n\nbegin\n    fig = Figure(resolution = (1000,500))\n    ga = GeoAxis(\n        fig[1, 1];\n        source = source,\n        dest = dest\n    )\n\n    ga.xticklabelsvisible[] = false\n    ga.yticklabelsvisible[] = false\n    poly!(ga, land_geo, color=:black)\n    popisqrt = map(pop_geo) do geo\n        popi = geo.pop_max\n        popi > 0 ? sqrt(popi) : 0.0\n    end\n    mini, maxi = extrema(popisqrt)\n    size = map(popisqrt) do popi\n        normed = (popi .- mini) ./ (maxi - mini)\n        return (normed * 20) .+ 1\n    end\n    scatter!(ga, pop_geo, color=popisqrt, markersize=size)\n    fig\nend","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: World Population centers)","category":"page"},{"location":"examples/#Field-and-countries","page":"Examples","title":"Field and countries","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"# This example was taken from Lazar Alonso's\n# BeautifulMakie.jl repository.  It has some really\n# good stuff - check it out!\nusing Makie, CairoMakie, GeoMakie\nimport Downloads\nusing GeoMakie.GeoJSON\nusing GeometryBasics\nusing GeoInterface\n\n# https://datahub.io/core/geo-countries#curl # download data from here\nworldCountries = GeoJSON.read(read(Downloads.download(\"https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json\"), String))\nn = length(worldCountries)\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure(resolution = (1200,800), fontsize = 22)\n\nax = GeoAxis(\n    fig[1,1];\n    dest = \"+proj=wintri\",\n    title = \"World Countries\",\n    tellheight = true,\n)\n\nhm1 = surface!(ax, lons, lats, field; shading = false)\ntranslate!(hm1, 0, 0, -10)\n\nhm2 = poly!(\n    ax, worldCountries;\n    color= 1:n,\n    colormap = Reverse(:plasma),\n    strokecolor = :black,\n    strokewidth = 0.25\n)\n\ncb = Colorbar(fig[1,2]; colorrange = (1, n), colormap = Reverse(:plasma), label = \"variable, color code\", height = Relative(0.65))\n\nfig","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Field and countries)","category":"page"},{"location":"examples/#Rotating-Earth","page":"Examples","title":"Rotating Earth","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using Makie, CairoMakie, GeoMakie\n\ndestnode = Observable(\"+proj=ortho\")\n\nfig = Figure()\nga = GeoAxis(\n    fig[1, 1],\n    coastlines = true,\n    dest = destnode,\n    lonlims = Makie.automatic\n)\nimage!(-180..180, -90..90, rotr90(GeoMakie.earth()); interpolate = false)\nhidedecorations!(ga)\n\nrecord(fig, \"rotating_earth_ortho.mp4\"; framerate=30) do io\n    for lon in -90:90\n        ga.title[] = string(lon) * \"°\"\n        destnode[] = \"+proj=ortho +lon_0=$lon\"\n        xlims!(ga, lon-90, lon+90)\n        recordframe!(io)\n    end\nend\n","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<video controls autoplay loop>\n<source src=\"https://user-images.githubusercontent.com/32143268/165003843-db5984f0-9ccf-49f7-847e-88fd63e80bb4.mp4\" type=\"video/mp4\">\nYour browser does not support this video.\n</video>","category":"page"},{"location":"#GeoMakie.jl","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"GeoMakie.jl is a Julia package for plotting geospatial data on a given map projection. It is based on the Makie.jl plotting ecosystem.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"The package ClimateBase.jl builds upon GeoMakie.jl to create a seamless workflow between analyzing/manipulating climate data, and plotting them.","category":"page"},{"location":"#Installation","page":"GeoMakie.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"This package is in development and may break, although we are currently working on a long-term stable interface.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"You can install it from the REPL like so:","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"]add GeoMakie","category":"page"},{"location":"#GeoAxis","page":"GeoMakie.jl","title":"GeoAxis","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"Using GeoMakie.jl is straightforward, although it does assume basic knowledge of the Makie.jl ecosystem.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"GeoMakie.jl provides an axis for plotting geospatial data, GeoAxis. Both are showcased in the examples below.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"GeoAxis","category":"page"},{"location":"#GeoMakie.GeoAxis","page":"GeoMakie.jl","title":"GeoMakie.GeoAxis","text":"GeoAxis(fig_or_scene; kwargs...) → ax::Axis\n\nCreate a modified Axis of the Makie.jl ecosystem. All Makie.jl plotting functions work directly on GeoAxis, e.g., scatter!(ax, x, y). You can pass any keyword which Axis accepts, and manipulate it just like a regular Axis.\n\nThis is because it is a regular Axis, using the interface you are already familiar with, functions like xlims! and attributes like ax.xticks, etc. just work.\n\nGeoAxis is appropriate for geospatial plotting because it automatically transforms all plotted data, given a user-defined map projection. See keyword arguments below and examples in the online documentation. Longitude and latitude values in GeoMakie.jl are always assumed to be in degrees.\n\nIn order to automatically adjust the limits to your data, you can call datalims!(ax) on any GeoAxis.\n\nIn the call signature, fig_or_scene can be a standard figure location, e.g., fig[1,1] as given in Axis. The keyword arguments decide the geospatial projection.\n\nKeyword arguments\n\nsource = \"+proj=longlat +datum=WGS84\", dest = \"+proj=eqearth\": These two keywords configure the map projection to be used for the given field using Proj.jl. See also online the section Changing central longitude for data that may not span the (expected by default) longitude range from -180 to 180.\ntransformation = Proj.Transformation(source, dest, always_xy=true): Instead of source, dest, you can directly use the Proj.jl package to define the projection.\nlonlims = (-180, 180): The limits for longitude (x-axis).  For automatic determination, pass lonlims=automatic.\nlatlims = (-90, 90): The limits for latitude (y-axis).  For automatic determination, pass latlims=automatic.\ncoastlines = false: Draw the coastlines of the world, from the Natural Earth dataset.\ncoastline_attributes = (;): Attributes that get passed to the lines call drawing the coastline.\nline_density = 1000: The number of points sampled per grid line.  Do not set this higher than 10,000 for performance and file size reasons..\nremove_overlapping_ticks = true: Remove ticks which could overlap each other. X-axis (longitude) ticks take priority over Y-axis (latitude) ticks.\n\nExample\n\nusing GeoMakie\nfig = Figure()\nax = GeoAxis(fig[1,1]; coastlines = true)\nimage!(ax, -180..180, -90..90, rotr90(GeoMakie.earth()); interpolate = false)\nel = scatter!(rand(-180:180, 5), rand(-90:90, 5); color = rand(RGBf, 5))\nfig\n\n\n\n\n\n\n","category":"function"},{"location":"#Gotchas","page":"GeoMakie.jl","title":"Gotchas","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"When plotting a projection which has a limited domain (in either longitude or latitude), if your limits are not inside that domain, the axis will appear blank.  To fix this, simply correct the limits - you can even do it on the fly, using the xlims!(ax, low, high) or ylims!(ax, low, high) functions.","category":"page"},{"location":"#Examples","page":"GeoMakie.jl","title":"Examples","text":"","category":"section"},{"location":"#Surface-example","page":"GeoMakie.jl","title":"Surface example","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure()\nax = GeoAxis(fig[1,1])\nsurface!(ax, lons, lats, field; shading = false)\nfig","category":"page"},{"location":"#Scatter-example","page":"GeoMakie.jl","title":"Scatter example","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\nlons = -180:180\nlats = -90:90\nslons = rand(lons, 2000)\nslats = rand(lats, 2000)\nsfield = [exp(cosd(l)) + 3(y/90) for (l,y) in zip(slons, slats)]\n\nfig = Figure()\nax = GeoAxis(fig[1,1])\nscatter!(slons, slats; color = sfield)\nfig","category":"page"},{"location":"#Map-projections","page":"GeoMakie.jl","title":"Map projections","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"The default projection is given by the arguments source = \"+proj=longlat +datum=WGS84\", dest = \"+proj=eqearth\", so that if a different one is needed, for example a wintri projection one can do it as follows:","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure()\nax = GeoAxis(fig[1,1]; dest = \"+proj=wintri\")\nsurface!(ax, lons, lats, field; shading = false)\nfig","category":"page"},{"location":"#Changing-central-longitude","page":"GeoMakie.jl","title":"Changing central longitude","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"Be careful! Each data point is transformed individually. However, when using surface or contour plots this can lead to errors when the longitudinal dimension \"wraps\" around the planet.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"E.g., if the data have the dimensions","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"lons = 0.5:359.5\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats];","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"a surface! plot with the default arguments will lead to artifacts if the data along longitude 179 and 180 have significantly different values. To fix this, there are two approaches: (1) to change the central longitude of the map transformation, by changing the projection destination used like so:","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"ax = GeoAxis(fig[1,1]; dest = \"+proj=eqearth +lon_0=180\")","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"or (2), circshift your data appropriately so that the central longitude you want coincides with the center of the longitude dimension of the data.","category":"page"},{"location":"#Countries-loaded-with-GeoJSON","page":"GeoMakie.jl","title":"Countries loaded with GeoJSON","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"using GeoMakie, CairoMakie\n\n# First, make a surface plot\nlons = -180:180\nlats = -90:90\nfield = [exp(cosd(l)) + 3(y/90) for l in lons, y in lats]\n\nfig = Figure()\nax = GeoAxis(fig[1,1])\nsf = surface!(ax, lons, lats, field; shading = false)\ncb1 = Colorbar(fig[1,2], sf; label = \"field\", height = Relative(0.65))\n\nusing GeoMakie.GeoJSON\ncountries_file = download(\"https://datahub.io/core/geo-countries/r/countries.geojson\")\ncountries = GeoJSON.read(read(countries_file, String))\n\nn = length(countries)\nhm = poly!(ax, countries; color= 1:n, colormap = :dense,\n    strokecolor = :black, strokewidth = 0.5,\n)\ntranslate!(hm, 0, 0, 100) # move above surface plot\n\nfig","category":"page"},{"location":"#Gotchas-2","page":"GeoMakie.jl","title":"Gotchas","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"With CairoMakie, we recommend that you use image!(ga, ...) or heatmap!(ga, ...) to plot images or scalar fields into ga::GeoAxis.","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"However, with GLMakie, which is much faster, these methods do not work; if you have used them, you will see an empty axis.  If you want to plot an image img, you can use a surface in the following way: surface!(ga, lonmin..lonmax, latmin..latmax, ones(size(img)...); color = img, shading = false).","category":"page"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"To plot a scalar field, simply use surface!(ga, lonmin..lonmax, latmin..latmax, field).  The .. notation denotes an interval which Makie will automatically sample from to obtain the x and y points for the surface.","category":"page"},{"location":"#API","page":"GeoMakie.jl","title":"API","text":"","category":"section"},{"location":"","page":"GeoMakie.jl","title":"GeoMakie.jl","text":"GeoMakie.geoformat_ticklabels","category":"page"},{"location":"#GeoMakie.geoformat_ticklabels","page":"GeoMakie.jl","title":"GeoMakie.geoformat_ticklabels","text":"geoformat_ticklabels(nums::Vector)\n\nA semi-intelligent formatter for geographic tick labels.  Append \"ᵒ\" to the end of each tick label, to indicate degree.\n\nThis will check whether the ticklabel is an integer value (round(num) == num). If so, label as an Int (1 instead of 1.0) which looks a lot cleaner.\n\nExample\n\njulia-repl julia> geoformat_ticklabels([1.0, 1.1, 2.5, 25]) 4-element Vector{String}:  \"1ᵒ\"  \"1.1ᵒ\"  \"2.5ᵒ\"  \"25ᵒ\"\n\n\n\n\n\n","category":"function"}]
}
