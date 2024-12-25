import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./redux/store/store"
import App from "./App"
import DailyTotalProvider from "./lib/providers/dailyTotal"
import SaleProvider from "./lib/providers/sale"
import ConfigProvider from "./lib/hooks/useConfig"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Provider store={store}>
		<ConfigProvider>
			<DailyTotalProvider>
				<SaleProvider>
					<App />
				</SaleProvider>
			</DailyTotalProvider>
		</ConfigProvider>
	</Provider>
)
