import { BrowserRouter as AppRouter } from "react-router";
import AppProviders from "./providers/AppProviders.jsx";
import AppLayouts from "./layouts/AppLayouts.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import Toast from "./components/Toast.jsx";
import "./App.css";

export default function App () {
  return (
    <AppRouter>
      <Toast />
      <AppProviders>
        <AppLayouts>
          <AppRoutes />
        </AppLayouts>
      </AppProviders>
    </AppRouter>
  );
}
