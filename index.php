</body>
<div style="position:fixed;bottom:2em;left:2em;z-index:1000;display:flex;align-items:center;gap:1em;background:rgba(255,255,255,0.95);box-shadow:0 4px 24px rgba(0,0,0,0.10);border-radius:18px;padding:1em 2em;max-width:340px;">
  <img src="photos/logo.png" alt="African Palm Tree Logo" style="height:64px;width:auto;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
  <span style="font-size:1.3em;font-weight:700;color:#008080;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Welcome to Gambia Tours</span>
</div>
<?php
// Simple Tour Website

$tours = [
  [
    'name' => 'City Sightseeing',
    'description' => 'Explore the city\'s landmarks and hidden gems.',
    'price' => 50,
    'image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  ],
  [
    'name' => 'Mountain Adventure',
    'description' => 'A thrilling hike through scenic mountain trails.',
    'price' => 80,
    'image' => 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  ],
  [
    'name' => 'Beach Relaxation',
    'description' => 'Relax on the beautiful sandy beaches.',
    'price' => 60,
    'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
  ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gambia Tours | West Africa Travel & Holiday Packages</title>
  <meta name="description" content="Book unforgettable tours, day trips, and holiday packages in The Gambia and Senegal. Enjoy city sightseeing, bird watching, culinary classes, and more with Gambia Tours.">
  <meta name="keywords" content="Gambia tours, West Africa travel, holiday packages, Senegal tours, bird watching, city sightseeing, culinary classes, Serekunda market, African adventure, book Gambia tour, travel agency">
  <meta name="author" content="Gambia Tours">
  <meta property="og:title" content="Gambia Tours | West Africa Travel & Holiday Packages">
  <meta property="og:description" content="Book unforgettable tours, day trips, and holiday packages in The Gambia and Senegal. Enjoy city sightseeing, bird watching, culinary classes, and more with Gambia Tours.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com/">
  <meta property="og:image" content="photos/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Montserrat', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #f7f8fa;
    }
    .container {
      padding: 2em;
      max-width: 900px;
      margin: 2em auto;
    }
    h1 {
      color: #FFB300;
      font-size: 2.5em;
      margin-bottom: 0.5em;
    }
    .hero {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2em;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.07);
      padding: 2em;
      margin-bottom: 2em;
    }
    .hero img {
      width: 320px;
      border-radius: 14px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }
    .hero-text {
      flex: 1;
    }
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 2em;
      justify-content: center;
    }
    .card {
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      padding: 1.5em;
      max-width: 260px;
      text-align: center;
    }
    .card img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 1em;
    }
    .card h2 {
      color: #008080;
      font-size: 1.2em;
      margin-bottom: 0.5em;
    }
    .card p {
      font-size: 1em;
      color: #444;
    }
    @media (max-width: 600px) {
      .container { padding: 1em; }
      .hero { flex-direction: column; padding: 1em; }
      .hero img { width: 100%; }
      .cards { flex-direction: column; gap: 1em; }
    }
  </style>
