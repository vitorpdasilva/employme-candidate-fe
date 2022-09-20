import { Area, Circles } from './style'
export const Background = () => ( 
  <Area>
    <Circles>
      {[...Array.from({ length: 10})].map((_, i) => <li key={i}></li>)}
    </Circles>
  </Area>
)