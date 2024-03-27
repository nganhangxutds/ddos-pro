import httpx

with open("proxy.txt", 'w') as file:
	file.write(httpx.get("https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=5000&country=all&ssl=all&anonymity=all").text)