</head>
<body>
  <!-- WhatsApp Chat Button -->
  <a href="https://wa.me/48504224794" target="_blank" style="position:fixed;bottom:24px;right:24px;z-index:1001;background:#25D366;color:#fff;border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.12);text-decoration:none;transition:box-shadow 0.2s;">
    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style="width:32px;height:32px;">
  </a>
        
  <?php include 'navbar.php'; ?>
  <div class="container">
    <section style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;background:#fffbe7;border-radius:18px;box-shadow:0 4px 24px rgba(0,0,0,0.07);padding:2em 2em 2em 2em;margin-bottom:2em;">
      <div style="flex:1;min-width:260px;">
        <h1 style="color:#FFB300;font-size:2.5em;margin-bottom:0.5em;">Welcome to Gambia Tours</h1>
        <p style="font-size:1.2em;color:#444;margin-bottom:1em;">Discover the magic of The Gambia with our expertly guided trips and tours. From vibrant city life to serene nature escapes, we offer unforgettable experiences for every traveler.</p>
        <a href="reservation.php" style="display:inline-block;background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.8em 2em;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1.1em;">Book Your Tour</a>
      </div>
  <img src="photos/logo.png" alt="Gambia Tours Logo - West Africa Travel" style="height:160px;width:auto;border-radius:18px;box-shadow:0 4px 16px rgba(0,0,0,0.10);margin-left:2em;">
    </section>
    <!-- Social Media Links Section -->
    <section style="background:#fffbe7;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:1.5em;margin:2em 0;max-width:700px;margin-left:auto;margin-right:auto;">
    <!-- Newsletter Signup Section -->
    <section style="background:#fff;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:2em;margin:2em 0;max-width:700px;margin-left:auto;margin-right:auto;">
      <h2 style="color:#008080;text-align:center;margin-bottom:1em;font-size:1.7em;">Subscribe to Our Newsletter</h2>
      <p style="color:#444;text-align:center;font-size:1.08em;margin-bottom:1.2em;">Get the latest travel tips, exclusive offers, and updates from Gambia Tours. No spam, just inspiration!</p>
      <form style="display:flex;flex-direction:column;align-items:center;gap:1em;max-width:400px;margin:auto;">
        <input type="email" name="newsletter_email" placeholder="Enter your email address" required style="padding:0.8em 1em;border-radius:8px;border:1px solid #ddd;font-size:1.08em;width:100%;box-sizing:border-box;">
        <button type="submit" style="background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.8em 2em;border-radius:8px;border:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1.08em;cursor:pointer;transition:background 0.2s;">Subscribe</button>
      </form>
      <div style="text-align:center;color:#888;font-size:1em;margin-top:0.7em;">You can unsubscribe at any time.</div>
    </section>
      <h2 style="color:#008080;text-align:center;margin-bottom:1em;font-size:1.7em;">Connect With Us</h2>
      <div style="display:flex;justify-content:center;gap:2em;">
        <a href="https://www.tiktok.com/@tafabella?_t=ZN-901DniAqn0I&_r=1" target="_blank" style="display:flex;align-items:center;gap:0.6em;background:#fff;border-radius:10px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:0.7em 1.2em;text-decoration:none;color:#111;font-weight:600;font-size:1.1em;">
          <img src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png" alt="TikTok" style="width:28px;height:28px;"> TikTok
        </a>
        <a href="https://www.tiktok.com/@tafabella?_t=ZN-901DniAqn0I&_r=1" target="_blank" style="display:none;"></a>
        <a href="https://www.instagram.com/lamino393" target="_blank" style="display:flex;align-items:center;gap:0.6em;background:#fff;border-radius:10px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:0.7em 1.2em;text-decoration:none;color:#111;font-weight:600;font-size:1.1em;">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width:28px;height:28px;"> Instagram
        </a>
      </div>
      <div style="text-align:center;color:#888;font-size:1em;margin-top:0.7em;">Follow us for updates, travel inspiration, and special offers!</div>
    </section>
    <!-- Contact Information Section -->
    <section style="background:#fff;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:2em;margin:2em 0;max-width:700px;margin-left:auto;margin-right:auto;">
      <h2 style="color:#008080;text-align:center;margin-bottom:1em;font-size:2em;">Contact Us</h2>
      <div style="display:flex;flex-direction:column;align-items:center;gap:1.2em;">
        <div style="font-size:1.15em;color:#444;text-align:center;">
          <strong>Email:</strong> <a href="mailto:laminconteh2011@gmail.com" style="color:#FFB300;text-decoration:underline;">laminconteh2011@gmail.com</a>
        </div>
        <div style="font-size:1.15em;color:#444;text-align:center;">
          <strong>WhatsApp:</strong> <a href="https://wa.me/48504224794" style="color:#008080;text-decoration:underline;">0048 504 224 794</a>
        </div>
        <div style="font-size:1.15em;color:#444;text-align:center;">
          <strong>Local Number:</strong> <a href="tel:002203209610" style="color:#008080;text-decoration:underline;">00220 320 9610</a>
        </div>
        <div style="font-size:1em;color:#888;text-align:center;margin-top:0.7em;">We respond quickly to all enquiries. Feel free to reach out via email, WhatsApp, or phone for bookings and questions!</div>
      </div>
    </section>
    <!-- FAQ Section -->
    <section style="background:#fffbe7;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:2em;margin:2em 0;max-width:900px;margin-left:auto;margin-right:auto;">
      <h2 style="color:#008080;text-align:center;margin-bottom:1.2em;font-size:2em;">Frequently Asked Questions</h2>
      <div style="display:flex;flex-direction:column;gap:1.5em;max-width:700px;margin:auto;">
        <div style="background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:1.2em;">
          <h4 style="color:#FFB300;margin-bottom:0.5em;">How do I book a tour?</h4>
          <p style="color:#444;font-size:1.08em;">Simply click the “Book Now” button on your preferred tour or fill out our reservation form. You’ll receive a confirmation email with all details.</p>
        </div>
        <div style="background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:1.2em;">
          <h4 style="color:#FFB300;margin-bottom:0.5em;">What payment methods do you accept?</h4>
          <p style="color:#444;font-size:1.08em;">We accept major credit cards, PayPal, and cash on arrival. Secure online payment is available for your convenience.</p>
        </div>
        <div style="background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:1.2em;">
          <h4 style="color:#FFB300;margin-bottom:0.5em;">Can I customize my tour?</h4>
          <p style="color:#444;font-size:1.08em;">Yes! We offer custom itineraries to suit your interests. Contact us to discuss your preferences and we’ll tailor a package for you.</p>
        </div>
        <div style="background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:1.2em;">
          <h4 style="color:#FFB300;margin-bottom:0.5em;">Is airport transfer included?</h4>
          <p style="color:#444;font-size:1.08em;">Yes, all our packages include free airport pick-up and drop-off for your convenience.</p>
        </div>
      </div>
    </section>
    <section style="background:#fffbe7;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:2em;margin-bottom:2em;">
      <h2 style="color:#008080;text-align:center;margin-bottom:0.7em;">All-Inclusive Package Tours Itinerary</h2>
      <p style="font-size:1.12em;color:#444;margin-bottom:1em;text-align:center;">We offer all-inclusive package tours from start to finish, including airport pick-up and drop-off, and hotel accommodation for all our guests. Enjoy free airport transfers and an exclusive 5% discount on all hotel stays.</p>
      <ul style="font-size:1.08em;color:#333;line-height:1.7;margin-left:2em;margin-bottom:1.2em;max-width:700px;margin:auto;">
        <li><strong>7-Day Adventure Package:</strong> Starting from as low as €750, this tour covers the best of The Gambia’s culture, nature, and adventure.</li>
        <li><strong>10-Day Package Tour:</strong> Starting from €1,050, experience more of Gambia’s vibrant life, history, and natural beauty.</li>
        <li><strong>14-Day Safari Adventure:</strong> Starting from €1,300, immerse yourself in an extended safari and cultural journey.</li>
        <li><strong>Ultimate African Journey:</strong> Combines all historical and wildlife attractions, local experiences, and includes a 5-day luxury five-star beachfront stay.</li>
      </ul>
      <p style="font-size:1.08em;color:#444;text-align:center;">All our tour packages include hotel pick-up and drop-off, 4-star and 5-star hotel accommodation. We are dedicated to making your dream holiday unforgettable. For any enquiry, fill out the reservation form or simply hit the booking button to reserve your holiday. We are here to answer your questions and help you book the experience of a lifetime!</p>
    </section>
    <section>
      <h2 style="color:#008080;font-size:2em;text-align:center;margin-bottom:1.5em;">Popular Tours</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2em;">
        <!-- Gambia by Nite Experience -->
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);padding:1.5em;text-align:center;display:flex;flex-direction:column;align-items:center;">
          <img id="modalImg1" src="photos/gambia-night.jpeg" alt="Gambia by Nite Experience" style="cursor:pointer;width:90%;max-width:260px;border-radius:14px;margin-bottom:1.2em;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <h3 style="color:#008080;font-size:1.2em;margin-bottom:0.5em;">Gambia by Nite Experience</h3>
          <div style="color:#FFB300;font-weight:700;font-size:1.1em;margin-bottom:0.5em;">from €45</div>
          <div style="background:#fffbe7;border-radius:12px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:1em 1.2em;margin-bottom:1em;text-align:left;max-width:320px;margin:auto;">
            <h4 style="color:#008080;font-size:1.08em;margin-bottom:0.6em;text-align:center;">Itinerary Highlights</h4>
            <ul style="font-size:1em;color:#444;line-height:1.7;margin:0 0 0 1em;padding:0;">
              <li>Immerse yourself in traditional Mandinka and Jola ethnic group dances at the beach by night</li>
              <li>Enjoy campfire drum sessions, dancing, and singing with a griot playing the kora</li>
              <li>Take part in a fun workshop playing the Gambian drum called jembi and the traditional guitar called kora</li>
              <li>Experience a vibrant night of music, culture, and storytelling under the stars</li>
            </ul>
          </div>
          <p style="font-size:1em;color:#444;">Gambia by Nite is an extraordinary experience where you’ll join local musicians and dancers for an unforgettable evening. Feel the rhythm of the drums, learn to play the jembi and kora, and be captivated by the stories and songs of the griot. This once-in-a-lifetime adventure will leave you with memories you’ll cherish forever.</p>
          <a href="reservation.php?tour=gambia-night" style="margin-top:1em;background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.5em 1.5em;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1em;">Book Now</a>
        </div>
        <!-- Package Tours -->
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);padding:1.5em;display:flex;flex-direction:column;align-items:center;text-align:left;max-width:400px;margin:auto;">
          <img id="modalImg2" src="photos/sunset.jpeg" alt="Gambia Sunset - Package Tour" style="cursor:pointer;width:100%;max-width:320px;border-radius:14px;margin-bottom:1.2em;box-shadow:0 2px 12px rgba(0,0,0,0.08);display:block;margin-left:auto;margin-right:auto;">
          <h3 style="color:#008080;font-size:1.4em;margin-bottom:0.3em;text-align:center;">Package Tours</h3>
          <div style="color:#FFB300;font-weight:700;font-size:1.15em;margin-bottom:0.3em;text-align:center;">from €120</div>
          <p style="font-size:1.05em;color:#444;margin-bottom:1em;text-align:center;">Choose from our curated packages for a complete Gambian experience. Enjoy city tours, nature excursions, and cultural experiences tailored to your interests.</p>
          <div style="background:#fffbe7;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:1.2em;margin:1em 0;width:100%;">
            <h4 style="color:#008080;text-align:center;margin-bottom:0.5em;font-size:1.15em;">7-Day West Africa Experience: Gambia & Senegal</h4>
            <p style="font-size:1em;color:#333;margin-bottom:0.7em;text-align:left;max-width:340px;margin:auto;">
              Discover the highlights of Gambia and Senegal in just 7 days: river cruises, UNESCO heritage sites, wildlife safaris, vibrant markets, and beautiful beaches. Enjoy authentic music, culture, and cuisine every day.<br>
              <span style="display:block;color:#008080;font-size:1.08em;font-weight:600;margin:0.7em 0 0.3em 0;text-align:center;">For an extensive West African adventure, we recommend our <span style="color:#FFB300;font-weight:700;">10, 14, or 21-day African adventure packages</span>.</span>
              <a href="package-tours.php#7day" style="color:#FFB300;font-weight:700;text-decoration:underline;">Read More</a>
              <br>
              <div style="text-align:center;margin-top:1.2em;">
                <a href="reservation.php?tour=package" style="display:inline-block;background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.7em 2em;border-radius:10px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1.08em;">Book Me Now</a>
              </div>
            </p>
          </div>
        </div>
        <!-- City Tours -->
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);padding:1.5em;text-align:center;display:flex;flex-direction:column;align-items:center;">
          <img id="modalImg3" src="photos/banjul-market.jpeg" alt="City Tours - Serekunda Market" style="cursor:pointer;width:90%;max-width:260px;border-radius:14px;margin-bottom:1.2em;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <h3 style="color:#008080;font-size:1.2em;margin-bottom:0.5em;">City Tours</h3>
          <div style="color:#FFB300;font-weight:700;font-size:1.1em;margin-bottom:0.5em;">€35</div>
          <div style="background:#fffbe7;border-radius:12px;box-shadow:0 1px 6px rgba(0,128,128,0.07);padding:1em 1.2em;margin-bottom:1em;text-align:left;max-width:320px;margin:auto;">
            <h4 style="color:#008080;font-size:1.08em;margin-bottom:0.6em;text-align:center;">Itinerary Highlights</h4>
            <ul style="font-size:1em;color:#444;line-height:1.7;margin:0 0 0 1em;padding:0;">
              <li><strong>Culinary Classes:</strong> Taste authentic Gambian food and learn to cook local dishes with expert chefs.</li>
              <li><strong>Serekunda Market Shopping:</strong> Explore the vibrant Serekunda market, the heart of Gambian commerce.</li>
              <li><strong>Serekunda City Experience:</strong> Discover the second largest city in The Gambia, known for its dense population and lively atmosphere.</li>
            </ul>
          </div>
          <p style="font-size:1em;color:#444;">Experience the culture, history, and vibrant life of Gambian cities. Guided walks, local markets, and more.</p>
          <a href="reservation.php?tour=city" style="margin-top:1em;background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.5em 1.5em;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1em;">Book Now</a>
        </div>
        <!-- Bird Watching Adventure -->
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);padding:1.5em;text-align:center;display:flex;flex-direction:column;align-items:center;">
          <img id="modalImg4" src="photos/bird-watching.jpeg" alt="Bird Watching Adventure - Gambia Tours" style="cursor:pointer;width:90%;max-width:260px;border-radius:14px;margin-bottom:1.2em;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <h3 style="color:#008080;font-size:1.2em;margin-bottom:0.5em;">Bird Watching Adventure</h3>
          <div style="color:#FFB300;font-weight:700;font-size:1.1em;margin-bottom:0.5em;">€50</div>
          <p style="font-size:1em;color:#444;">Join our bird watching tours and spot rare species in lush habitats. The Gambia is known as the birdwatcher's paradise, with over 500 species. Perfect for nature lovers and photographers.</p>
          <a href="reservation.php?tour=bird" style="margin-top:1em;background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.5em 1.5em;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1em;">Book Now</a>
        </div>
        <!-- Snake Farm Adventure -->
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);padding:1.5em;text-align:center;display:flex;flex-direction:column;align-items:center;">
          <img id="modalImg5" src="photos/snake2.jpeg" alt="Snake Farm Adventure - Gambia Tours" style="cursor:pointer;width:90%;max-width:260px;border-radius:14px;margin-bottom:1.2em;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <h3 style="color:#008080;font-size:1.2em;margin-bottom:0.5em;">Snake Farm Adventure</h3>
          <div style="color:#FFB300;font-weight:700;font-size:1.1em;margin-bottom:0.5em;">€40</div>
          <p style="font-size:1em;color:#444;">Visit the famous Snake Farm and learn about the fascinating reptiles of The Gambia. Enjoy a guided tour and see snakes up close in a safe environment.</p>
          <a href="reservation.php?tour=snake-farm" style="margin-top:1em;background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.5em 1.5em;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1em;">Book Now</a>
        </div>
      </div>
    </section>
    <!-- Testimonials Section -->
    <section style="background:#f7f8fa;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:2em;margin:2em 0;max-width:900px;margin-left:auto;margin-right:auto;">
      <h2 style="color:#008080;text-align:center;margin-bottom:1.2em;font-size:2em;">What Our Customers Say</h2>
      <div style="display:flex;flex-wrap:wrap;gap:2em;justify-content:center;">
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);padding:1.5em;max-width:320px;flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer Photo" style="width:64px;height:64px;border-radius:50%;margin-bottom:1em;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
          <p style="font-size:1.08em;color:#444;margin-bottom:1em;font-style:italic;">“Gambia Tours made our holiday unforgettable! The guides were knowledgeable and friendly, and every detail was taken care of. Highly recommended.”</p>
          <span style="font-weight:700;color:#008080;">Fatou S., France</span>
        </div>
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);padding:1.5em;max-width:320px;flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer Photo" style="width:64px;height:64px;border-radius:50%;margin-bottom:1em;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
          <p style="font-size:1.08em;color:#444;margin-bottom:1em;font-style:italic;">“The city tour and culinary class were amazing! We tasted authentic Gambian food and explored vibrant markets. Will book again!”</p>
          <span style="font-weight:700;color:#008080;">John M., UK</span>
        </div>
        <div style="background:#fff;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);padding:1.5em;max-width:320px;flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;">
          <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Customer Photo" style="width:64px;height:64px;border-radius:50%;margin-bottom:1em;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
          <p style="font-size:1.08em;color:#444;margin-bottom:1em;font-style:italic;">“Booking was easy and the team was very responsive. The bird watching adventure was a highlight of our trip!”</p>
          <span style="font-weight:700;color:#008080;">Awa D., Germany</span>
        </div>
      </div>
    </section>
  </div>
