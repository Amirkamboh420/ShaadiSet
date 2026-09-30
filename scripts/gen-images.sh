#!/bin/bash
# Generate wedding vendor images using z-ai CLI
set -e

OUT=/home/z/my-project/public/vendors
mkdir -p "$OUT"

echo "=== Generating hero background ==="
z-ai image -p "Elegant Pakistani wedding scene, maroon and cream color palette, romantic floral arch with roses and marigolds, golden string lights, luxurious banquet hall, soft bokeh, cinematic, high quality, professional photography" -o "$OUT/hero.jpg" -s 1344x768

echo "=== Generating category tiles ==="
z-ai image -p "Pakistani wedding photographer holding professional camera, maroon and cream tones, elegant, professional, studio portrait, high quality" -o "$OUT/cat-photographer.jpg" -s 1024x1024
z-ai image -p "Luxurious Pakistani wedding stage decoration, maroon drapes, cream flowers, golden chandeliers, elegant mandap, high quality" -o "$OUT/cat-decorator.jpg" -s 1024x1024
z-ai image -p "Pakistani wedding catering buffet, elegant biryani and kebab platters, maroon tablecloth, gold cutlery, high quality food photography" -o "$OUT/cat-caterer.jpg" -s 1024x1024
z-ai image -p "Pakistani bridal makeup artist applying makeup to bride, maroon dupatta, gold jewelry, elegant vanity setup, high quality" -o "$OUT/cat-makeup.jpg" -s 1024x1024
z-ai image -p "Elegant Pakistani banquet hall wedding venue, maroon and cream decor, golden chandeliers, round tables with floral centerpieces, high quality" -o "$OUT/cat-venue.jpg" -s 1024x1024
z-ai image -p "DJ sound system at Pakistani wedding, colorful lights, turntables, maroon backdrop, energetic party scene, high quality" -o "$OUT/cat-dj.jpg" -s 1024x1024
z-ai image -p "Pakistani mehndi artist applying intricate henna design on bride hands, maroon henna, cream background, close up, high quality" -o "$OUT/cat-mehndi.jpg" -s 1024x1024
z-ai image -p "Elegant Pakistani wedding invitation cards, maroon and gold, cream paper, floral patterns, luxury stationery, high quality" -o "$OUT/cat-invitations.jpg" -s 1024x1024

echo "=== Generating vendor portfolio images ==="
z-ai image -p "Pakistani bride and groom couple portrait, maroon lehenga, cream sherwani, golden hour, romantic, professional wedding photography, high quality" -o "$OUT/photo-1.jpg" -s 1344x768
z-ai image -p "Pakistani wedding baraat entrance, groom on horse, maroon decorations, festive, candid moment, professional photography, high quality" -o "$OUT/photo-2.jpg" -s 1344x768
z-ai image -p "Pakistani bride close up portrait, maroon dupatta, gold jhumka earrings, mehndi hands, professional photography, high quality" -o "$OUT/photo-3.jpg" -s 1344x768
z-ai image -p "Pakistani wedding stage floral decoration, maroon and cream roses, golden drapes, fairy lights, luxurious, high quality" -o "$OUT/decor-1.jpg" -s 1344x768
z-ai image -p "Pakistani mehndi function decor, yellow and maroon marigolds, dholki setup, traditional, vibrant, high quality" -o "$OUT/decor-2.jpg" -s 1344x768
z-ai image -p "Pakistani wedding table centerpieces, maroon napkins, cream roses, gold charger plates, elegant, high quality" -o "$OUT/decor-3.jpg" -s 1344x768
z-ai image -p "Pakistani wedding feast, biryani platter, kebabs, naan, maroon tablecloth, elegant presentation, high quality food photography" -o "$OUT/food-1.jpg" -s 1344x768
z-ai image -p "Pakistani wedding dessert table, gulab jamun, rasmalai, cream and maroon sweets, elegant display, high quality" -o "$OUT/food-2.jpg" -s 1344x768
z-ai image -p "Pakistani bride final look, maroon lipstick, gold eye makeup, maang tikka, jhumkas, professional bridal makeup, high quality" -o "$OUT/makeup-1.jpg" -s 1344x768
z-ai image -p "Pakistani bridal makeup vanity, maroon brushes, gold palette, elegant setup, professional, high quality" -o "$OUT/makeup-2.jpg" -s 1344x768
z-ai image -p "Luxurious Pakistani wedding banquet hall, maroon and cream decor, grand chandeliers, round tables, elegant, high quality" -o "$OUT/venue-1.jpg" -s 1344x768
z-ai image -p "Pakistani outdoor wedding lawn venue, maroon tent, cream flowers, fairy lights, evening, romantic, high quality" -o "$OUT/venue-2.jpg" -s 1344x768
z-ai image -p "Pakistani wedding dance floor, DJ setup, colorful lights, maroon backdrop, energetic crowd, high quality" -o "$OUT/dj-1.jpg" -s 1344x768
z-ai image -p "Intricate Pakistani mehndi henna design on bride hands, floral patterns, maroon henna, cream background, detailed, high quality" -o "$OUT/mehndi-1.jpg" -s 1344x768

echo "=== ALL IMAGES GENERATED ==="
ls -la "$OUT"
