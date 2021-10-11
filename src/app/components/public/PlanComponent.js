import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlanComponent = (props) => {
  const [plan, setPlan] = useState({})
  const [features, setFeatures] = useState([])

  useEffect(() => {
    setPlan(props.plan)
    setFeatures(props.plan.features)
  }, [props])

  return (
    <div className='col-sm-10 col-md-4 col-lg-4 col-xl-4 mb-4'>
      <ul className='list-group'>
        <li className='list-group-item heading-list-group-item-blue'>
          <h3 className='text-white'>{plan.title}</h3><span className='text-white'><strong>{plan.price} {plan.currency}/mese (+IVA)</strong><br /></span>
        </li>
        {
          (features.length > 0)
            ? features.map((feature, index) => (
              <li className='list-group-item' key={index}><span>{feature}</span></li>
              ))
            : <li className='list-group-item'><span>Non ci sono feature per questo piano</span></li>
        }
        <li className='list-group-item'><Link to='/dashboard'><button className='btn btn-primary' type='button'>Acquista</button></Link></li>
      </ul>
    </div>

  )
}
export default PlanComponent
