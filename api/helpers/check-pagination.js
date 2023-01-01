const paginationMetaData = ({ limit, page, offset, count }) => {
  limit = limit ? parseInt(limit) : 10
  const totalItems = count
  const totalPages = count == 0 ? 0 : Math.ceil(totalItems / limit)
  const currentPage = parseInt(offset >= 1 ? page : 1)
  return {
    limit: limit,
    totalItems,
    totalPages,
    currentPage,
  }
}

const checkPagination = ({ limit, page }) => {
  const pLimit = limit ? parseInt(limit) : 10
  const offset = !page || page <= 1 ? 0 : page * pLimit - pLimit

  return {
    limit: pLimit,
    offset,
  }
}

module.exports = { paginationMetaData, checkPagination }
