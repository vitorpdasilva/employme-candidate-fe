const { jobList } = require('../jobs')

export default function (req, res) {
  const { id } = req.query
  res.status(200).json(jobList[id])
}
