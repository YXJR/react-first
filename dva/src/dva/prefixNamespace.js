function prefix(obj, namespace) {
  return Object.keys(obj).reduce((memo, key) => {
    const newKey = `${namespace}/${key}`
    memo[newKey] = obj[key]
    return memo
  }, {})
}

//给model中的reducer添加命名空间
function prefixNamespace(model) {
  if (model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace)
  }
  return model
}

export default prefixNamespace
