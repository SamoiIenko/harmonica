import { compose } from 'redux'

import { withRouter } from './withRouter'

export const withHocs = compose(withRouter)
