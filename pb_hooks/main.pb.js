routerAdd("GET", "/api/vehicles", (c) => {
    let pageSize = c.request.url.query().get("pageSize");
    let pageNo = c.request.url.query().get("pageNo");

    pageSize = Number(pageSize) > 0 ? Number(pageSize) : 20;
    pageNo = Number(pageNo) > 0 ? Number(pageNo) : 1;

    const vehicleList = arrayOf(new DynamicModel({
        id: '',
        title: '',
        model: '',
        transmissionType: '',
        fuel: '',
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
                v.fuel,
                v.noOfDoors,
                v.noOfSeats,
                '/api/files/vehicles/' || v.id || '/' || REPLACE(v.images ->> 0, '"', '') AS image,
                coalesce(MIN(vp.basePrice), 0) AS minPrice
            FROM vehicles v 
            LEFT JOIN vehiclePackages vp ON vp.vehicle = v.id
            GROUP BY v.id
            ORDER BY v.created DESC 
            LIMIT ${Number(pageSize)} OFFSET ${(Number(pageNo) - 1) * Number(pageSize)}
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




// routerAdd("GET", "/api/filter-fields", (c) => {
//     const seriesList = arrayOf(new DynamicModel({
//         id: '',
//         title: ''
//     }))

//     $app.db()
//         .newQuery(`
//             SELECT 
//                 s.id,
//                 s.title
//             FROM series s
//             ORDER BY s.title ASC
//         `)
//         .all(seriesList)

//     const categoryList = arrayOf(new DynamicModel({
//         id: '',
//         title: ''
//     }))

//     $app.db()
//         .newQuery(`
//             SELECT 
//                 c.id,
//                 c.title
//             FROM categories c
//             ORDER BY c.title ASC
//         `)
//         .all(categoryList)

//     return c.json(200, {
//         seriesList,
//         categoryList
//     })
// })

// routerAdd("GET", "/api/products", (c) => {
    // let pageSize = c.request.url.query().get("pageSize");
    // let pageNo = c.request.url.query().get("pageNo");
//     const seriesId = c.request.url.query().get("seriesId")
//     const categoryId = c.request.url.query().get("categoryId")
//     const search = c.request.url.query().get("search").split(" ").filter(e => e.trim().length > 0)

//     const seriesFilter = seriesId ? `(p.series = "${seriesId}")` : ""
//     const categoryFilter = categoryId ? `(p.categories = "${categoryId}")` : ""
//     const filters = [seriesFilter, categoryFilter]

    // pageSize = Number(pageSize) > 0 ? Number(pageSize) : 20;
    // pageNo = Number(pageNo) > 0 ? Number(pageNo) : 1;

//     const counted = new DynamicModel({
//         totalItems: ''
//     })

//     $app.db()
//         .newQuery(`
//             SELECT 
//                 COALESCE(count(*), 0) AS totalItems
//             FROM products p
//             LEFT JOIN categories ct ON p.categories = ct.id 
//             LEFT JOIN series s ON p.series = s.id
//         `)
//         .one(counted)

//     const totalItems = Number(counted.totalItems)

//     const filteredProducts = arrayOf(new DynamicModel({
//         id: '',
//         title: '',
//         tagLine: '',
//         slug: '',
//         sellingPrice: '',
//         discount: '',
//         summary: '',
//         productImageId: '',
//         productImageSource: '',
//         categoryTitle: '',
//         categorySlug: '',
//         seriesTitle: '',
//         seriesSlug: ''
//     }))

//     $app.db()
//         .newQuery(`
//             SELECT 
//                 p.id,
//                 p.title,
//                 p.slug,
//                 p.sellingPrice,
//                 p.discount,
//                 p.summary,
//                 COALESCE(ct.title, '') AS categoryTitle,
//                 COALESCE(ct.slug, '') AS categorySlug,
//                 COALESCE(s.title, '') AS seriesTitle,
//                 COALESCE(s.slug, '') AS seriesSlug,
//                 COALESCE(pi.id, '') AS productImageId,
//                 COALESCE(pi.source, '') AS productImageSource,
//                 (
//                     ${search.length == 0 ? 1 : `
//                     CASE 
//                         ${search.map(e => `
//                         WHEN p.title LIKE '%${e.toLowerCase()}%' THEN 10
//                         WHEN ct.title LIKE '%${e.toLowerCase()}%' THEN 10
//                         WHEN s.title LIKE '%${e.toLowerCase()}%' THEN 10
//                         WHEN p.summary LIKE '%${e.toLowerCase()}%' THEN 10
//                         WHEN p.tags LIKE '%${e.toLowerCase()}%' THEN 10
//                         `).join('')}
//                         ELSE 0
//                     END
//                     `}
//                 ) AS matchScore
//             FROM products p
//             LEFT JOIN images pi ON pi.id = REPLACE(p.images ->> 0, '"', '')
//             LEFT JOIN categories ct ON p.categories = ct.id 
//             LEFT JOIN series s ON p.series = s.id
//             ${filters.filter(e => e.length > 0).length > 0 ? "WHERE " + filters.filter(e => e.length > 0).join(" AND ") : ""}
//             ORDER BY matchScore DESC, p.created DESC
//             LIMIT ${Number(pageSize)} OFFSET ${(Number(pageNo) - 1) * Number(pageSize)}
//         `)
//         .all(filteredProducts)

//     return c.json(200, {
//         pageNo: pageNo,
//         pageSize: pageSize,
//         totalPages: Math.ceil(totalItems / pageSize),
//         totalItems: totalItems,
//         hasNext: pageNo < Math.ceil(totalItems / pageSize),
//         hasPrev: pageNo > 1,
//         items: filteredProducts
//     })
// })

// routerAdd("GET", "/api/blogs", (c) => {
//     let pageSize = c.request.url.query().get("pageSize");
//     let pageNo = c.request.url.query().get("pageNo");
//     const search = c.request.url.query().get("search").split(" ").filter(e => e.trim().length > 0)

//     const searchFilter = search.length > 0 ? `( ${search.map(e => `LOWER(b.title) LIKE '%${e.toLowerCase()}%' OR LOWER(b.summary) LIKE '%${e.toLowerCase()}%' OR LOWER(b.content) LIKE '%${e.toLowerCase()}%'`).join(" OR ")} )` : ""
//     const filters = [searchFilter]

//     pageSize = Number(pageSize) > 0 ? Number(pageSize) : 20;
//     pageNo = Number(pageNo) > 0 ? Number(pageNo) : 1;

//     const counted = new DynamicModel({
//         totalItems: ''
//     })

//     $app.db()
//         .newQuery(`
//             SELECT 
//                 COALESCE(count(*), 0) AS totalItems
//             FROM blogs b
//             ${filters.filter(e => e.length > 0).length > 0 ? "WHERE " + filters.filter(e => e.length > 0).join(" AND ") : ""}
//         `)
//         .one(counted)

//     const totalItems = Number(counted.totalItems)

//     const filteredBlogs = arrayOf(new DynamicModel({
//         id: '',
//         title: '',
//         slug: '',
//         category: '',
//         publishedAt: '',
//         summary: '',
//         blogImageId: '',
//         blogImageSource: ''
//     }))

//     $app.db()
//         .newQuery(`
//             SELECT 
//                 b.id,
//                 b.title,
//                 b.slug,
//                 b.category,
//                 b.publishedAt,
//                 b.summary,
//                 COALESCE(i.id, '') AS blogImageId,
//                 COALESCE(i.source, '') AS blogImageSource
//             FROM blogs b
//             LEFT JOIN images i ON i.id = b.cover 
//             ${filters.filter(e => e.length > 0).length > 0 ? "WHERE " + filters.filter(e => e.length > 0).join(" AND ") : ""}
//             ORDER BY b.publishedAt
//             LIMIT ${Number(pageSize)} OFFSET ${(Number(pageNo) - 1) * Number(pageSize)}
//         `)
//         .all(filteredBlogs)

//     return c.json(200, {
//         pageNo: pageNo,
//         pageSize: pageSize,
//         totalPages: Math.ceil(totalItems / pageSize),
//         totalItems: totalItems,
//         hasNext: pageNo < Math.ceil(totalItems / pageSize),
//         hasPrev: pageNo > 1,
//         items: filteredBlogs
//     })
// })
