<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day Trip Tours - Gambia Tours</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', Arial, sans-serif; background: #f7f8fa; margin: 0; }
        .container { max-width: 900px; margin: 2em auto; padding: 2em; background: #fff; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        h1 { color: #FFB300; font-size: 2em; margin-bottom: 1em; text-align: center; }
        .trip-list { display: flex; flex-direction: column; gap: 2em; }
        .trip-card { background: #fffbe7; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 1.5em; display: flex; flex-wrap: wrap; align-items: center; gap: 2em; }
        .trip-img { width: 220px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); margin-bottom: 1em; }
        .trip-info { flex: 1; min-width: 220px; }
        .trip-title { color: #008080; font-size: 1.3em; margin-bottom: 0.5em; }
        .trip-desc { font-size: 1.08em; color: #444; margin-bottom: 0.7em; }
        .book-btn { background: linear-gradient(90deg,#FFD600 60%,#FFB300 100%); color: #333; font-weight: 700; padding: 0.5em 1.5em; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.07); font-size: 1em; border: none; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .book-btn:hover { background: #FFB300; color: #fff; }
        @media (max-width: 600px) { .container { padding: 1em; } .trip-card { flex-direction: column; gap: 1em; } .trip-img { width: 100%; } }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>
    <div class="container">
        <h1>Day Trip Tours with Local Guide</h1>
        <div class="trip-list">
            <div class="trip-card">
                <img class="trip-img" src="photos/river-gambia.jpeg" alt="River Gambia Fishing Trip">
                <div class="trip-info">
                    <div class="trip-title">River Gambia Fishing & Nature Day Trip</div>
                    <div class="trip-details" style="color:#008080;font-size:0.98em;margin-bottom:0.5em;"><strong>Includes:</strong> Hotel pick up & drop off, fishing gear, local lunch, nature guide.</div>
                    <div class="trip-desc">
                        Enjoy a relaxing day along the majestic River Gambia. Cast your line and fish in tranquil waters, surrounded by lush mangroves. As you drift along the riverbanks, spot dolphins, exotic birds, and the unique oysters that thrive in the mangroves. Experience the extraordinary biodiversity and peaceful atmosphere of the river, which connects to the Atlantic Ocean. Perfect for nature lovers and those seeking a lazy, memorable day in The Gambia.
                    </div>
                    <div class="trip-details" style="margin-top:0.7em;color:#008080;font-size:1em;">
                        <strong>Highlights:</strong>
                        <ul style="margin:0.5em 0 0 1em;padding:0;">
                            <li>Guided fishing trip on the River Gambia</li>
                            <li>Relax and explore the riverbanks and mangroves</li>
                            <li>Spot dolphins, exotic birds, and mangrove oysters</li>
                            <li>Learn about the river’s connection to the Atlantic Ocean</li>
                            <li>Enjoy a delicious local lunch by the water</li>
                        </ul>
                    </div>
                    <div style="height:0.7em;"></div>
                    <a href="reservation.php?tour=river-gambia-fishing" class="book-btn">Book Now</a>
                </div>
            </div>
            <div class="trip-card">
                <img class="trip-img" src="photos/banjul-market.jpeg" alt="Banjul Albert Market">
                <div class="trip-info">
                    <div class="trip-title">Banjul Albert Market & Shopping</div>
                    <div class="trip-details" style="color:#008080;font-size:0.98em;margin-bottom:0.5em;"><strong>Includes:</strong> Hotel pick up & drop off, local lunch, Gambian culinary class.</div>
                    <div class="trip-desc">Explore the vibrant Albert Market in Banjul with a local guide. Shop for crafts, textiles, and fresh produce while experiencing the lively atmosphere and local culture.</div>
                    <div class="trip-details" style="margin-top:0.7em;color:#008080;font-size:1em;">
                        <strong>Includes:</strong> Hotel pick up and drop off, local lunch with a taste of Gambian traditional cuisine, and a hands-on culinary class where you help prepare your meal.
                    </div>
                    <div style="height:0.7em;"></div>
                    <a href="reservation.php?tour=banjul-market" class="book-btn">Book Now</a>
                </div>
            </div>
            <div class="trip-card">
                <img class="trip-img" src="photos/snake2.jpeg" alt="Snake Farm">
                <img class="trip-img" src="photos/snake.jpeg" alt="Snake Farm">
                <div class="trip-info">
                    <div class="trip-title">Snake Farm Adventure</div>
                    <div class="trip-details" style="color:#008080;font-size:0.98em;margin-bottom:0.5em;"><strong>Includes:</strong> Hotel pick up & drop off, local lunch, Gambian culinary class.</div>
                    <div class="trip-desc">Visit the famous Snake Farm and learn about the fascinating reptiles of The Gambia. Enjoy a guided tour and see snakes up close in a safe environment.</div>
                    <div class="trip-details" style="margin-top:0.7em;color:#008080;font-size:1em;">
                        <strong>Includes:</strong> Hotel pick up and drop off, local lunch with a taste of Gambian traditional cuisine, and a hands-on culinary class where you help prepare your meal.
                    </div>
                    <div style="height:0.7em;"></div>
                    <a href="reservation.php?tour=snake-farm" class="book-btn">Book Now</a>
                </div>
            </div>
            <div class="trip-card">
                <img class="trip-img" src="photos/tanji-market.jpeg" alt="Tanji Fishing Market">
                <div class="trip-info">
                    <div class="trip-title">Tanji Fishing Market Visit</div>
                    <div class="trip-details" style="color:#008080;font-size:0.98em;margin-bottom:0.5em;"><strong>Includes:</strong> Hotel pick up & drop off, local lunch, Gambian culinary class.</div>
                    <div class="trip-desc">Experience the bustling Tanji Fishing Market, watch fishermen at work, and sample fresh seafood. A unique insight into Gambian coastal life.</div>
                    <div class="trip-details" style="margin-top:0.7em;color:#008080;font-size:1em;">
                        <strong>Includes:</strong> Hotel pick up and drop off, local lunch with a taste of Gambian traditional cuisine, and a hands-on culinary class where you help prepare your meal.
                    </div>
                    <div style="height:0.7em;"></div>
                    <a href="reservation.php?tour=tanji-market" class="book-btn">Book Now</a>
                </div>
            </div>
            <div class="trip-card">
                <img class="trip-img" src="photos/crocodile.jpeg" alt="Crocodile Pool">
                <div class="trip-info">
                    <div class="trip-title">Crocodile Pool Trip</div>
                    <div class="trip-details" style="color:#008080;font-size:0.98em;margin-bottom:0.5em;"><strong>Includes:</strong> Hotel pick up & drop off, local lunch, Gambian culinary class.</div>
                    <div class="trip-desc">Take a day trip to the sacred Crocodile Pool, learn about its history, and see crocodiles in their natural habitat. Guided by a knowledgeable local expert.</div>
                    <div class="trip-details" style="margin-top:0.7em;color:#008080;font-size:1em;">
                        <strong>Includes:</strong> Hotel pick up and drop off, local lunch with a taste of Gambian traditional cuisine, and a hands-on culinary class where you help prepare your meal.
                    </div>
                    <div style="height:0.7em;"></div>
                    <a href="reservation.php?tour=crocodile-pool" class="book-btn">Book Now</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
