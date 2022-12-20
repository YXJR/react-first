import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Articles from "./articles"
import ArticleDetail from "./detail.js"

const WebsitesRoutes = (props) => (
  <Router {...props}>
    <Routes>
      <Route path="/" element={<Articles />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
      <Route
        path="/articles/:id"
        element={<ArticleDetail />}
        exact
        replace
      ></Route>
    </Routes>
  </Router>
)

export default WebsitesRoutes
