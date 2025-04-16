routerAdd("GET", "/api/vehicles", (c) => {
    const vehicleTypeId = c.request.url.query().get("vehicleTypeId")
    const vehicleOptionId = c.request.url.query().get("vehicleOptionId")
    const agencyId = c.request.url.query().get("agencyId")
    const transmissionType = c.request.url.query().get("transmissionType")
    const fuelType = c.request.url.query().get("fuelType")
    const noOfDoors = c.request.url.query().get("noOfDoors")
    const noOfSeats = c.request.url.query().get("noOfSeats")

    const vehicleTypeFilter = vehicleTypeId ? `(v.vehicleTypes LIKE '%${vehicleTypeId}%')` : ""
    const vehicleOptionFilter = vehicleOptionId ? `(v.vehicleOptions LIKE '%${vehicleOptionId}%')` : ""
    const agencyFilter = agencyId ? `(v.agencies LIKE '%${agencyId}%')` : ""
    const transmissionTypeFilter = transmissionType ? `(v.transmissionType = '${transmissionType}')` : ""
    const fuelTypeFilter = fuelType ? `(v.fuelType = '${fuelType}')` : ""
    const noOfDoorsFilter = noOfDoors ? `(v.noOfDoors = ${Number(noOfDoors)})` : ""
    const noOfSeatsFilter = noOfSeats ? `(v.noOfSeats = ${Number(noOfSeats)})` : ""

    const filters = [
        vehicleTypeFilter, 
        vehicleOptionFilter, 
        agencyFilter, 
        transmissionTypeFilter,
        fuelTypeFilter,
        noOfDoorsFilter,
        noOfSeatsFilter
    ]

    const filterSql = `${filters.filter(e => e.length > 0).length > 0 ? "WHERE " + filters.filter(e => e.length > 0).join(" AND ") : ""}`

    const vehicleList = arrayOf(new DynamicModel({
        id: '',
        title: '',
        model: '',
        transmissionType: '',
        fuelType: '',
        noOfDoors: '',
        noOfSeats: '',
        image: '',
        minPrice: ''
    }))

    $app.db()
        .newQuery(`
            SELECT 
                v.id,
                v.title,
                v.model ,
                v.transmissionType,
                v.fuelType,
                v.noOfDoors,
                v.noOfSeats,
                '/api/files/vehicles/' || v.id || '/' || REPLACE(v.images ->> 0, '"', '') AS image,
                coalesce(MIN(vp.basePrice), 0) AS minPrice
            FROM vehicles v 
            LEFT JOIN vehiclePackages vp ON vp.vehicle = v.id
            ${filterSql}
            GROUP BY v.id
            ORDER BY v.created DESC 
        `)
        .all(vehicleList)

    return c.json(200, {
        vehicleList: vehicleList.map(c => {
            return {
                ...c,
                noOfDoors: Number(c.noOfDoors),
                noOfSeats: Number(c.noOfSeats),
                minPrice: Number(c.minPrice)
            }
        })
    })
});

