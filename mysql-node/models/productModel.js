const db = require('../config/dbConfig');

exports.getProducts = async ({ pageSize, offset, orderBy, orderDir, filterQuery }) => {
  const [results] = await db.query(`
    SELECT *
    FROM ProductV2
    LEFT JOIN VendorsOrganizations ON ProductV2.vendors = VendorsOrganizations.VendorOrganizationId
    WHERE 1=1 ${filterQuery}
    ORDER BY ${orderBy} ${orderDir}
    LIMIT ? OFFSET ?
  `, [Number(pageSize), Number(offset)]);
  
  return results;
};

exports.getProductCount = async ({ filterQuery }) => {
  const [result] = await db.query(`
    SELECT COUNT(*) AS count
    FROM ProductV2
    LEFT JOIN VendorsOrganizations ON ProductV2.vendors = VendorsOrganizations.VendorOrganizationId
    WHERE 1=1 ${filterQuery}
  `);
  
  return result[0].count;
};