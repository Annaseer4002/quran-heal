import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { Read } from "./pages/Read"
import { Listen } from "./pages/Listen"
import ChapterDetail from "./pages/ChapterDetail"

export function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read" element={<Read />} />
        <Route path="/listen" element={<Listen />} />
        <Route path="/chapter/:chapterId" element={<ChapterDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App