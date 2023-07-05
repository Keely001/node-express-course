const Product = require('../models/product')

const getAllProductsStatic = async (req,res) => {
    const search = 'ab'
    const products = await Product.find({}).select('-name price')
    res.status(200).json({products})
}
const getAllProducts = async (req,res) => {
    const { featured,company, name, sort, field } = req.query; 
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = {$regex: search, $options: 'i'};
    }
    let result = Product.find(queryObject);
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }
    if(field){
        const fieldList = field.split(',').join(' ')
        result = result.select(fieldList)
    }
    else{
        result = result.select('createdAt name')
    }

    const products = await result
    res.status(200).json({products,nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}