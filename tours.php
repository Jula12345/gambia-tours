</body>
<div style="position:fixed;bottom:2em;left:2em;z-index:1000;display:flex;align-items:center;gap:1em;background:rgba(255,255,255,0.95);box-shadow:0 4px 24px rgba(0,0,0,0.10);border-radius:18px;padding:1em 2em;max-width:340px;">
    <img src="photos/logo.png" alt="African Palm Tree Logo" style="height:64px;width:auto;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
    <span style="font-size:1.3em;font-weight:700;color:#008080;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Welcome to Gambia Tours</span>
</div>
</body>
<div style="position:fixed;bottom:2em;left:2em;z-index:1000;display:flex;align-items:center;gap:1em;background:rgba(255,255,255,0.95);box-shadow:0 4px 24px rgba(0,0,0,0.10);border-radius:18px;padding:1em 2em;max-width:340px;">
    <img src="photos/logo.png" alt="African Palm Tree Logo" style="height:64px;width:auto;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
    <span style="font-size:1.3em;font-weight:700;color:#008080;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Welcome to Gambia Tours</span>
</div>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tours - Gambia Tours</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', Arial, sans-serif; background: #f7f8fa; margin: 0; }
        .container { max-width: 900px; margin: 2em auto; padding: 2em; background: #fff; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        h1 { color: #FFB300; font-size: 2em; margin-bottom: 1em; }
        .tour-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2em;
            margin-top: 2em;
        }
        .tour-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.10);
            padding: 2em 1.5em 1.5em 1.5em;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: box-shadow 0.2s, transform 0.2s;
            position: relative;
        }
        .tour-card:hover {
            box-shadow: 0 8px 32px rgba(0,0,0,0.13);
            transform: translateY(-4px) scale(1.02);
        }
        .tour-card img {
            width: 90%;
            max-width: 260px;
            border-radius: 14px;
            margin-bottom: 1.2em;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .tour-card h2 {
            color: #008080;
            font-size: 1.25em;
            margin-bottom: 0.5em;
            text-align: center;
        }
        .tour-card p {
            font-size: 1.08em;
            color: #444;
            margin-bottom: 0.7em;
            text-align: center;
        }
        .tour-card .price {
            color: #FFB300;
            font-weight: 700;
            font-size: 1.12em;
            margin-bottom: 0.7em;
        }
        .book-btn {
            margin-top: 1em;
            background: linear-gradient(90deg,#FFD600 60%,#FFB300 100%);
            color: #333;
            font-weight: 700;
            padding: 0.5em 1.5em;
            border-radius: 8px;
            text-decoration: none;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
            font-size: 1em;
            border: none;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
        }
        .book-btn:hover {
            background: #FFB300;
            color: #fff;
        }
        @media (max-width: 600px) {
            .container { padding: 1em; }
            .tour-list { grid-template-columns: 1fr; gap: 1.2em; }
            .tour-card { padding: 1.2em 0.7em; }
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>
    <div class="container">
        <section style="background:#fffbe7;border-radius:18px;box-shadow:0 4px 24px rgba(0,0,0,0.07);padding:2em;margin-bottom:2em;">
            <h1 style="color:#FFB300;font-size:2em;margin-bottom:0.7em;text-align:center;">Featured Tour Packages: Gambia & Senegal</h1>
            <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1.5em;margin-bottom:2em;">
                <img src="photos/baobab.jpeg" alt="Baobab Tree" style="height:160px;width:auto;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);object-fit:cover;">
                <img src="photos/lion.jpeg" alt="Lion Safari" style="height:160px;width:auto;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);object-fit:cover;">
                <img src="photos/culture.jpeg" alt="Culture Experience" style="height:160px;width:auto;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);object-fit:cover;">
                <img src="photos/monkey.jpeg" alt="Monkey Wildlife" style="height:160px;width:auto;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);object-fit:cover;">
                <img src="photos/zebra.jpeg" alt="Zebra Safari" style="height:160px;width:auto;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);object-fit:cover;">
                <img src="photos/sunset.jpeg" alt="African Sunset" style="height:160px;width:auto;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);object-fit:cover;">
            </div>
            <p style="font-size:1.15em;color:#444;margin-bottom:1.2em;text-align:center;">We offer exclusive 7, 10, 14, and 21-day tour packages covering the best of The Gambia and Senegal. Our packages include all cultural heritage tours in both countries, a thrilling safari experience in Senegal’s Fathala Park (walk with lions!), and a memorable visit to Kunta Kinteh Island in The Gambia.</p>
            <ul style="font-size:1.08em;color:#333;line-height:1.7;margin-left:2em;margin-bottom:1.2em;">
                <li><strong>7-Day Tour:</strong> Highlights of Gambia & Senegal, including city tours, local markets, and a day trip to Fathala Park for a walking safari with lions.</li>
                <li><strong>10-Day Tour:</strong> In-depth cultural heritage experience, village visits, Kunta Kinteh Island, and wildlife excursions in both countries.</li>
                <li><strong>14-Day Tour:</strong> Full immersion in Gambian and Senegalese culture, extended safari adventures, and guided tours of UNESCO sites.</li>
                <li><strong>21-Day Tour:</strong> The ultimate West African journey, combining all cultural, historical, and wildlife attractions, plus plenty of time for relaxation and local experiences.</li>
            </ul>
            <section style="background:#f7f8fa;border-radius:14px;padding:1.5em 1em;margin:2em 0;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                <h2 style="color:#008080;text-align:center;margin-bottom:0.7em;">Group & Custom Tours, Travel Services</h2>
                <p style="font-size:1.12em;color:#444;margin-bottom:1em;text-align:center;">We offer group tours ranging from 2 to 20 people, as well as individual, custom tailor-made tours for solo travelers, couples, family holidays, and romantic getaways. Immerse yourself in the paradise of Gambia’s beach retreats and vibrant culture.</p>
                <p style="font-size:1.08em;color:#444;margin-bottom:1em;text-align:center;">Our team works closely with international travel agencies, tour operators worldwide, and local travel experts. We connect you with both global knowledge and local dedication to ensure you have the best experience during your holiday.</p>
                <p style="font-size:1.08em;color:#444;margin-bottom:1em;text-align:center;">We handle all your travel needs—from airline ticket reservations to hotel bookings, excursions, and more. You are just a click away from booking the experience of a lifetime. Let us take care of every detail so you can relax and enjoy your journey!</p>
            </section>
            </ul>
            <p style="font-size:1.08em;color:#444;text-align:center;">All packages include comfortable accommodation, expert guides, transportation, and authentic local meals. <br>Contact us for a detailed itinerary and pricing, or <a href="reservation.php" style="color:#FFB300;font-weight:700;text-decoration:underline;">reserve your adventure now</a>!</p>
            <hr style="margin:2em 0;">
            <h2 style="color:#008080;text-align:center;margin-bottom:1em;">Day Trip Tour Options</h2>
            <ul style="font-size:1.08em;color:#333;line-height:1.7;margin-left:2em;margin-bottom:1.2em;">
                <li><strong>Banjul Albert Market & Shopping:</strong> Explore the vibrant Albert Market in Banjul with a local guide. Shop for crafts, textiles, and fresh produce while experiencing the lively atmosphere and local culture. <a href="reservation.php?tour=banjul-market" style="color:#FFB300;font-weight:700;text-decoration:underline;">Book Now</a></li>
                <li><strong>Snake Farm Adventure:</strong> Visit the famous Snake Farm and learn about the fascinating reptiles of The Gambia. Enjoy a guided tour and see snakes up close in a safe environment. <a href="reservation.php?tour=snake-farm" style="color:#FFB300;font-weight:700;text-decoration:underline;">Book Now</a></li>
                <li><strong>Tanji Fishing Market Visit:</strong> Experience the bustling Tanji Fishing Market, watch fishermen at work, and sample fresh seafood. A unique insight into Gambian coastal life. <a href="reservation.php?tour=tanji-market" style="color:#FFB300;font-weight:700;text-decoration:underline;">Book Now</a></li>
                <li><strong>Crocodile Pool Trip:</strong> Discover the legendary Crocodile Pool, learn about its history, and see crocodiles in their natural habitat. <a href="reservation.php?tour=crocodile-pool" style="color:#FFB300;font-weight:700;text-decoration:underline;">Book Now</a></li>
            </ul>
        </section>
        <h1>Our Tours</h1>
        <div class="tour-list">
            <div class="tour-card">
                <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" alt="Package Tour">
                <h2>Package Tours</h2>
                <div class="price">€120</div>
                <p>Choose from our curated packages for a complete Gambian experience. Enjoy city tours, nature excursions, and cultural experiences tailored to your interests.</p>
                <a href="reservation.php?tour=package" class="book-btn">Book Now</a>
            </div>
            <div class="tour-card">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="River Excursion">
                <h2>River Excursion</h2>
                <div class="price">€60</div>
                <p>
                    <strong>2-Day Janjangbureh River Safari:</strong><br>
                    Embark on an unforgettable 2-day excursion to Janjangbureh (formerly Georgetown), renowned for its Chimpanzee Rehabilitation Project. While trekking is not permitted, you can observe chimpanzees from the boat as you cruise along the river. Enjoy sightings of hippos, crocodiles, baboons, and rare birds along the scenic riverbanks.<br><br>
                    This eco-friendly adventure is ideal for those seeking a true safari experience without the crowds. The tour includes a river cruise from Tendaba Camp into the creeks, where you’ll encounter abundant wildlife and breathtaking natural beauty.<br><br>
                    <strong>Itinerary Highlights:</strong>
                    <ul style="text-align:left;margin:0.5em 0 0.5em 1em;">
                        <li>Day 1: Depart for Tendaba Camp, board a boat for a guided safari into the river creeks</li>
                        <li>Observe chimpanzees, hippos, crocodiles, baboons, and rare bird species from the boat</li>
                        <li>Lunch and relaxation at the camp, evening river cruise for sunset wildlife viewing</li>
                        <li>Overnight stay at a riverside lodge or camp</li>
                        <li>Day 2: Morning boat safari, explore Janjangbureh town, visit local sites and markets</li>
                        <li>Return journey with stops for birdwatching and photography</li>
                    </ul>
                    Perfect for eco-tourists and nature lovers seeking an authentic Gambian safari adventure.
                </p>
                <a href="reservation.php?tour=river" class="book-btn">Book Now</a>
            </div>
            <div class="tour-card">
                <img src="photos/snake.jpeg" alt="Snake in City Tour">
                <h2>City Tours</h2>
                <div class="price">€35</div>
                <p>Experience the culture, history, and vibrant life of Gambian cities. Guided walks, local markets, and more. Perfect for first-time visitors and seasoned travelers alike.</p>
                <a href="reservation.php?tour=city" class="book-btn">Book Now</a>
            </div>
            <div class="tour-card">
                <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" alt="Package Tour">
                <h2>Package Tours</h2>
                <div class="price">€120</div>
                <p>Choose from our curated packages for a complete Gambian experience. Enjoy city tours, nature excursions, and cultural experiences tailored to your interests.</p>
                <a href="reservation.php?tour=package" class="book-btn">Book Now</a>
            </div>
            <div class="tour-card">
                <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" alt="Cultural Experience">
                <h2>Cultural Experience</h2>
                <div class="price">€40</div>
                <p>Immerse yourself in Gambian culture with visits to traditional villages, music and dance performances, and local cuisine tastings.</p>
                <a href="reservation.php?tour=cultural" class="book-btn">Book Now</a>
            </div>
            <div class="tour-card">
                <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Wildlife Safari">
                <h2>Wildlife Safari</h2>
                <div class="price">€70</div>
                <p>Go on a safari to see monkeys, hippos, crocodiles, and more in their natural habitats. A must for nature and animal lovers.</p>
                <a href="reservation.php?tour=wildlife" class="book-btn">Book Now</a>
            </div>
            <div class="tour-card">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Beach Relaxation">
                <h2>Beach Relaxation</h2>
                <div class="price">€30</div>
                <p>Relax on the beautiful beaches of The Gambia and enjoy the sun, sea, and sand. We offer 7-day, 10-day, and 14-day all-inclusive beach and romantic holiday packages in luxurious sea-view 5-star hotels or private apartments overlooking the Atlantic Ocean. Experience eco-friendly tourism in a local environment, where you can mix with the locals and learn about Gambian customs and traditions. Ideal for unwinding, celebrating, or discovering the authentic spirit of The Gambia.</p>
                <a href="reservation.php?tour=beach" class="book-btn">Book Now</a>
            </div>
            <div class="tour-card">
                <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80" alt="Custom Tour">
                <h2>Custom Tour</h2>
                <div class="price">Varies</div>
                <p>Design your own tour with our help! Choose your destinations, activities, and schedule for a personalized Gambian experience.</p>
                <a href="reservation.php?tour=custom" class="book-btn">Book Now</a>
            </div>
        </div>
    </div>
</body>
</html>