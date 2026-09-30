#!/bin/bash
# Generate vendor portfolio images
OUT=/home/z/my-project/public/vendors
cd /home/z/my-project

echo "=== Portfolio images ===" >> /home/z/my-project/scripts/gen.log
date >> /home/z/my-project/scripts/gen.log

z-ai image -p "Pakistani bride and groom couple portrait, maroon lehenga, cream sherwani, golden hour, romantic, professional wedding photography, high quality" -o "$OUT/photo-1.jpg" -s 1344x768 && echo "photo-1 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani wedding baraat entrance, groom on horse, maroon decorations, festive, candid moment, professional photography, high quality" -o "$OUT/photo-2.jpg" -s 1344x768 && echo "photo-2 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani bride close up portrait, maroon dupatta, gold jhumka earrings, mehndi hands, professional photography, high quality" -o "$OUT/photo-3.jpg" -s 1344x768 && echo "photo-3 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani wedding stage floral decoration, maroon and cream roses, golden drapes, fairy lights, luxurious, high quality" -o "$OUT/decor-1.jpg" -s 1344x768 && echo "decor-1 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani mehndi function decor, yellow and maroon marigolds, dholki setup, traditional, vibrant, high quality" -o "$OUT/decor-2.jpg" -s 1344x768 && echo "decor-2 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani wedding table centerpieces, maroon napkins, cream roses, gold charger plates, elegant, high quality" -o "$OUT/decor-3.jpg" -s 1344x768 && echo "decor-3 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani wedding feast, biryani platter, kebabs, naan, maroon tablecloth, elegant presentation, high quality food photography" -o "$OUT/food-1.jpg" -s 1344x768 && echo "food-1 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani wedding dessert table, gulab jamun, rasmalai, cream and maroon sweets, elegant display, high quality" -o "$OUT/food-2.jpg" -s 1344x768 && echo "food-2 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani bride final look, maroon lipstick, gold eye makeup, maang tikka, jhumkas, professional bridal makeup, high quality" -o "$OUT/makeup-1.jpg" -s 1344x768 && echo "makeup-1 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani bridal makeup vanity, maroon brushes, gold palette, elegant setup, professional, high quality" -o "$OUT/makeup-2.jpg" -s 1344x768 && echo "makeup-2 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Luxurious Pakistani wedding banquet hall, maroon and cream decor, grand chandeliers, round tables, elegant, high quality" -o "$OUT/venue-1.jpg" -s 1344x768 && echo "venue-1 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani outdoor wedding lawn venue, maroon tent, cream flowers, fairy lights, evening, romantic, high quality" -o "$OUT/venue-2.jpg" -s 1344x768 && echo "venue-2 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Pakistani wedding dance floor, DJ setup, colorful lights, maroon backdrop, energetic crowd, high quality" -o "$OUT/dj-1.jpg" -s 1344x768 && echo "dj-1 done" >> /home/z/my-project/scripts/gen.log
z-ai image -p "Intricate Pakistani mehndi henna design on bride hands, floral patterns, maroon henna, cream background, detailed, high quality" -o "$OUT/mehndi-1.jpg" -s 1344x768 && echo "mehndi-1 done" >> /home/z/my-project/scripts/gen.log

echo "=== ALL PORTFOLIO IMAGES DONE ===" >> /home/z/my-project/scripts/gen.log
date >> /home/z/my-project/scripts/gen.log
