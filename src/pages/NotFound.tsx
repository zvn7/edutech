const NotFound = () => {
	return (
		<div className="bg-gradient-to-br from-purple-800 to-blue-600 text-white min-h-screen flex items-center">
			<div className="container mx-auto p-4 flex flex-wrap items-center justify-center">
				<div className="w-full md:w-7/12 text-center md:text-left p-4">
					<div className="text-6xl font-medium">404</div>
					<div className="text-xl md:text-3xl font-medium mb-4">
						Oops. This page has gone missing.
					</div>
					<div className="text-lg mb-8">
						You may have mistyped the address or the page may have moved.
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
