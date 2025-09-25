// Inject modern navbar into all pages
const navbarHTML = `
<nav class="navbar">
	<div class="navbar-logo">
		<img src="https://gambiantour.com/photos/logo.png" alt="Gambia Tours Logo" style="height:40px;vertical-align:middle;"> <span class="logo-text">Gambia Tours</span>
	</div>
	<button class="burger" aria-label="Open menu" onclick="toggleMenu()">
		<span></span><span></span><span></span>
	</button>
	<div class="navbar-links" id="navbarLinks">
		<a href="https://gambiantour.com/index.html">Home</a>
		<a href="https://gambiantour.com/tours.html">Tours</a>
		<a href="https://gambiantour.com/day-trips.html">Day Trip Tours</a>
		<a href="https://gambiantour.com/reservation.html">Reservation Form</a>
		<a href="https://gambiantour.com/blog.html">Blog</a>
	</div>
</nav>
`;
window.addEventListener('DOMContentLoaded', () => {
	const navPlaceholder = document.getElementById('navbar-placeholder');
	if (navPlaceholder) navPlaceholder.innerHTML = navbarHTML;
});
// Burger menu functionality for mobile navigation
function toggleMenu() {
	const links = document.getElementById('navbarLinks');
	links.classList.toggle('open');
}
