import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd'
import { router } from './router'

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
        <ToastContainer />
      </CookiesProvider>
    </div>
  </ConfigProvider>
)
