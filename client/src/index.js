import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./redux/store/store"
import App from "./App"
import DailyTotalProvider from "./lib/providers/dailyTotal"
import SaleProvider from "./lib/providers/sale"
import ConfigProvider from "./lib/hooks/useConfig"
import { EventsProvider } from "./lib/hooks/useEvents"
import { SessionProvider } from "./lib/hooks/useSession"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Provider store={store}>
		<SessionProvider>
			<ConfigProvider>
				<DailyTotalProvider>
					<SaleProvider>
						<EventsProvider>
							<App />
						</EventsProvider>
					</SaleProvider>
				</DailyTotalProvider>
			</ConfigProvider>
		</SessionProvider>
	</Provider>
)
