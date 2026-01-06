from PIL import Image, ImageOps
import sys, os

slugs = sys.argv[1:]

if len(slugs) == 0:
    print("No slugs provided, using all images in 'public/images/blog-banners/light'")
    slugs = [os.path.splitext(f)[0] for f in os.listdir("public/images/blog-banners/light")]

for slug in slugs:
    print(f"Processing {slug}")
    img = Image.open(f"public/images/blog-banners/light/{slug}.png")
    img = ImageOps.invert(img)
    img.save(f"public/images/blog-banners/dark/{slug}.png")
    print(f"Saved {slug} to 'public/images/blog-banners/dark/{slug}.png'")