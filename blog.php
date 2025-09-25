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
    <title>Blog - Gambia Tours</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', Arial, sans-serif; padding: 0; margin: 0; background: #f7f8fa; }
        .container { max-width: 900px; margin: 2em auto; padding: 2em; background: #fff; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        h1 { color: #FFB300; font-size: 2em; margin-bottom: 0.5em; }
        .blog-img { width: 100%; max-width: 600px; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 1em; }
        p { font-size: 1.1em; color: #444; margin-bottom: 1em; }
        @media (max-width: 600px) {
            .container { padding: 1em; }
            h1 { font-size: 1.5em; }
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>
    <div class="container">
        <h1 style="font-size:2.2em;color:#008080;text-align:center;margin-bottom:1em;">Gambia Blog</h1>
        <div style="display:flex;flex-direction:column;gap:2.5em;">
        <?php
        $posts = json_decode(file_get_contents('posts.json'), true);
        foreach ($posts as $post):
        ?>
            <div style="background:#fff;border-radius:18px;box-shadow:0 4px 24px rgba(0,0,0,0.07);padding:2em;max-width:800px;margin:0 auto;display:flex;flex-direction:column;align-items:flex-start;">
                <img src="<?php echo htmlspecialchars($post['image']); ?>" alt="<?php echo htmlspecialchars($post['title']); ?>" style="width:100%;max-width:600px;border-radius:14px;margin-bottom:1.2em;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
                <h2 style="color:#008080;font-size:1.5em;margin-bottom:0.3em;"><?php echo htmlspecialchars($post['title']); ?></h2>
                <div style="color:#888;font-size:0.98em;margin-bottom:0.7em;">
                    <span><?php echo date('F j, Y', strtotime($post['date'])); ?></span> &bull; <span>By <?php echo htmlspecialchars($post['author']); ?></span>
                </div>
                <p style="font-size:1.1em;color:#444;min-height:60px;margin-bottom:1em;"><?php echo htmlspecialchars($post['summary']); ?></p>
                <a href="post.php?id=<?php echo urlencode($post['id']); ?>" style="margin-top:0.5em;background:linear-gradient(90deg,#FFD600 60%,#FFB300 100%);color:#333;font-weight:700;padding:0.6em 1.7em;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-size:1.08em;">Read More</a>
            </div>
        <?php endforeach; ?>
        </div>
    </div>
</body>
</html>