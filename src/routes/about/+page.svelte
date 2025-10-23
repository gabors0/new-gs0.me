<script>
    let clicked = false;
</script>

<svelte:head>
    <script
        defer
        src="https://stateflare.gabors0.workers.dev/track.js"
    ></script>
</svelte:head>
<label id="uv_label">UV</label>
<label id="pv_label">PV</label>

<div class="flex flex-col md:flex-row md:flex-wrap gap-x-5 pt-[100px] mx-5">
    <div
        class="bg-black/30 mb-5 md:mb-0 border border-white/30 bg-blend-darken w-full md:w-[calc(50%-10px)] fadeIn flex flex-col"
    >
        <h1 class="font-bold p-3 text-2xl text-center">about me</h1>
        <hr class="w-full text-white/30" />
        <div class="p-8 opacity-75 text-lg font-inter">
            <p>
                I'm a 17 year old mostly self-taught student/developer from
                Hungary, currently I'm mainly learning frontend since I love UI
                design.
            </p>
            <br />
            <p>I'm also into photography, audio stuff and I love tinkering</p>
        </div>
        <div
            class="p-8 w-full select-none opacity-50 flex-1 flex items-center justify-center"
        >
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <pre
                onclick={() => {
                    clicked = true;
                }}
                class="font-mono text-xl text-center cursor-pointer">


{#if clicked}&lt;3{/if}

