<?php
// Load posts from JSON
$posts = json_decode(file_get_contents('posts.json'), true);
$postId = isset($_GET['id']) ? $_GET['id'] : '';
$found = false;
foreach ($posts as $post) {
    if ($post['id'] === $postId) {
        $found = true;
        $title = $post['title'];
        $image = $post['image'];
        $content = $post['content'];
        break;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $found ? htmlspecialchars($title) : 'Post Not Found'; ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', Arial, sans-serif; background: #f7f8fa; margin: 0; }
        .container { max-width: 800px; margin: 2em auto; padding: 2em; background: #fff; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        h1 { color: #008080; font-size: 2em; margin-bottom: 1em; }
        .post-img { width: 100%; max-width: 600px; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 2em; }
        .back-link { display:inline-block;margin-bottom:2em;color:#FFB300;font-weight:700;text-decoration:none;font-size:1.1em; }
        .back-link:hover { text-decoration:underline; }
        @media (max-width: 600px) { .container { padding: 1em; } h1 { font-size: 1.3em; } }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>
    <div class="container">
        <?php if ($found): ?>
            <a href="blog.php" class="back-link">&larr; Back to Blog</a>
            <h1><?php echo htmlspecialchars($title); ?></h1>
            <img class="post-img" src="<?php echo htmlspecialchars($image); ?>" alt="<?php echo htmlspecialchars($title); ?>">
            <?php echo $content; ?>
        <?php else: ?>
            <h1>Post Not Found</h1>
            <p>The post you are looking for does not exist.</p>
        <?php endif; ?>
    </div>
</body>
</html>
