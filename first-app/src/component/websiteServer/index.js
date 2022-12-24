import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Articles from "./articles"
import ArticleDetail from "./detail.js"
import ArticleEdit from "./eidt.js"
const WebsitesRoutes = (props) => (
  <Router>
    <Routes>
      <Route path="/" element={<Articles />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
      <Route path="/articles/:id" element={<ArticleDetail />}></Route>
      <Route
        path="/articles/:id/edit"
        element={<ArticleEdit />}
        exact
        replace
      ></Route>
    </Routes>
  </Router>
)

export default WebsitesRoutes
