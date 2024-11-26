exports.buildFilterQuery = (searchBy, searchFields) => {
    if (!searchBy || searchFields.length === 0) return '';
  
    const searchConditions = searchFields.map(field => `${field} LIKE ?`).join(' OR ');
    return `AND (${searchConditions})`;
  };
  
  exports.isValidOrderDir = (orderDir) => ['asc', 'desc'].includes(orderDir.toLowerCase());
  