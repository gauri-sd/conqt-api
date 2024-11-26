const Product = require('../models/productModel');
const queryHelper = require('../helpers/queryHelper');

exports.getProducts = async (req, res) => {
  try {
    const { 
      currentPage = req.query.currentPage || 1, 
      pageSize = req.query.pageSize || 10, 
      orderBy = req.query.orderBy || 'ProductV2.createdAt', 
      orderDir = req.query.orderDir || 'desc', 
      searchBy = req.query.searchBy || '', 
      searchFields = req.query.searchFields || [] 
    } = req.query;
    
    if (!queryHelper.isValidOrderDir(orderDir)) {
      return res.status(400).json({ error: 'Invalid order direction' });
    }

    const offset = (currentPage - 1) * pageSize;
    const filterQuery = queryHelper.buildFilterQuery(searchBy, searchFields);

    const products = await Product.getProducts({ pageSize, offset, orderBy, orderDir, filterQuery });
    const totalCount = await Product.getProductCount({ filterQuery });

    res.status(200).json({
      currentPage: Number(currentPage),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
