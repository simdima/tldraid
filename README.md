<div style="display:flex; align-items: center">
  <img src="/public/icon-readme.png" alt="app-icon" />
  <p style="margin-left: 10px">A web app that allows you to navigate through man pages for most common platforms but also
has an integrated chatbot converstation field where you can ask for specific examples and usecases</p>
</div>

<br>

<hr>

### Why though?

As a passionate command line user I often make use of man pages to either learn how to use some cli utility that is new to me or just refresh my memory on a familiar one. However, sometimes I also find default man pages a bit abstract or lacking in some cases, so occasionally I end up searching the web for more specific implementaions.

With arrival of OpenAI ChatGPT it made my life a lot easier since I can just ask it exactly what I want to do with a utility of my choice (or what specifc result I want to get) and it spits out the answer.

I thought it'd be great to combine both of these tools, and that is where this app comes in.

### How to use?

<p align="center" >
  <img style="border-radius: 5px"src="/public/tldraid-intro-video.GIF" alt="intro-gif" />
</p>

**Option #1**
The working instance of the app can be found <a style="color:#413e77; font-weight: bold" href="https://tldraid.simlabs.dev">here</a>

**Option #2**
Run it locally using Docker.

_Prerequisite_:
You will need an <a style="color:#413e77; font-weight: bold" href="https://gitlab.com/dsim/tldraid-api">API server</a> for this app running locally

1. Clone this repository to your system and navigate inside the directory

```sh
git clone https://gitlab.com/dsim/tldraid && cd tldraid
```

2. Create an **.env** file and add the API server's url to environmental variable VITE_API_URL

```sh
# adjust the url according to your tldraid-api's config
touch .env && echo "VITE_API_URL=http://localhost:5510" > .env
```

3. Build a Docker image _(change EXPOSE variable if needed)_

```sh
docker build -t  tldraid .
```

4. Start a Docker container _(change ports according to your setup)_

```sh
docker run --name tldraid -p 3000:3000 -d tldraid
```
