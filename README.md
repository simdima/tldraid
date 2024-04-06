<p align="center">
  <img width="200" src="/public/readme-logo.png" alt="app-logo" />
</p>

A web application that allows you to go through man pages for most common platforms with the help of integrated AI-powered chat bot conversation field where you can ask for specific examples and use cases.

Starting from version **1.3.0**, aside from [ChatGPT](https://chat.openai.com) bot, the application also allows to use locally running [Ollama server](https://github.com/ollama/ollama) for generating answers.

<img src="/public/tldraid-demo.png" alt="tldraid-demo-image" />

## Why?

As a person who often finds himself tinkering with CLI utilities in a shell I frequently reference man pages to either learn how to use some program that is new to me or just refresh my memory on a familiar one. However, sometimes I also find default man pages a bit abstract, hard to navigate or even lacking in some cases, so I end up searching the web for more specific implementations.

With arrival of OpenAI's ChatGPT my life got a lot easier since I can just ask it exactly what I want to do with a utility of my choice (or what specific result I want to get) and it spits out the answer.

I thought it'd be great to combine both of these tools, and that is where this app comes in.

## How to use?

**Option #1**
The working instance of the app can be found [here](https://tldraid.simlabs.dev)

**Option #2**
Run it locally using Docker.

_Prerequisite_:
You will need an [API server](https://github.com/simdima/tldraid-api) for this app running locally

1. Clone this repository to your system and navigate inside the directory

2. Create an **.env** file and add the API server's url to environmental variable VITE_API_URL

```sh
# adjust the url according to your tldraid-api's config
touch .env && echo "VITE_API_URL=http://localhost:5510" > .env
```

3. Build a Docker image _(change EXPOSE variable if needed)_

```sh
docker build -t tldraid .
```

4. Spin up a Docker container _(change ports according to your setup)_

```sh
docker run --name tldraid -p 3000:3000 -d tldraid
```

5. Navigate to your container's URL, in app's settings add your [OpenAI API key](https://platform.openai.com/account/api-keys), choose [ChatGPT](https://platform.openai.com/docs/guides/gpt) model</a> and language for man pages and you are good to go!

_Note 1_: **gpt-4** model is available only to Premium ChatGPT users

_Note 2_: if a manpage is missing for a language you selected it will be displayed in English

You can also use open-sourced Ollama LLM if you have one running on your local network - just add your Ollama API server URL and choose one of the available models (which are fetched every time you open app's settings in case some model was removed by user manually) in the Settings.

More info on how to run LLM locally here: https://github.com/ollama/ollama

_Note 3_: If you are not running tldrAId on the same machine as your Ollama instance, by default Ollama server is going to throw a CORS error when application tries to send requests to it, so you will have to adjust **OLLAMA_ORIGINS** environmental variable first. More info: https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-allow-additional-web-origins-to-access-ollama

To choose between ChatGPT and Ollama, click on bot icon below the textfield in chat bot window:

<p align="center">
  <img width="500" src="/public/bot-switch-image.png" alt="app-logo" />
</p>

## Development

Clone the repository, navigate inside and run:

```sh
touch .env && echo "VITE_API_URL=[YOUR_API_SERVER_URL]" > .env
npm i(nstall)
npm run dev
```

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

Dmitri Sim
