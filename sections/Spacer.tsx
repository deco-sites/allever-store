interface Props {
	size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
}

export default function Space({
	size = 'small',
}: Props) {
	const sizes = {
		small: '1rem',
		medium: '2rem',
		large: '3.25rem',
		xlarge: '4rem',
		xxlarge: '6rem',
	}

	return (
		<div
			style={{ height: sizes[size] }}
		/>
	)
}