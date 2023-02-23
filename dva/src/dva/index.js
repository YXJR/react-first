import React from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { createStore, combineReducers } from "redux"
import prefixNamespace from "./prefixNamespace"
function dva() {
  const app = {
    _models: [],
    router,
    _router: null,
    start,
  }
  let initialReducers = {}
  function model(model) {
    let prefixedModel = prefixNamespace(model)
    app._models.push(model)
    return prefixedModel
  }

  function router(router) {
    app._router = router
  }

  function start(selector) {
    for (const model of app._models) {
      initialReducers[model.namespace] = getReducer(model)
    }
    let rootReducer = createReducer()
    let store = createStore(rootReducer)
    ReactDOM.render(
      <Provider store={store}> {app._router()}</Provider>,
      document.querySelector(selector)
    )

    function createReducer() {
      return combineReducers(initialReducers)
    }

    //将多个模型的reducer进行整合
    function getReducer(model) {
      let { reducers, state: initialState } = model
      let reducer = (state = initialState, action) => {
        let reducer = reducers[action.type]
        if (reducer) {
          return reducer(state, action)
        }
        return state
      }
      return reducer
    }
  }
  return app
}

export default dva
