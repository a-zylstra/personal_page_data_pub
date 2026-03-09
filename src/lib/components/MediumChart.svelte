<script lang="ts">
  import type { MediumCount } from '$lib/types/met';

  export let data: MediumCount[] = [];
  export let title = 'Medium counts for Korean art at the Met';
  export let maxBars = 10;

  $: chartData = data.slice(0, maxBars);
  $: maxValue = chartData.length ? Math.max(...chartData.map((d) => d.value)) : 0;
</script>

<section class="chart-card card" aria-labelledby="medium-chart-title">
  <div class="chart-header">
    <p class="eyebrow">Data visualization</p>
    <h2 id="medium-chart-title">{title}</h2>
  </div>

  {#if chartData.length}
    <div
      class="chart"
      role="img"
      aria-label="Bar chart showing counts of artwork medium types"
    >
      {#each chartData as item}
        <div class="bar-row">
          <div class="label" title={item.label}>{item.label}</div>

          <div class="bar-track">
            <div
              class="bar-fill"
              style={`width: ${maxValue ? (item.value / maxValue) * 100 : 0}%`}
            ></div>
          </div>

          <div class="value">{item.value}</div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No chart data available.</p>
  {/if}
</section>

<style>
  .chart-card {
    padding: 1.25rem;
  }

  .chart-header {
    margin-bottom: 1rem;
  }

  .eyebrow {
    margin: 0 0 0.35rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 700;
  }

  h2 {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.3;
  }

  .chart {
    display: grid;
    gap: 0.85rem;
  }

  .bar-row {
    display: grid;
    grid-template-columns: 180px 1fr 48px;
    gap: 0.75rem;
    align-items: center;
  }

  .label {
    font-size: 0.95rem;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bar-track {
    height: 1rem;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background: #111827;
    border-radius: 999px;
  }

  .value {
    text-align: right;
    font-size: 0.92rem;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 700px) {
    .bar-row {
      grid-template-columns: 1fr;
      gap: 0.35rem;
    }

    .value {
      text-align: left;
    }

    .label {
      white-space: normal;
    }
  }
</style>