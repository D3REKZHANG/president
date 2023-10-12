import { createBrowserRouter } from 'react-router-dom';
import { Landing } from './pages/Landing.tsx';
import { Create } from './pages/Create.tsx';
import { Join } from './pages/Join.tsx';
import { Game } from './pages/Game.tsx';
import { Lobby } from './pages/Lobby.tsx';

export const router = createBrowserRouter([
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
        path: "/game/:code",
        element: <Game />,
    },
    {
        path: "/lobby/:code",
        element: <Lobby />,
    },
]);
