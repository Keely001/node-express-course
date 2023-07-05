const Product = require('../models/product')

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({})
    .select('-name price')
    .limit(4)
    res.status(200).json({products,nbHits:products.length})
}
const getAllProducts = async (req,res) => {
    const { featured,company, name, sort, field, numericFilters } = req.query; 
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }

    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        })

        console.log(queryObject)
        console.log(numericFilters)
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

    const page = Number(req.body.page) || 1
    const limit = Number(req.body.limit) || 10
    

    const products = await result
    res.status(200).json({products,nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}