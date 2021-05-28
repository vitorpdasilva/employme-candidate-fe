export default function(req, res) {
  const { id } = req.query;
  res.end(`id: ${id}`)
}