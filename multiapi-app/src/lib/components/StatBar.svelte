<script>
  export let name;
  export let baseStat;
  export let maxStat = 255;

  // Calcula el porcentaje
  $: percentage = (baseStat / maxStat) * 100;
  
  // Asigna color según el valor (ejemplo simple)
  $: barColor = baseStat > 100 ? 'bg-green-500' : 
                baseStat > 70 ? 'bg-yellow-400' : 
                'bg-red-400';
</script>

<div class="flex items-center space-x-2 mb-1">
  <span class="w-1/4 text-sm font-medium text-gray-600 capitalize text-right">{name.replace('-', ' ')}:</span>

  <div class="w-2/4 bg-gray-200 rounded-full h-3">
    <div 
      class="h-3 rounded-full transition-all duration-700 ease-out {barColor}" 
      style="width: {percentage}%"
    ></div>
  </div>

  <span class="w-1/8 text-sm font-bold text-gray-800">{baseStat}</span>
</div>