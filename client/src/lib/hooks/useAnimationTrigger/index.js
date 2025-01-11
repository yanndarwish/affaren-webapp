import { useCallback, useRef, useState } from "react"

export const useAnimationTrigger = (animationDuration) => {
	const [isAnimating, setIsAnimating] = useState(false)
	const animationTimeoutRef = useRef(null)

	const triggerAnimation = useCallback(
		(updateState) => {
			setIsAnimating(true)

			if (animationTimeoutRef.current) {
				clearTimeout(animationTimeoutRef.current)
			}

			animationTimeoutRef.current = setTimeout(() => {
				updateState()
				setIsAnimating(false)
			}, animationDuration)
		},
		[animationDuration]
	)

	return { isAnimating, triggerAnimation }
}
