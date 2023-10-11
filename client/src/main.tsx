import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Landing } from './pages/Landing.tsx'
import { ConfigProvider } from 'antd'
import { Create } from './pages/Create.tsx'
import { Join } from './pages/Join.tsx'
import { Game } from './pages/Game.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/new",
    element: <Create />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#dea300',
      },
    }}
  >
    <div className="app">
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <RouterProvider router={router} />
      </CookiesProvider>
    </div>
  </ConfigProvider>
)
