"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					fontFamily: "Inter, system-ui, sans-serif",
					backgroundColor: "#fafafa",
					margin: 0,
				}}>
				<div style={{ textAlign: "center", maxWidth: 420, padding: "1rem" }}>
					<h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8 }}>
						Something went wrong
					</h1>
					<p style={{ color: "#666", marginBottom: 24 }}>
						{error.message || "An unexpected error occurred."}
					</p>
					<button
						onClick={reset}
						style={{
							padding: "10px 24px",
							borderRadius: 8,
							border: "none",
							backgroundColor: "#3b82f6",
							color: "#fff",
							fontWeight: 600,
							cursor: "pointer",
							marginRight: 8,
						}}>
						Try Again
					</button>
					<a
						href="/"
						style={{
							padding: "10px 24px",
							borderRadius: 8,
							border: "1px solid #ddd",
							color: "#333",
							fontWeight: 600,
							textDecoration: "none",
						}}>
						Go Home
					</a>
				</div>
			</body>
		</html>
	);
}
