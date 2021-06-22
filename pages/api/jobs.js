export const jobList = [
  {
    id: 0,
    recent: true,
    createdAt: 1624303160 * 1000, // epoch
    title: 'Software Developer',
    location: {
      city: 'Vancouver',
      country: 'Canada',
      province: 'BC',
    },
    locationType: 'Relocation Only (Sponsored Visa)',
    salary: {
      from: '80000',
      to: '100000',
      currency: 'CAD',
      period: 'Annually',
    },
    description: `
      <p><strong>THIS JOB IS FULL REMOTE!!</strong></p>
      <p>
        A company founded in 2016 having as main product Cloud-Based SaaS solutions   is looking to add their team a Python Engineer.
      </p>
      
      <p>
        We are looking for:
      </p>
      <ul>
        <li>4-5+ years of professional experience working with Python/Django.</li>
        <li>Good knowledge of container technologies.</li>
        <li>Strong fundamental programming skills such as solid coding standards, design patterns.</li>
        <li>Experience working in an agile environment</li>
      </ul>
      
      <p>
        <strong>IMPORTANT!</strong>
      </p>
      <p>
        Candidates with Advanced or Fluent English will be accepted.
      </p>
      <p>
        Candidates who have completed a test in Python and scored above 75% will be a plus!
      </p>
    `,
    tags: ['java', 'react', 'javascript'],
  },
  {
    id: 1,
    recent: false,
    createdAt: 1624303160 * 1000, // epoch
    title: 'Software Engineer',
    location: {
      city: 'Vancouver',
      country: 'Canada',
      province: 'BC',
    },
    locationType: 'Relocation Only (Sponsored Visa)',
    salary: {
      from: '60000',
      to: '110000',
      currency: 'CAD',
      period: 'Annually',
    },
    description: `
      <p><strong>THIS JOB IS FULL REMOTE!!</strong></p>
      <p>
        A company founded in 2016 having as main product Cloud-Based SaaS solutions   is looking to add their team a Python Engineer.
      </p>
      
      <p>
        We are looking for:
      </p>
      <ul>
        <li>4-5+ years of professional experience working with Python/Django.</li>
        <li>Good knowledge of container technologies.</li>
        <li>Strong fundamental programming skills such as solid coding standards, design patterns.</li>
        <li>Experience working in an agile environment</li>
      </ul>
      
      <p>
        <strong>IMPORTANT!</strong>
      </p>
      <p>
        Candidates with Advanced or Fluent English will be accepted.
      </p>
      <p>
        Candidates who have completed a test in Python and scored above 75% will be a plus!
      </p>
    `,
    tags: ['react', 'javascript', 'redux', 'styled-components'],
  }
];

export default function(req, res) {
  res.status(200).json(jobList);
}