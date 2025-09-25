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
    <title>Reservation Form - Gambia Tours</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', Arial, sans-serif; padding: 0; margin: 0; background: #f7f8fa; }
        .container { max-width: 500px; margin: 2em auto; padding: 2em; background: #fff; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        h1 { color: #FFB300; font-size: 2em; margin-bottom: 0.5em; text-align: center; }
        form { margin-top: 1em; }
        label { display: block; margin-top: 1em; font-weight: 500; color: #333; }
        input, select, textarea {
            width: 100%;
            padding: 0.7em;
            margin-top: 0.5em;
            box-sizing: border-box;
            border-radius: 8px;
            border: 1px solid #ddd;
            font-size: 1em;
        }
        button[type="submit"] {
            margin-top: 1.5em;
            background: linear-gradient(90deg, #FFD600 60%, #FFB300 100%);
            color: #333;
            padding: 0.7em 2em;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 1.1em;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
            transition: background 0.2s, color 0.2s;
        }
        button[type="submit"]:hover {
            background: #FFB300;
            color: #fff;
        }
        @media (max-width: 600px) {
            .container { padding: 1em; }
            h1 { font-size: 1.5em; }
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>
    <div class="container">
        <h1>Reservation Form</h1>
        <form action="#" method="post">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="tour">Select Tour:</label>
            <?php
            $selectedTour = isset($_GET['tour']) ? $_GET['tour'] : '';
            ?>
            <select id="tour" name="tour">
                <option value="city" <?php if($selectedTour=='city')echo 'selected'; ?>>City Tours</option>
                <option value="bird" <?php if($selectedTour=='bird')echo 'selected'; ?>>Bird Watching Adventure</option>
                <option value="package" <?php if($selectedTour=='package')echo 'selected'; ?>>Package Tours</option>
                <option value="river" <?php if($selectedTour=='river')echo 'selected'; ?>>River Excursion</option>
                <option value="cultural" <?php if($selectedTour=='cultural')echo 'selected'; ?>>Cultural Experience</option>
                <option value="wildlife" <?php if($selectedTour=='wildlife')echo 'selected'; ?>>Wildlife Safari</option>
                <option value="beach" <?php if($selectedTour=='beach')echo 'selected'; ?>>Beach Relaxation</option>
                <option value="custom" <?php if($selectedTour=='custom')echo 'selected'; ?>>Custom Tour</option>
                <option value="banjul-market" <?php if($selectedTour=='banjul-market')echo 'selected'; ?>>Day Trip: Banjul Albert Market & Shopping</option>
                <option value="snake-farm" <?php if($selectedTour=='snake-farm')echo 'selected'; ?>>Day Trip: Snake Farm Adventure</option>
                <option value="tanji-market" <?php if($selectedTour=='tanji-market')echo 'selected'; ?>>Day Trip: Tanji Fishing Market Visit</option>
                <option value="crocodile-pool" <?php if($selectedTour=='crocodile-pool')echo 'selected'; ?>>Day Trip: Crocodile Pool Trip</option>
            </select>
            <label for="start_date">Start Date:</label>
            <input type="date" id="start_date" name="start_date" required>
            <label for="end_date">End Date:</label>
            <input type="date" id="end_date" name="end_date" required>
            <label for="message">Additional Message:</label>
            <textarea id="message" name="message" rows="3"></textarea>
            <button type="submit">Reserve</button>
        </form>
        <p style="margin-top:2em;text-align:center;color:#444;">Reserve your trip or tour to the best destinations in The Gambia. Our team will contact you to confirm your booking and help you plan your adventure!</p>
    </div>
</body>
</html>