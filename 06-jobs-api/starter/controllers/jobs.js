

const getAllJobs = async () => {
    res.send('get all jobs')
}

const getJob = async () => {
    res.send('get jobs')
}

const createJob = async () => {
    res.send('create jobs')
}

const updateJobs = async () => {
    res.send('update jobs')
}

const deleteJobs = async () => {
    res.send('delete jobs')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJobs,
    deleteJobs
}