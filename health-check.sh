#!/bin/bash

# 🔍 Gambia Tours - Automated SEO Health Check
# Run this monthly to ensure everything is working

echo "🔍 GAMBIA TOURS - SEO HEALTH CHECK"
echo "================================="
echo "Date: $(date)"
echo ""

echo "✅ Testing Website Accessibility..."
# Test if main site is accessible
if curl -s --head https://www.gambiantour.com/ | grep "200 OK" > /dev/null; then
    echo "✅ Homepage: ACCESSIBLE"
else
    echo "🚨 Homepage: FAILED - CHECK IMMEDIATELY!"
fi

# Test sitemap
if curl -s --head https://www.gambiantour.com/sitemap.xml | grep "200 OK" > /dev/null; then
    echo "✅ Sitemap: ACCESSIBLE"
else
    echo "🚨 Sitemap: FAILED - CHECK IMMEDIATELY!"
fi

# Test robots.txt
if curl -s --head https://www.gambiantour.com/robots.txt | grep "200 OK" > /dev/null; then
    echo "✅ Robots.txt: ACCESSIBLE"
else
    echo "🚨 Robots.txt: FAILED - CHECK IMMEDIATELY!"
fi

echo ""
echo "📋 MANUAL CHECKS REQUIRED:"
echo "- Google Search Console status"
echo "- Search 'Gambia Tours' on Google"
echo "- Search 'wycieczki do Gambii' on Google"
echo ""
echo "Next check due: $(date -d '+1 month' '+%B %d, %Y')"