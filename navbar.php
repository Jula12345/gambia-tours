<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
<style>
    nav {
        background: linear-gradient(90deg, #FFD600 60%, #FFB300 100%);
        padding: 1em 2em;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        border-radius: 0 0 18px 18px;
        font-family: 'Montserrat', Arial, sans-serif;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    nav a {
        color: #333;
        margin: 0 1em;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.1em;
        padding: 0.5em 1em;
        border-radius: 8px;
        transition: background 0.2s, color 0.2s;
    }
    nav a:hover {
        background: #fffde7;
        color: #FFB300;
    }
    @media (max-width: 600px) {
        nav {
            padding: 0.5em;
            border-radius: 0 0 10px 10px;
        }
        nav a {
            display: block;
            margin: 0.5em 0;
            font-size: 1em;
        }
    }
</style>
<nav style="display:flex;align-items:center;gap:2em;flex-wrap:wrap;justify-content:center;">
    <a href="index.php" style="padding:0;margin:0;">
        <img src="photos/logo.png" alt="African Palm Tree Logo" style="height:48px;width:auto;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.07);vertical-align:middle;">
    </a>
    <a href="index.php">Home</a>
    <a href="tours.php">Tours</a>
    <a href="day-trips.php">Day Trip Tours</a>
    <a href="reservation.php">Reservation Form</a>
    <a href="blog.php">Blog</a>
</nav>