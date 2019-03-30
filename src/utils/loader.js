import invariant from 'invariant'
import isString from 'lodash.isstring'

const REG_REQUEST = /^(.*\/)?(.*)_(REQUEST|SUCCESS|FAILURE)$/

const normalizeActionType = actionType => {
  invariant(isString(actionType), '(app/loader...) Utils: Expected a valid actionType')

  const matcher = REG_REQUEST.exec(actionType)

  if (!matcher) {
    return actionType
  }

  const [, , requestName] = matcher
  return requestName
}

export const createLoadingSelector = actionTypes => ({ loader }) =>
  actionTypes
    .map(actionType => normalizeActionType(actionType))
    .some(requestName => loader[requestName])

export const createLoadErrorSelector = actionType => ({ loader }) => {
  const requestErrorName = `${normalizeActionType(actionType)}_ERROR`
  return loader[requestErrorName]
}

export const reducer = (state = {}, action) => {
  const { type, payload } = action

  const matches = REG_REQUEST.exec(type)

  if (!matches) {
    return state
  }

  const [, , requestName, requestState] = matches

  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
    [`${requestName}_ERROR`]: requestState === 'FAILURE' ? payload.message : ''
  }
}
