export const jobList = [
  {
    id: 1,
    recent: true,
    createdAt: new Date().getTime() / 1000, // epoch
    title: 'Software Developer',
    location: 'Vancouver - Canada',
    locationType: 'Relocation Only (Sponsored Visa)',
    salary: {
      from: '80000',
      to: '100000',
      currency: 'CAD',
      period: 'Annually',
    },
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    tags: ['java', 'react', 'javascript'],
  },
  {
    id: 2,
    recent: false,
    createdAt: new Date().getTime() / 1000, // epoch
    title: 'Software Engineer',
    location: 'Vancouver - Canada',
    locationType: 'Relocation Only (Sponsored Visa)',
    salary: {
      from: '60000',
      to: '110000',
      currency: 'CAD',
      period: 'Annually',
    },
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    tags: ['react', 'javascript', 'redux', 'styled-components'],
  }
];

export default function(req, res) {
  res.status(200).json(jobList);
}