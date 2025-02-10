import { TriangleAlert } from "lucide-react"
import {
	Card,
	CardTitle,
	CardFooter,
	CardHeader,
	CardContent,
	CardDescription,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { CenterContainer } from "../../assets/common/common.styles"

export const RefreshDialog = ({ theme }) => {
	const handleRefresh = () => {
		window.location.reload()
	}

	return (
		<CenterContainer>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Warning</CardTitle>
					<CardDescription>Only one tab can be opened at once</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col items-center justify-center space-y-8 h-full">
						<TriangleAlert className="w-10 h-10 text-gray-200" />
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" onClick={handleRefresh}>
						Refresh
					</Button>
				</CardFooter>
			</Card>
		</CenterContainer>
	)
}