</body>
</body>
<!-- Gallery Modal for Popular Tours -->
<div id="galleryModal" style="display:none;position:fixed;z-index:2000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);align-items:center;justify-content:center;">
  <span id="closeGallery" style="position:absolute;top:40px;right:60px;font-size:2.5em;color:#fff;cursor:pointer;font-weight:700;z-index:2001;">&times;</span>
  <img id="galleryImg" src="" alt="Gallery Large" style="max-width:90vw;max-height:80vh;border-radius:18px;box-shadow:0 8px 32px rgba(0,0,0,0.18);display:block;margin:auto;">
</div>
<script>
// Gallery modal logic for all Popular Tours images
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('galleryModal');
  var closeBtn = document.getElementById('closeGallery');
  var galleryImg = document.getElementById('galleryImg');
  var imgIds = ['modalImg1','modalImg2','modalImg3','modalImg4','modalImg5'];
  imgIds.forEach(function(id) {
    var img = document.getElementById(id);
    if(img) {
      img.onclick = function() {
        galleryImg.src = img.src;
        galleryImg.alt = img.alt;
        modal.style.display = 'flex';
      };
    }
  });
  closeBtn.onclick = function() {
    modal.style.display = 'none';
    galleryImg.src = '';
  };
  modal.onclick = function(e) {
    if(e.target === modal) {
      modal.style.display = 'none';
      galleryImg.src = '';
    }
  };
});
</script>
</html>