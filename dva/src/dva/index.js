import React from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "@redux-saga/core"
import prefixNamespace from "./prefixNamespace"
import * as sagaEffects from "redux-saga/effects"
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

  // start方法主要是实现渲染
  function start(selector) {
    for (const model of app._models) {
      initialReducers[model.namespace] = getReducer(model)
    }
    let rootReducer = createReducer()
    const sagas = getSagas(app)
    sagas.forEach((saga) => sagaMiddleware.run(saga))
    const sagaMiddleware = createSagaMiddleware()
    let store = applyMiddleware(sagaMiddleware)(createStore)(rootReducer)
    ReactDOM.render(
      <Provider store={store}> {app._router()}</Provider>,
      document.querySelector(selector)
    )
    function getSagas(app) {
      let sagas = []
      for (const model of app._models) {
        sagas.push(getSaga(model.effects, model))
      }
      return sagas
    }

    function getSaga(effects, model) {
      //返回一个匿名saga
      return function* () {
        for (const key in effects) {
          const watcher = getWatcher(key, model.effects[key], model)
          yield sagaEffects.fork(watcher)
        }
      }
    }

    //rootSaga  watcherSaga  workerSaga
    /**
     * 返回一个watcherSaga 当每次向仓库派发asyncAdd的时候，都会执行asyncAddEffect saga
     * @param {*} key  asyncAdd
     * @param {*} effect asyncAddEffect
     * @param {*} model
     * @returns
     */
    function getWatcher(key, effect, model) {
      //saga的默认行为，就是每当动作派发的时候，在执行effect的时候会默认传递action
      return function* () {
        yield sagaEffects.takeEvery(key, function* sagaWithCatch(...args) {
          console.log("args", args)
          yield effect(...args, {
            ...sagaEffects,
            put: (action) => {
              sagaEffects.put({
                ...action,
                type: prefixType(action.type, model),
              })
            },
          })
        })
      }
    }

    function prefixType(type, model) {
      if (type.indexOf("/") === -1) {
        return `${model.namespace}/${type}` // counter1/add
      } else {
        if (type.slice(0, type.indexOf("/"))) {
          console.log("Warning: [SagaEffects.put] ......")
        }
        return type
      }
    }

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
