import asyncio
import httpx

async def fetch_data(url, session):
    try:
        response = await session.get(url)
        return response.text
    except Exception as e:
        print(f"Error fetching data from {url}: {e}")
        return None

async def main():
    urls = ['https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&proxy_format=ipport&format=text',]

    async with httpx.AsyncClient() as session:
        tasks = [fetch_data(url, session) for url in urls]
        results = await asyncio.gather(*tasks)

        # Save the results to a single file (proxy.txt)
        with open("proxy.txt", 'w') as file:
            for result in results:
                if result is not None:
                    file.write(result)
                    file.write("\n\n")
                    print("Data appended to proxy.txt")

    # Remove empty lines from proxy.txt
    clean_up_http_file()

def clean_up_http_file():
    with open("proxy.txt", 'r') as file:
        lines = file.readlines()

    with open("proxy.txt", 'w') as file:
        for line in lines:
            if line.strip():
                file.write(line)

if __name__ == "__main__":
    asyncio.run(main())
