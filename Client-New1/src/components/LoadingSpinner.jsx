import React from 'react';

const LoadingSpinner = () => {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
				<p className="text-muted-foreground">Loading...</p>
			</div>
		</div>
	);
};

export default LoadingSpinner;