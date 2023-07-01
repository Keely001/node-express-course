const getAllTasks = (req,res) => {
    res.send('all items')
}

const createTask = (req,res) => {
    res.send('created')
}

const getTask = (req,res) => {
    res.send('get one')
}

const updateTask = (req,res) => {
    res.send('updated')
}

const deleteTask = (req,res) => {
    res.send('Deleted')
}


module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask
}