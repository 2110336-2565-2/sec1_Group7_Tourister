function queryObjToProgramFilter(filterBody) {
    let filter = []
    if(filterBody.province != null) filter.push({ province: filterBody.province })
    if(filterBody.language != null) filter.push({ language: filterBody.language }) 
    if(filterBody.minPrice != null) filter.push({ price: { $gte: filterBody.minPrice } }) 
    if(filterBody.maxPrice != null) filter.push({ price: { $lte: filterBody.maxPrice } })
    if(filterBody.minPeople != null) filter.push({ max_participant: { $gte: filterBody.minPeople } })
    if(filterBody.maxPeople != null) filter.push({ max_participant: { $lte: filterBody.maxPeople } })
    if(filterBody.startDate != null) filter.push({ startDate: { $gte: filterBody.startDate} })
    if(filterBody.endDate != null) filter.push({ endDate: { $lte: filterBody.endDate } })

    let sorter = {}
    if(filterBody.sortBy === 'date') sorter.startDate = filterBody.sortType === 'desc' ? -1 : 1
    else if(filterBody.sortBy === 'price') sorter.price = filterBody.sortType === 'desc' ? -1 : 1

    return {
        filter,
        sorter,
    }
}

module.exports = {
    queryObjToProgramFilter
}