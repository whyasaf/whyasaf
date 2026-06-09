import urllib.request
import re
import os

os.makedirs("public/assets", exist_ok=True)
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

def download_image(url, filename):
    print(f"Downloading {url} to {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(filename, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Successfully downloaded {filename}")
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

# Scrape from Wikipedia file page
wiki_file_page = "https://en.wikipedia.org/wiki/File:John_Wick_-_Chapter_4_promotional_poster.jpg"
print("Fetching Wikipedia file page...")
try:
    req = urllib.request.Request(wiki_file_page, headers=headers)
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Find upload.wikimedia.org/wikipedia/en/...
        match = re.search(r'href="([^"]+upload\.wikimedia\.org/wikipedia/en/[^"]+)"', html)
        if match:
            url = match.group(1)
            if url.startswith('//'):
                url = 'https:' + url
            print(f"Found Wikipedia poster URL: {url}")
            download_image(url, "public/assets/john_wick_4.jpg")
        else:
            # Fallback regex search
            match2 = re.search(r'src="([^"]+upload\.wikimedia\.org/wikipedia/en/thumb/[^"]+)"', html)
            if match2:
                url = match2.group(1)
                if url.startswith('//'):
                    url = 'https:' + url
                # Convert thumb URL to original URL by removing thumb and the trailing dimensions
                # e.g., /wikipedia/en/thumb/d/d2/John_Wick...jpg/220px-John_Wick...jpg
                orig_url = url.replace('/thumb/', '/').split('.jpg/')[0] + '.jpg'
                print(f"Found thumbnail, converted to original: {orig_url}")
                download_image(orig_url, "public/assets/john_wick_4.jpg")
            else:
                print("Could not find wikimedia upload URL on page.")
except Exception as e:
    print(f"Failed to fetch Wiki page: {e}")

# YouTube Music: Let's find Deezer's album art cover for "Ben Senin Herşeyinim" Kenan Doğulu
deezer_album_search = "https://api.deezer.com/search/album?q=Kenan%20Do%C4%9Fulu%20Ben%20Senin%20Her%C5%9Feyinim"
print("Searching Deezer for album cover...")
try:
    req = urllib.request.Request(deezer_album_search, headers=headers)
    with urllib.request.urlopen(req) as response:
        import json
        data = json.loads(response.read().decode('utf-8'))
        if data.get('data'):
            cover_url = data['data'][0]['cover_medium']
            print(f"Found Deezer album cover URL: {cover_url}")
            download_image(cover_url, "public/assets/ben_guzelden_anlarim.jpg")
        else:
            print("Could not find album on Deezer.")
except Exception as e:
    print(f"Failed to fetch Deezer search: {e}")
