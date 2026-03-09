<script>
    let city = $state('Chicago');
    let weather = $state(null);
    let loading = $state(false);
    let error = $state(null);

    const cities = {
        Chicago:    { lat: 41.88,  lon:-87.63 },
        'New York': { lat: 40.71,  lon:-74.01 },
        London:     { lat: 51.51,  lon:-0.13  },
        Tokyo:      { lat: 35.68,  lon:139.69 },
        Sydney:     { lat: -33.87, lon:151.21 }
    };

    const weatherDescriptions = {
        0:  'Clear sky',
        1:  'Mostly clear',
        2:  'Partly cloudy',
        3:  'Overcast',
        45: 'Foggy',
        51: 'Drizzle',
        61: 'Rain',
        71: 'Snow',
        80: 'Showers',
        95: 'Thunderstorm',
    };

    async function fetchWeather() {
        loading = true;
        error = null;
    
        try {
            const { lat, lon } = cities[city];
            const url = `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,weathercode,windspeed_10m` +
            `&temperature_unit=fahrenheit&windspeed_unit=mph`;

            const response = await fetch(url); // wait for API
            weather = await response.json(); // parse json
            } catch (e) {
              error = 'Failed to retrieve weather data';
            }
            loading = false;
    }

</script>

<h1 class="text-3xl font-bold mb-4">Weather</h1>

<div class="flex gap-3 mb-6">
    <select bind:value={city} class="p-2 border rounded">
        {#each Object.keys(cities) as c}
            <option>{c}</option>
        {/each}
    </select>
    <button onclick={fetchWeather} class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Get Weather</button>
</div>

{#if loading} <p class="text-gray-500">Loading...</p> {/if}
{#if error} <p class="text-red-600 font-bold">{error}</p> {/if}

{#if weather}
    <div class="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 class="text-xl font-bold mb-2">{city}</h2>
        <p class="text-4xl font-bold text-teal-700 mb-2">
            {weather.current.temperature_2m}°F</p>
        <p class="text-lg mb-1">
            {weatherDescriptions[weather.current.weathercode]
             ?? 'Unknown'}</p>
        <p class="text-gray-500">
            Wind: {weather.current.windspeed_10m} mph</p>
    </div>
{/if}
