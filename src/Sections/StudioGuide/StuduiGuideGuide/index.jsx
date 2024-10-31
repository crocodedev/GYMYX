import styles from './StuduiGuideGuide.module.scss'

import StudioGuideHelper from '../StudioGuideHelper'
import StudioGuideRules from '../StudioGuideRules'

const StuduiGuideGuide = ({helperData, rulesData}) => {
  console.log(helperData)
  return (
    <div className={styles['studui-guide-guide']}>
      {helperData && (<StudioGuideHelper data={helperData}/>)}
      {rulesData && (<StudioGuideRules data={rulesData}/>)}
    </div>
  )
}

export default StuduiGuideGuide