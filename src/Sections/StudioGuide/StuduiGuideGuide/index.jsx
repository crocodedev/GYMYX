import styles from './StuduiGuideGuide.module.scss'

import StudioGuideHelper from '../StudioGuideHelper'
import StudioGuideRules from '../StudioGuideRules'

const StuduiGuideGuide = ({helperData, rulesData, active}) => {
  return (
    <div className={styles['studui-guide-guide']}>
      <StudioGuideHelper data={helperData} active={active}/>
      <StudioGuideRules data={rulesData}/>
      {/* {helperData && (<StudioGuideHelper data={helperData}/>)}
      {rulesData && (<StudioGuideRules data={rulesData}/>)} */}
    </div>
  )
}

export default StuduiGuideGuide