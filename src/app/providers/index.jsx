import { compose } from 'redux'

import { withRouter } from './withRouter'
import { withHelmet } from './withHelmet'

export const withHocs = compose(withRouter, withHelmet)