   |\__/,|   (`\
  _.|o o  |_   ) )
-(((---(((--------
            </pre>
        </div>
    </div>
    <div
        class="bg-black/30 border border-white/30 bg-blend-darken w-full md:w-[calc(50%-10px)] fadeIn"
    >
        <h1 class="font-bold p-3 text-2xl text-center">about this site</h1>
        <hr class="w-full text-white/30" />
        <!--//////////////////-->
        <p class="p-3 text-center text-lg opacity-75">technologies used</p>
        <div class="flex md:flex-row flex-col justify-between">
            <div
                class="flex items-center justify-center gap-x-1 mx-3 md:w-full font-inter text-4xl text-center p-8 border border-white/30"
            >
                <a
                    href="https://svelte.dev"
                    target="_blank"
                    aria-label="svelte.dev"
                    ><svg
                        class="svgIcon transition-transform"
                        viewBox="0 0 99 119"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M43.6247 5.21373C59.2247 -4.68625 80.9249 -0.0867853 91.8249 15.6131C97.1249 22.9131 99.225 32.1132 97.5251 41.1131C96.8251 45.313 95.2248 49.313 92.8249 52.9129C96.3249 59.4129 97.4247 66.9137 96.1247 74.2137C94.6246 82.9136 89.4244 90.6134 81.9245 95.3133L54.4245 112.813C38.8245 122.713 17.2252 118.113 6.22528 102.413C1.02533 95.113 -1.07486 85.9135 0.525085 77.0135C1.22508 72.8136 2.82531 68.8137 5.22528 65.2137C1.72528 58.7137 0.6245 51.2129 1.9245 43.9129C3.42456 35.2131 8.62484 27.5133 16.1247 22.8133L43.6247 5.21373ZM80.5251 22.8133C75.3251 15.3133 66.0247 11.8131 57.1247 14.1131C55.1248 14.7131 53.225 15.5132 51.5251 16.6131L24.0251 34.1131C19.5251 36.9131 16.3245 41.6133 15.4245 46.8133C14.4245 52.2133 15.7249 57.7132 18.8249 62.1131C24.0249 69.6131 33.3253 73.1133 42.2253 70.8133C44.2251 70.3133 46.125 69.5129 47.8249 68.4129L58.3249 61.7137C58.8249 61.4137 59.4251 61.2135 60.0251 61.0135C62.725 60.3137 65.5247 61.3133 67.1247 63.6131C68.0247 64.9131 68.4247 66.6137 68.1247 68.2137C67.8246 69.8135 66.9249 71.1136 65.5251 72.0135L38.1247 89.5135C37.6247 89.8135 37.0244 90.0138 36.4245 90.2137C33.7247 90.9135 30.9248 89.8133 29.3249 87.5135C28.5249 86.3135 28.1253 84.813 28.2253 83.4129L28.3249 82.4129L27.3249 82.1131C23.425 80.9132 19.825 79.1136 16.5251 76.7137L15.1247 75.7137L14.6247 77.3133C14.4247 78.2132 14.2251 79.0131 14.0251 79.9129C13.1251 85.313 14.3251 90.8137 17.5251 95.2137C22.7251 102.713 32.0247 106.213 40.9245 103.913C42.9245 103.313 44.8251 102.513 46.5251 101.413L74.0251 83.9129C78.5248 81.113 81.7246 76.4134 82.6247 71.2137C83.5247 65.8137 82.3247 60.313 79.1247 55.9129C73.9247 48.4133 64.6251 44.9139 55.7253 47.2137C53.7253 47.8137 51.8247 48.6137 50.1247 49.7137L39.6247 56.4129C39.1247 56.7129 38.5245 56.9131 37.9245 57.1131C35.2246 57.813 32.4249 56.8133 30.8249 54.5135C29.9249 53.2135 29.5249 51.5129 29.8249 49.9129C30.125 48.3132 31.0247 47.0131 32.4245 46.1131L59.8249 28.6131C60.3249 28.3132 60.9251 28.1129 61.5251 27.9129C64.225 27.2131 67.0248 28.2136 68.6247 30.5135C69.4246 31.7135 69.8252 33.2132 69.7253 34.6131L69.6247 35.6131L70.6247 35.9129C74.5246 37.1129 78.1246 38.9134 81.4245 41.3133L82.8249 42.3133L83.3249 40.7137C83.6249 39.8137 83.8251 39.0131 84.0251 38.1131C84.925 32.7133 83.725 27.2133 80.5251 22.8133Z"
                        />
                    </svg>
                </a>
                <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    aria-label="tailwind css"
                    ><svg
                        class="svgIcon transition-transform"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 54 33"
                        ><g clip-path="url(#prefix__clip0)"
                            ><path
                                fill-rule="evenodd"
                                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                                clip-rule="evenodd"
                            /></g
                        ><defs
                            ><clipPath id="prefix__clip0"
                                ><path
                                    fill="#fff"
                                    d="M0 0h54v32.4H0z"
                                /></clipPath
                            ></defs
                        ></svg
                    ></a
                >
            </div>
        </div>
        <!--//////////////////-->
        <p class="p-3 text-center text-lg opacity-75">fonts used</p>
        <div class="flex md:flex-row flex-col justify-between">
            <div
                class="flex items-center justify-center mx-3 md:w-full font-inter text-4xl text-center p-8 border border-white/30"
            >
                <a
                    class="hover:underline"
                    target="_blank"
                    href="https://fonts.google.com/specimen/Inter">Inter</a
                >
            </div>
            <div
                class="flex items-center justify-center md:mr-3 md:ml-0 mx-3 p-8 md:w-full font-suse-mono text-4xl text-center border border-white/30"
            >
                <a
                    class="hover:underline"
                    target="_blank"
                    href="https://fonts.google.com/specimen/SUSE+Mono"
                    >SUSE Mono</a
                >
            </div>
        </div>
        <!--//////////////////-->
        <p class="p-3 text-center text-lg opacity-75">source code</p>
        <div class="flex md:flex-row flex-col justify-between">
            <div
                class="flex items-center justify-center gap-x-1 mx-3 mb-3 md:w-full font-inter text-4xl text-center p-8 border border-white/30"
            >
                <a
                    href="https://github.com/gabors0/new-gs0.me"
                    target="_blank"
                    class="font-suse-mono text-4xl hover:underline">github</a
                >
            </div>
        </div>
    </div>
</div>

<style>
    svg:hover {
        transform: translateY(-5px);
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(10px);
        }
        100% {
            opacity: 1;
        }
    }
    .fadeIn {
        animation: fadeIn 0.35s ease-in-out;
    }
</style>
